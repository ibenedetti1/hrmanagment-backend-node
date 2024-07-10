import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EnvironmentService } from './application/environment';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const environmentService = app.get(EnvironmentService);
  const port = environmentService.get('PORT') || 3000;

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: 'http://localhost:5173',
  });

  await app.listen(port);
}
bootstrap();
