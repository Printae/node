import { Controller, Post } from '@nestjs/common';
import { PrinterControlMovementService } from './movement.service';

@Controller('/printer/control/movement')
export class PrinterControlMovementController {
  constructor(
    private readonly movementService: PrinterControlMovementService,
  ) {}

  @Post('/home')
  async homeAllAxes() {
    return await this.movementService.homeAllAxes();
  }
}
