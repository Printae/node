import { Body, Controller, Post } from '@nestjs/common';
import { PrinterControlDisplayService } from './display.service';

@Controller('/printer/control/display')
export class PrinterControlDisplayController {
  constructor(private readonly displayService: PrinterControlDisplayService) {}

  @Post('message')
  async setMessage(@Body('message') message: string) {
    return await this.displayService.setMessage(message);
  }
}
