import { GCodeCommand } from '../gcode/commands/_command';
import { Printer } from './printer';

export class PrinterInterface {
  private _printer: Printer;

  constructor(printer: Printer) {
    this._printer = printer;
  }

  public async sendCommand(command: GCodeCommand) {
    const str = command.toString();

    return await this._printer.serial.queue.awaitPush(str);
  }
}
