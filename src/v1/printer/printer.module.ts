import { Module } from '@nestjs/common';
import { PrinterControlModule } from './control/control.module';
import { PrinterController } from './printer.controller';
import { PrinterService } from './printer.service';
import { PrinterFirmwareModule } from './firmware/firmware.module';

@Module({
  imports: [PrinterControlModule, PrinterFirmwareModule],
  controllers: [PrinterController],
  providers: [PrinterService],
})
export class PrinterModule {}
