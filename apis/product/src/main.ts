import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';



async function bootstrap() {
    const httpApp = await NestFactory.create(AppModule);
    httpApp.connectMicroservice<MicroserviceOptions>({
        transport: Transport.TCP,
        options: { port: parseInt(process.env.PRODUCT_SERVICE_PORT ?? '', 10) || 3002 }
    });

    httpApp.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new DocumentBuilder()
        .setTitle('Product APIs')
        .setDescription('Document Product APIs')
        .setVersion('1.0')
        .addTag('v1.0')
        .build();

    const document = SwaggerModule.createDocument(httpApp, config);
    SwaggerModule.setup('swagger', httpApp, document);
    const globalPrefix = 'api';
    httpApp.setGlobalPrefix(globalPrefix);
    await httpApp.startAllMicroservices();
    Logger.log(`🚀 Product Service is running as a microservice on port ${process.env.PRODUCT_SERVICE_PORT ?? 3002}`);

    const port = process.env.PORT || 3000;
    await httpApp.listen(port);
    Logger.log(`🚀 HTTP API is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
