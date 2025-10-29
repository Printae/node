import { Module } from '@nestjs/common';
import { PrinterControlMovementModule } from './movement/movement.module';
import { PrinterControlDisplayModule } from './display/display.module';

@Module({
  imports: [PrinterControlMovementModule, PrinterControlDisplayModule],
})
export class PrinterControlModule {}
