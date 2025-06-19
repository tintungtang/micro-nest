import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ProductsService } from './products.service';
import { productsProviders } from './products.providers';
import { ProductsController } from './products.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [ProductsController],
    providers: [ProductsService, ...productsProviders],
})
export class ProductsModule {}
