import * as mongoose from 'mongoose';
import { CategorySchema } from './category.schema';

export const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
    category: CategorySchema,
});
