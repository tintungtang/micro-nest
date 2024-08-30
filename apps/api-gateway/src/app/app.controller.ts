import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('gateway')
export class GatewayController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
    @Inject('PRODUCT_SERVICE') private readonly productServiceClient: ClientProxy,
  ) {}
 
  @Get('products')
  getProducts(): Promise<string[]> {
    console.log('run this');
    
    return this.productServiceClient.send<string[]>({ cmd: 'get_products' }, {}).toPromise();
  }
}
