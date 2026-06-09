import * as mongoose from 'mongoose';
import { CategorySchema } from './category.schema';

export const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, maxlength: 120 },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, maxlength: 1000 },
    image: String,
    category: CategorySchema,
}, { timestamps: true });
