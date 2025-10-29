import { Module } from '@nestjs/common';
import { PrinterControlMovementController } from './movement.controller';
import { PrinterControlMovementService } from './movement.service';

@Module({
  imports: [],
  controllers: [PrinterControlMovementController],
  providers: [PrinterControlMovementService],
})
export class PrinterControlMovementModule {}
