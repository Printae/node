import { Injectable } from '@nestjs/common';
import { Response } from 'src/classes/api/response';
import { Printer } from 'src/classes/printer/printer';
import { PrinterFirmwareService } from './firmware/firmware.service';

@Injectable()
export class PrinterService {
  constructor(private readonly firmwareService: PrinterFirmwareService) {}

  async _info() {
    if (!Printer.isReady)
      return {
        connected: false,
      };

    const firmwareInfo = await this.firmwareService.getInfo();
    if (firmwareInfo.status != 'ok')
      return {
        connected: false,
      };

    return {
      connected: true,
      name: (firmwareInfo.data.firmware['MACHINE_TYPE'] as string) || 'Unknown',
      firmware:
        (firmwareInfo.data.firmware['FIRMWARE_NAME'] as string) || 'Unknown',
    };
  }

  async connectPrinter(port: string, baudRate: number) {
    if (!Number.isInteger(baudRate) || baudRate <= 0)
      return Response.error('Invalid baud rate');
    if (typeof port !== 'string' || port.length === 0)
      return Response.error('Invalid port');

    if (Printer.isReady) return Response.error('Printer already connected');

    Printer.create(port, baudRate);
    await Printer.instance.connect();

    return Response.ok('Printer connected successfully');
  }
}
