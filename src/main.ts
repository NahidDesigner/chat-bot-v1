import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const configService = app.get(ConfigService);
  // Hostinger requirement: Use process.env.PORT (they will set this)
  const port = process.env.PORT || configService.get<number>('PORT') || 8000;
  const isDevelopment = configService.get<string>('NODE_ENV') !== 'production';

  // CORS
  app.enableCors({
    origin: configService.get<string[]>('CORS_ORIGINS') || ['http://localhost:3000'],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // API prefix
  app.setGlobalPrefix('api');

  // Swagger documentation (development only)
  if (isDevelopment) {
    const config = new DocumentBuilder()
      .setTitle('AI Chatbot Platform API')
      .setDescription('Multilingual AI Chatbot SaaS Platform API')
      .setVersion('1.0.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Application is running on: http://0.0.0.0:${port}/api`);
  if (isDevelopment) {
    console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
  }
}

bootstrap();

