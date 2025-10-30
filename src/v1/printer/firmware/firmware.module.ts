import { Module } from '@nestjs/common';
import { PrinterFirmwareController } from './firmware.controller';
import { PrinterFirmwareService } from './firmware.service';

@Module({
  imports: [],
  controllers: [PrinterFirmwareController],
  providers: [PrinterFirmwareService],
})
export class PrinterFirmwareModule {}
