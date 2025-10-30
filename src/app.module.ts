import { Module } from '@nestjs/common';
import { PrinterModule } from './v1/printer/printer.module';
import { AppController } from './v1/app.controller';
import { AppService } from './v1/app.service';
import { PrinterService } from './v1/printer/printer.service';
import { PrinterFirmwareService } from './v1/printer/firmware/firmware.service';

@Module({
  imports: [PrinterModule],
  controllers: [AppController],
  providers: [AppService, PrinterService, PrinterFirmwareService],
})
export class AppModule {}
