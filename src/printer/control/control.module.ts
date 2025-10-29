import { Module } from '@nestjs/common';
import { PrinterControlMovementModule } from './movement/movement.module';

@Module({
  imports: [PrinterControlMovementModule],
})
export class PrinterControlModule {}
