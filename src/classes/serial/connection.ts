import { SerialPort } from 'serialport';

export class SerialConnection {
  public static instance: SerialConnection | null = null;

  private _port: string;
  private _baudRate: number;

  private _serialPort: SerialPort;

  private _okListeners: (() => void)[] = [];

  private _chunkBuffer: string = '';
  private _receivedLines: string[] = [];

  private constructor(port: string, baudRate: number) {
    this._port = port;
    this._baudRate = baudRate;

    this._serialPort = new SerialPort({
      path: this._port,
      baudRate: this._baudRate,
      autoOpen: false,
    });

    this._serialPort.on('data', (d: Buffer) => {
      this.processChunk(d.toString());
    });
  }

  public open() {
    this._serialPort.open();
  }

  public onOpen(callback: () => void) {
    this._serialPort.once('open', () => {
      console.log('Port opened, waiting for first chunks');
      this._serialPort.write('M105;\n');
      this._serialPort.flush();

      this._serialPort.once('data', () => {
        callback();
      });
    });
  }

  public send(str: string) {
    this._serialPort.write(str + '\n');
  }

  public awaitOk() {
    return new Promise<void>((res) => {
      this._okListeners.push(res);
    });
  }

  public getBuffer(): string {
    const buf = this._receivedLines.join('\n');
    this._receivedLines = [];

    return buf;
  }

  private processChunk(c: string) {
    this._chunkBuffer += c;

    if (this._chunkBuffer.includes('\n')) {
      const parts = this._chunkBuffer.split('\n');

      for (let i = 0; i < parts.length - 1; i++) {
        const line = parts[i].trim();

        this.processLine(line);
      }

      this._chunkBuffer = parts[parts.length - 1];
    }
  }

  private processLine(str: string) {
    if (str == 'ok') {
      this._okListeners.forEach((l) => l());

      this._okListeners = [];

      return;
    }

    if (str.startsWith('.e ')) {
      const emulatorStr = str.slice(3);

      console.log(`[EMULATOR][SERIAL] ${emulatorStr}`);
      return;
    }

    this._receivedLines.push(str);
  }

  public flush() {
    this._serialPort.flush();
    this._receivedLines = [];
    this._chunkBuffer = '';
  }

  public static create(port: string, baudRate: number): SerialConnection {
    if (!SerialConnection.instance)
      SerialConnection.instance = new SerialConnection(port, baudRate);

    return SerialConnection.instance;
  }
}
