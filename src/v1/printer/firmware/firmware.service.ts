import { Injectable } from '@nestjs/common';
import { Response } from 'src/classes/api/response';
import { InfoFirmwareGCodeCommand } from 'src/classes/gcode/commands/firmware/info';
import { Printer } from 'src/classes/printer/printer';

@Injectable()
export class PrinterFirmwareService {
  async getInfo() {
    if (!Printer.isReady) return Response.error('Printer not ready');

    const command = new InfoFirmwareGCodeCommand();
    const res = await Printer.instance.interface.sendCommand(command);

    return Response.ok(res);
  }
}
