import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { setLogger } from './logger/setLogger';
import { configProvider } from './app.config.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useLogger(setLogger(configProvider.useValue.logger));
  await app.listen(3000);
}
bootstrap();
