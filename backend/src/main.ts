import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

let cachedApp;

async function bootstrap() {
  if (cachedApp) return cachedApp;
  cachedApp = await NestFactory.create(AppModule);
  cachedApp.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );
  cachedApp.enableCors();
  cachedApp.use(cookieParser());
  await cachedApp.init();
  return cachedApp;
}

export default async function handler(req, res) {
  const nestApp = await bootstrap();
  const httpAdapter = nestApp.getHttpAdapter();
  httpAdapter.getInstance()(req, res);
}

if (!process.env.VERCEL) {
  bootstrap().then((app) => app.listen(3000));
}
