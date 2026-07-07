import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MfeBadgeComponent, MfeButtonComponent, MfeCardComponent } from 'shared-ui';
import { addToCart, Product } from 'hub';
import { ProductsService } from '../services/products.service';

@Component({
    selector: 'mfe-product-product-details',
    standalone: true,
    imports: [CommonModule, RouterLink, MfeBadgeComponent, MfeButtonComponent, MfeCardComponent],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
    product?: Product;
    justAdded = false;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly productsService: ProductsService
    ) {}

    ngOnInit(): void {
        // URL state: the product id is carried by the route (/pages/products/:id).
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.product = this.productsService.getProduct(id);
    }

    onAddToCart(): void {
        if (!this.product) {
            return;
        }
        addToCart(this.product);
        this.justAdded = true;
        setTimeout(() => (this.justAdded = false), 2000);
    }
}
