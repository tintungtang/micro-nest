import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: { port: parseInt(process.env.FILE_STORAGE_SERVICE_PORT, 10) || 3003 },
  });

  await app.listen();
  Logger.log(`🚀 file-storage Service is running as a microservice on port ${process.env.FILE_STORAGE_SERVICE_PORT ?? 3003}`);

  const httpApp = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('file-storage APIs')
    .setDescription('Document file-storage APIs')
    .setVersion('1.0')
    .addTag('v1.0')
    .build();
  const document = SwaggerModule.createDocument(httpApp, config);
  SwaggerModule.setup('swagger', httpApp, document);
  const globalPrefix = 'api';
  httpApp.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await httpApp.listen(port);
  Logger.log(`🚀 HTTP API is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
