import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProductDTO } from './dto/product.dto';
import { Product } from './interfaces/product.interface';
import { ProductsService } from './products.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @MessagePattern({ cmd: 'get_products' })
    getDataCmd() {
        return this.productsService.getProducts();
    }

    @Post()
    async create(@Body() productDTO: ProductDTO) {
        return this.productsService.create(productDTO);
    }

    @Get()
    async findAll(): Promise<Product[]> {
        return this.productsService.getProducts();
    }

    @Get(':id')
    async getById(@Param('id') productId: string): Promise<Product> {
        return this.productsService.getProduct(productId);
    }
}
