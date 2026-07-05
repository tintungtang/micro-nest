import * as path from 'path';
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DataItem, DynamicFileService } from './dynamic-file.service';

@Controller('files')
export class DynamicFileController {
    private readonly storageRoot = path.resolve(process.env.FILE_STORAGE_ROOT ?? path.join(process.cwd(), 'data'));

    constructor(private readonly dataService: DynamicFileService) {}

    private getFilePathFromParams(params: string[], directoryListing = true): string {
        const pathParam = params.pop();
        if (!pathParam) {
            throw new BadRequestException('Invalid path');
        }

        const factors = pathParam.split('/');
        const id = factors.pop();

        const isFile = !isNaN(Number(id));
        const fileName = isFile ? `${id}.json` : (directoryListing ? '' : `${Date.now()}.json`);

        const requestPath = path.resolve(this.storageRoot, ...factors, fileName);
        const relativePath = path.relative(this.storageRoot, requestPath);
        if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
            throw new BadRequestException('Invalid path');
        }

        return requestPath;
    }

    private parseId(id: string | undefined): number {
        const parsedId = Number(id);
        if (!id || !Number.isInteger(parsedId) || parsedId < 0) {
            throw new BadRequestException('Invalid ID');
        }

        return parsedId;
    }

    @Get('*')
    getAll(@Param() params: Record<string, string>): DataItem[] {
        const requestPath = this.getFilePathFromParams(Object.values(params), true);
        return this.dataService.readAllFilesInFolder(requestPath);
    }

    @Get('*/*')
    getById(@Param() params: Record<string, string>): DataItem | { message: string } {
        const values = Object.values(params);
        const id = this.parseId(values.pop());

        const requestPath = this.getFilePathFromParams(values);
        const item = this.dataService.getById(requestPath, id);
        return item || { message: 'Item not found' };
    }

    @Post('*')
    create(@Param() params: Record<string, string>, @Body() item: DataItem): { message: string } {
        const requestPath = this.getFilePathFromParams(Object.values(params));
        this.dataService.create(requestPath, item);
        return { message: `Item created successfully ${requestPath}` };
    }

    @Put('*/*')
    update(@Param() params: Record<string, string>, @Body() updatedItem: Partial<DataItem>): { message: string } {
        const values = Object.values(params);
        const id = this.parseId(values.pop());

        const requestPath = this.getFilePathFromParams(values);
        const success = this.dataService.update(requestPath, id, updatedItem);
        return success
            ? { message: 'Item updated successfully' }
            : { message: 'Item not found' };
    }

    @Delete('*/*')
    delete(@Param() params: Record<string, string>): { message: string } {
        const values = Object.values(params);
        const id = this.parseId(values.pop());

        const requestPath = this.getFilePathFromParams(values);
        const success = this.dataService.delete(requestPath, id);
        return success
            ? { message: 'Item deleted successfully' }
            : { message: 'Item not found' };
    }
}
