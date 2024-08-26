import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DynamicFileService {
  private readonly filesDirectory = path.join(__dirname, '../../files');

  createFile(filename: string, content: string): string {
    const directoryPath = path.join(__dirname, '../../files');
    const filePath = path.join(directoryPath, filename);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    // Write the file with the provided content
    fs.writeFileSync(filePath, content);

    return `File ${filename} created successfully at ${filePath}`;
  }

  getFile(filename: string): Buffer {
    const filePath = path.join(this.filesDirectory, filename);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException(`File ${filename} not found`);
    }

    return fs.readFileSync(filePath);
  }
}
