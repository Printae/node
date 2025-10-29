import { Injectable } from '@nestjs/common';
import { Response } from 'src/classes/api/response';

@Injectable()
export class AppService {
  health() {
    return Response.ok('Healthy');
  }
}
