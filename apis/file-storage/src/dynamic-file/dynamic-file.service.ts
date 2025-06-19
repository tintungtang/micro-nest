import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import path from 'path';

interface DataItem {
    id: number;
    name: string;
    description: string;
}

export { DataItem };


@Injectable()
export class DynamicFileService {
    private ensureDirectory(filePath: string): void {
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }

    private readData(filePath: string): DataItem[] {
        this.ensureDirectory(filePath);

        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify([]));
        }

        const rawData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(rawData);
    }

    private writeData(filePath: string, data: DataItem[]): void {
        this.ensureDirectory(filePath);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }

    getAll(filePath: string): DataItem[] {
        return this.readData(filePath);
    }

    getById(filePath: string, id: number): DataItem | undefined {
        return this.readData(filePath).find(item => item.id === id);
    }

    create(filePath: string, item: DataItem): void {
        const data = this.readData(filePath);
        data.push(item);
        this.writeData(filePath, data);
    }

    update(filePath: string, id: number, updatedItem: Partial<DataItem>): boolean {
        const data = this.readData(filePath);
        const index = data.findIndex(item => item.id === id);
        if (index === -1) return false;
        data[index] = { ...data[index], ...updatedItem };
        this.writeData(filePath, data);
        return true;
    }

    delete(filePath: string, id: number): boolean {
        const data = this.readData(filePath);
        const index = data.findIndex(item => item.id === id);
        if (index === -1) return false;
        data.splice(index, 1);
        this.writeData(filePath, data);
        return true;
    }

    readAllFilesInFolder(folderPath: string): DataItem[] {
        if (!fs.existsSync(folderPath)) {
            throw new Error('Folder does not exist');
        }

        const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.json'));
        let allData: DataItem[] = [];

        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const data = this.readData(filePath);
            allData = allData.concat(data);
        }

        return allData;
    }
}
