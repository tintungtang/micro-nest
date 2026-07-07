import { Injectable } from '@angular/core';
import { Product } from 'hub';

const PRODUCTS: Product[] = [
    {
        id: 1,
        name: 'Whole Wheat Sandwich Bread',
        description: 'Freshly baked whole wheat bread.',
        imageUrl: 'assets/images/product-thumb-1.png',
        price: 18,
        category: 'Bakery'
    },
    {
        id: 2,
        name: 'Whole Grain Oatmeal',
        description: 'Healthy whole grain oats.',
        imageUrl: 'assets/images/product-thumb-2.png',
        price: 50,
        category: 'Groceries'
    },
    {
        id: 3,
        name: 'Sharp Cheddar Cheese Block',
        description: 'Rich cheddar cheese block.',
        imageUrl: 'assets/images/product-thumb-3.png',
        price: 12,
        category: 'Dairy'
    },
    {
        id: 4,
        name: 'Organic Baby Spinach',
        description: 'Crisp organic spinach.',
        imageUrl: 'assets/images/product-thumb-4.png',
        price: 18,
        category: 'Produce'
    },
    {
        id: 5,
        name: 'Organic Spinach Leaves (Fresh Produce)',
        description: 'Fresh organic spinach leaves.',
        imageUrl: 'assets/images/product-thumb-5.png',
        price: 18,
        category: 'Produce'
    },
    {
        id: 6,
        name: 'Fresh Salmon',
        description: 'High quality salmon.',
        imageUrl: 'assets/images/product-thumb-6.png',
        price: 18,
        category: 'Seafood'
    },
    {
        id: 7,
        name: 'Imported Italian Spaghetti Pasta',
        description: 'Premium spaghetti pasta.',
        imageUrl: 'assets/images/product-thumb-7.png',
        price: 18,
        category: 'Groceries'
    },
    {
        id: 8,
        name: 'Granny Smith Apples',
        description: 'Crisp and tangy apples.',
        imageUrl: 'assets/images/product-thumb-8.png',
        price: 18,
        category: 'Produce'
    },
    {
        id: 9,
        name: 'Organic 2% Reduced Fat Milk',
        description: 'Organic reduced fat milk.',
        imageUrl: 'assets/images/product-thumb-9.png',
        price: 18,
        category: 'Dairy'
    },
    {
        id: 10,
        name: 'Greek Style Plain Yogurt',
        description: 'Creamy Greek yogurt.',
        imageUrl: 'assets/images/product-thumb-10.png',
        price: 18,
        category: 'Dairy'
    }
];

@Injectable({ providedIn: 'root' })
export class ProductsService {
    getProducts(query = ''): Product[] {
        const term = query.trim().toLowerCase();
        if (!term) {
            return PRODUCTS;
        }
        return PRODUCTS.filter(
            (product) =>
                product.name.toLowerCase().includes(term) ||
                product.description.toLowerCase().includes(term) ||
                (product.category ?? '').toLowerCase().includes(term)
        );
    }

    getProduct(id: number): Product | undefined {
        return PRODUCTS.find((product) => product.id === id);
    }
}
