import { Controller, Get, Inject, Post, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Throttle } from '@nestjs/throttler';
@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
    @Inject('PRODUCT_SERVICE') private readonly productServiceClient: ClientProxy,
    @Inject('FILE_STORAGE_SERVICE') private readonly fileStorageServiceClient: ClientProxy
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

  @Get('files')
  getFiles(): Observable<string[]> {
    return this.fileStorageServiceClient.send<string[]>({ cmd: 'get_files' }, {});
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Get('limited-endpoint')
  handleLimitedRequest() {
    return 'This route is rate-limited!';
  }
}


