import { Document } from 'mongoose';

export interface Product extends Document {
    readonly name: string;
    readonly price: number;
    readonly description: string;
}
