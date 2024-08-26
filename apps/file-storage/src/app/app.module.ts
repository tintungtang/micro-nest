import { Module } from '@nestjs/common';
import { DynamicFileModule } from '../dynamic-file/dynamic-file.module';

@Module({
  imports: [DynamicFileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
