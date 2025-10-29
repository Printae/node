import { Injectable } from '@nestjs/common';
import { Response } from 'src/classes/api/response';
import { HomeGCodeCommand } from 'src/classes/gcode/commands/home';
import { Printer } from 'src/classes/printer/printer';

@Injectable()
export class PrinterControlMovementService {
  async homeAllAxes() {
    if (!Printer.isReady) return Response.error('Printer not ready');

    const command = new HomeGCodeCommand();

    await Printer.instance.interface.sendCommand(command);

    return Response.ok('Homed successfuly');
  }
}
