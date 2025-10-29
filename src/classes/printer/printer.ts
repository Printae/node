import { SerialConnection } from '../serial/connection';
import { PrinterInterface } from './interface';
import { PrinterSerial } from './serial';

export class Printer {
  public static instance: Printer;

  private _port: string;
  private _baudRate: number;

  private _serialConnection: SerialConnection;

  public interface: PrinterInterface = new PrinterInterface(this);
  public serial: PrinterSerial = new PrinterSerial(this);

  constructor(port: string, baudRate: number) {
    this._port = port;
    this._baudRate = baudRate;

    this._serialConnection = SerialConnection.create(port, baudRate);
  }

  public async connect() {
    this._serialConnection.open();

    return new Promise<void>((res) => this._serialConnection.onOpen(res));
  }

  public get rawSerial() {
    return this._serialConnection;
  }

  public static get isReady(): boolean {
    return !!Printer.instance;
  }

  public static create(port: string, baudRate: number): Printer {
    if (!Printer.instance) Printer.instance = new Printer(port, baudRate);

    return Printer.instance;
  }
}
