import { Injectable } from '@nestjs/common';
import { Response } from 'src/classes/api/response';
import { Printer } from 'src/classes/printer/printer';

@Injectable()
export class PrinterService {
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
