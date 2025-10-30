import { Controller, Get } from '@nestjs/common';
import { PrinterFirmwareService } from './firmware.service';

@Controller('printer/firmware')
export class PrinterFirmwareController {
  constructor(private readonly firmwareService: PrinterFirmwareService) {}

  @Get('info')
  async getFirmwareInfo() {
    return await this.firmwareService.getInfo();
  }
}
