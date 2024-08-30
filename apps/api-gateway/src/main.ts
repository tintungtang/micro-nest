import { GatewayModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001,
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3002,
    },
  });

  await app.startAllMicroservices();
  const config = new DocumentBuilder()
    .setTitle('Api-Gateway APIs')
    .setDescription('Document api-gateway APIs')
    .setVersion('1.0')
    .addTag('v1.0')
    .build();
    const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  console.log('app', app);
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();