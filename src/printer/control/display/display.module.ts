import { Module } from '@nestjs/common';
import { PrinterControlDisplayController } from './display.controller';
import { PrinterControlDisplayService } from './display.service';

@Module({
  imports: [],
  controllers: [PrinterControlDisplayController],
  providers: [PrinterControlDisplayService],
})
export class PrinterControlDisplayModule {}
