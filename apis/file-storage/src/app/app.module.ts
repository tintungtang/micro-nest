import { Module } from '@nestjs/common';
import { DynamicFileModule } from '../dynamic-file/dynamic-file.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DynamicFileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
