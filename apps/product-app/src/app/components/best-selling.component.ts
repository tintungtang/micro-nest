import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MfeButtonComponent } from 'shared-ui';
import { ProductCardComponent } from './product-card.component';
import { addCartItem } from 'hub';

@Component({
  selector: 'mfe-product-best-selling-section',
  standalone: true,
  imports: [CommonModule, MfeButtonComponent, ProductCardComponent],
  templateUrl: './best-selling.component.html',
})
export class BestSellingComponent {
  products = [
    {
      name: 'Whole Wheat Sandwich Bread',
      description: 'Freshly baked whole wheat bread.',
      imageUrl: 'assets/images/product-thumb-1.png',
      price: 18,
    },
    {
      name: 'Whole Grain Oatmeal',
      description: 'Healthy whole grain oats.',
      imageUrl: 'assets/images/product-thumb-2.png',
      price: 50,
    },
    {
      name: 'Sharp Cheddar Cheese Block',
      description: 'Rich cheddar cheese block.',
      imageUrl: 'assets/images/product-thumb-3.png',
      price: 12,
    },
    {
      name: 'Organic Baby Spinach',
      description: 'Crisp organic spinach.',
      imageUrl: 'assets/images/product-thumb-4.png',
      price: 18,
    },
    {
      name: 'Organic Spinach Leaves (Fresh Produce)',
      description: 'Fresh organic spinach leaves.',
      imageUrl: 'assets/images/product-thumb-5.png',
      price: 18,
    },
    {
      name: 'Fresh Salmon',
      description: 'High quality salmon.',
      imageUrl: 'assets/images/product-thumb-6.png',
      price: 18,
    },
    {
      name: 'Imported Italian Spaghetti Pasta',
      description: 'Premium spaghetti pasta.',
      imageUrl: 'assets/images/product-thumb-7.png',
      price: 18,
    },
    {
      name: 'Granny Smith Apples',
      description: 'Crisp and tangy apples.',
      imageUrl: 'assets/images/product-thumb-8.png',
      price: 18,
    },
    {
      name: 'Organic 2% Reduced Fat Milk',
      description: 'Organic reduced fat milk.',
      imageUrl: 'assets/images/product-thumb-9.png',
      price: 18,
    },
    {
      name: 'Greek Style Plain Yogurt',
      description: 'Creamy Greek yogurt.',
      imageUrl: 'assets/images/product-thumb-10.png',
      price: 18,
    },
  ];

  onAddToCart(product: any) {
    addCartItem(product);
  }
}
