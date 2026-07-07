import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { addToCart, Product } from 'hub';
import { ProductCardComponent } from './product-card.component';
import { ProductsService } from '../services/products.service';

@Component({
    selector: 'mfe-product-best-selling-section',
    imports: [ CommonModule, RouterLink, ProductCardComponent ],
    standalone: true,
    templateUrl: './best-selling.component.html'
})
export class BestSellingComponent {
    products: Product[];

    constructor(productsService: ProductsService) {
        this.products = productsService.getProducts();
    }

    onAddToCart(product: Product) {
        addToCart(product);
    }
}
