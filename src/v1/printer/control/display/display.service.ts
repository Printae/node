import { Injectable } from '@nestjs/common';
import { Response } from 'src/classes/api/response';
import { MessageDisplayGCodeCommand } from 'src/classes/gcode/commands/control/display/message';
import { Printer } from 'src/classes/printer/printer';

@Injectable()
export class PrinterControlDisplayService {
  async setMessage(message: string) {
    if (typeof message != 'string' || message.length < 1)
      return Response.error('Invalid message');

    if (!Printer.isReady) return Response.error('Printer is not ready');

    const command = new MessageDisplayGCodeCommand(message);
    await Printer.instance.interface.sendCommand(command);

    return Response.ok('Message set successfully');
  }
}
