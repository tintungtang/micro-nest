import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';
import { ProductDTO } from './dto/product.dto';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
    constructor(@Inject('PRODUCT_MODEL') private readonly productModel: Model<Product>) {
    }

    async create(productDTO: ProductDTO): Promise<Product> {
        return this.productModel.create(productDTO);
    }

    async getProducts(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async getProduct(id: string): Promise<Product> {
        if (!isValidObjectId(id)) {
            throw new BadRequestException('Invalid product id');
        }

        const product = await this.productModel.findById(id).exec();
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return product;
    }
}
