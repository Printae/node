import { SerialPort } from 'serialport';

export class SerialConnection {
  public static instance: SerialConnection | null = null;

  private _port: string;
  private _baudRate: number;

  private _serialPort: SerialPort;

  private _okListeners: (() => void)[] = [];

  private _chunkBuffer: string = '';

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
    this._serialPort.on('open', callback);
  }

  public send(str: string) {
    this._serialPort.write(str + '\n');
  }

  public awaitOk() {
    return new Promise<void>((res) => {
      this._okListeners.push(res);
    });
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

    console.log('Invalid response', str);
  }

  public static create(port: string, baudRate: number): SerialConnection {
    if (!SerialConnection.instance)
      SerialConnection.instance = new SerialConnection(port, baudRate);

    return SerialConnection.instance;
  }
}
