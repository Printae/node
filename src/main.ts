import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { apiRequest } from './classes/api/request';
import { ServerEndpoints } from './classes/api/endpoints/server';
import { NODE_ID } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);

  const res = await apiRequest(ServerEndpoints.nodes.inc.alive, 'post', {
    id: NODE_ID,
  });

  if (res.status == 'error')
    console.error('Failed to register node:', res.message);
}
void bootstrap();
