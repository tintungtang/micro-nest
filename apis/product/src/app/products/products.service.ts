import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
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
        return this.productModel.findById(id);
    }
}
