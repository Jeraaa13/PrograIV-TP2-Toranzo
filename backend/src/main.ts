import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

let app;

async function bootstrap() {
  app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();
  app.use(cookieParser());
  await app.init();
  return app;
}

export default async function handler(req, res) {
  const nestApp = await bootstrap();
  const httpAdapter = nestApp.getHttpAdapter();
  httpAdapter.getInstance()(req, res);
}

if (!process.env.VERCEL) {
  bootstrap().then((app) => app.listen(3000));
}
