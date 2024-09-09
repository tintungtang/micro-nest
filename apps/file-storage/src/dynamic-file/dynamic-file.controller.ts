import { Controller, Post, Body, Param, Res, Get } from '@nestjs/common';
import { DynamicFileService } from './dynamic-file.service';
import { Response } from 'express';
import { MessagePattern } from '@nestjs/microservices';

@Controller('dynamic-file')
export class DynamicFileController {
  constructor(private readonly dynamicFileService: DynamicFileService) {}

  @Post('create')
  createFile(@Body('filename') filename: string, @Body('content') content: string): string {
    return this.dynamicFileService.createFile(filename, content);
  }

  @Get('download/:filename')
  downloadFile(@Param('filename') filename: string, @Res() res: Response): void {
    const file = this.dynamicFileService.getFile(filename);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(file);
  }

  @MessagePattern({ cmd: 'get_files' })
  getFiles(): string[] {
    return ['file1.txt', 'file2.txt', 'file3.txt'];
  }
}
