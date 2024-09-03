import { Controller, Get, Inject, Post, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
    @Inject('PRODUCT_SERVICE') private readonly productServiceClient: ClientProxy
  ) {}

  @Get('products')
  getProducts(): Observable<string[]> {
    return this.productServiceClient.send<string[]>(
      { cmd: 'get_products' },
      {}
    );
  }

  @Post('login')
  login(
    @Body() loginDto: { username: string; password: string }
  ): Observable<{ access_token: string }> {
    return this.authServiceClient.send<
      { access_token: string },
      { username: string; password: string }
    >({ cmd: 'login' }, loginDto);
  }
}
