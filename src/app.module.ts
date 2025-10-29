import { Module } from '@nestjs/common';
import { PrinterModule } from './v1/printer/printer.module';
import { AppController } from './v1/app.controller';
import { AppService } from './v1/app.service';

@Module({
  imports: [PrinterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
