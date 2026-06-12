import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { ProductDTO } from './dto/product.dto';

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) {
    }

    async create(productDTO: ProductDTO): Promise<Product> {
        return this.prisma.product.create({
            data: productDTO,
        });
    }

    async getProducts(): Promise<Product[]> {
        return this.prisma.product.findMany();
    }

    async getProduct(id: string): Promise<Product> {
        if (!id.trim()) {
            throw new BadRequestException('Invalid product id');
        }

        const product = await this.prisma.product.findUnique({
            where: { id },
        });
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return product;
    }
}
