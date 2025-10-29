import { Module } from '@nestjs/common';
import { PrinterControlModule } from './control/control.module';
import { PrinterController } from './printer.controller';
import { PrinterService } from './printer.service';

@Module({
  imports: [PrinterControlModule],
  controllers: [PrinterController],
  providers: [PrinterService],
})
export class PrinterModule {}
