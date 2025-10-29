import { Body, Controller, Post } from '@nestjs/common';
import { PrinterService } from './printer.service';

@Controller('/printer')
export class PrinterController {
  constructor(private readonly printerService: PrinterService) {}

  @Post('/connect')
  async connectPrinter(
    @Body('port') port: string,
    @Body('baudRate') baudRate: number,
  ) {
    return await this.printerService.connectPrinter(port, baudRate);
  }
}
