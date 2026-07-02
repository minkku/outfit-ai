import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix('api');
  app.enableCors({ origin: process.env.ALLOWED_ORIGIN ?? 'http://localhost:3000' });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const port = process.env.PORT ?? 3001;
  await app.listen(port, '0.0.0.0');
}

bootstrap();
