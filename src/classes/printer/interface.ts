import { GCodeCommand } from '../gcode/commands/_command';
import { Printer } from './printer';

export class PrinterInterface {
  private _printer: Printer;

  constructor(printer: Printer) {
    this._printer = printer;
  }

  public async sendCommand<T>(command: GCodeCommand): Promise<T> {
    const str = command.toString();

    const res = await this._printer.serial.queue.awaitPush(str);

    return command.processOutput(res) as T;
  }
}
