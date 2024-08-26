import { Module } from '@nestjs/common';
import { DynamicFileService } from './dynamic-file.service';
import { DynamicFileController } from './dynamic-file.controller';

@Module({
  providers: [DynamicFileService],
  controllers: [DynamicFileController]
})
export class DynamicFileModule {}
