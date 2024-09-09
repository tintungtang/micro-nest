import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Helper function for validation
const getPort = (port: string | undefined, defaultPort: number): number => {
  const parsedPort = parseInt(port ?? '', 10);
  return isNaN(parsedPort) ? defaultPort : parsedPort;
};

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_SERVICE_HOST ?? 'localhost',
          port: getPort(process.env.AUTH_SERVICE_PORT, 3001),
        },
      },
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.PRODUCT_SERVICE_HOST ?? 'localhost',
          port: getPort(process.env.PRODUCT_SERVICE_PORT, 3002),
        },
      },
      {
        name: 'FILE_STORAGE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.FILE_STORAGE_SERVICE_HOST ?? 'localhost',
          port: getPort(process.env.FILE_STORAGE_SERVICE_PORT, 3003),
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class GatewayModule {}
