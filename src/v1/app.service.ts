import { Injectable } from '@nestjs/common';
import { Response } from 'src/classes/api/response';
import { NODE_ID, VERSION } from 'src/config';
import { PrinterService } from './printer/printer.service';

@Injectable()
export class AppService {
  constructor(private readonly printerService: PrinterService) {}

  health() {
    return Response.ok('Healthy');
  }

  async info() {
    return Response.ok({
      id: NODE_ID,
      version: VERSION,
      printer: await this.printerService._info(),
    });
  }
}
