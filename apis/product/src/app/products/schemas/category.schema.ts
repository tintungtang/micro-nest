import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const CategorySchema: Schema = new mongoose.Schema({
    name: String
});
