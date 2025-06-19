import * as path from 'path';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DataItem, DynamicFileService } from './dynamic-file.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('files')
export class DynamicFileController {
    constructor(private readonly dataService: DynamicFileService) {}

    private getFilePathFromParams(params: string[], directoryListing = true): string {
        const pathParam = params.pop();
        if (!pathParam) throw new Error('Invalid path');

        const factors = pathParam.split('/');
        const id = factors.pop();

        const isFile = !isNaN(Number(id));
        const fileName = isFile ? `${id}.json` : (directoryListing ? '' : `${Date.now()}.json`);

        return path.join(__dirname, ...factors, fileName);
    }

    @Get('*')
    getAll(@Param() params: Record<string, string>): DataItem[] {
        const requestPath = this.getFilePathFromParams(Object.values(params), true);
        return this.dataService.readAllFilesInFolder(requestPath);
    }

    @Get('*/*')
    getById(@Param() params: Record<string, string>): DataItem | { message: string } {
        const values = Object.values(params);
        const id = values.pop();
        if (!id) return { message: 'ID not provided' };

        const requestPath = this.getFilePathFromParams(values);
        const item = this.dataService.getById(requestPath, Number(id));
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
        const id = values.pop();
        if (!id) return { message: 'ID not provided' };

        const requestPath = this.getFilePathFromParams(values);
        const success = this.dataService.update(requestPath, Number(id), updatedItem);
        return success
            ? { message: 'Item updated successfully' }
            : { message: 'Item not found' };
    }

    @Delete('*/*')
    delete(@Param() params: Record<string, string>): { message: string } {
        const values = Object.values(params);
        const id = values.pop();
        if (!id) return { message: 'ID not provided' };

        const requestPath = this.getFilePathFromParams(values);
        const success = this.dataService.delete(requestPath, Number(id));
        return success
            ? { message: 'Item deleted successfully' }
            : { message: 'Item not found' };
    }
}
