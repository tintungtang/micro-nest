import { Mongoose } from 'mongoose';
import { ProductSchema } from './schemas/product.schema';
import { CategorySchema } from './schemas/category.schema';

export const productsProviders = [
    {
        provide: 'PRODUCT_MODEL',
        useFactory: (mongoose: Mongoose) => mongoose.model('Product', ProductSchema),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'CAT_MODEL',
        useFactory: (mongoose: Mongoose) => mongoose.model('Category', CategorySchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
