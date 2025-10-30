import { Module } from '@nestjs/common';
import { PrinterControlModule } from './control/control.module';
import { PrinterController } from './printer.controller';
import { PrinterService } from './printer.service';
import { PrinterFirmwareModule } from './firmware/firmware.module';
import { PrinterFirmwareService } from './firmware/firmware.service';

@Module({
  imports: [PrinterControlModule, PrinterFirmwareModule],
  controllers: [PrinterController],
  providers: [PrinterService, PrinterFirmwareService],
})
export class PrinterModule {}
