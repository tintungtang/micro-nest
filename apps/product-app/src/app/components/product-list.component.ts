import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MfeHeaderComponent } from 'shared-ui';
import { addToCart, Product } from 'hub';
import { ProductCardComponent } from './product-card.component';
import { ProductsService } from '../services/products.service';

@Component({
    selector: 'mfe-product-list',
    standalone: true,
    imports: [CommonModule, MfeHeaderComponent, ProductCardComponent],
    template: `
        <section class="container py-4">
            <mfe-ui-header
                title="Products"
                [subtitle]="query ? 'Results for &quot;' + query + '&quot;' : 'Browse our full catalog'"
            ></mfe-ui-header>

            <p *ngIf="products.length === 0" class="text-muted">
                No products match "{{ query }}".
            </p>

            <div class="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
                <div class="col" *ngFor="let product of products">
                    <mfe-product-card
                        [product]="product"
                        (addToCart)="onAddToCart(product)"
                    ></mfe-product-card>
                </div>
            </div>
        </section>
    `
})
export class ProductListComponent implements OnInit, OnDestroy {
    products: Product[] = [];
    query = '';
    private queryParamsSub?: Subscription;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly productsService: ProductsService
    ) {}

    ngOnInit(): void {
        // URL state: the shell's search box navigates to /pages/products?q=...
        this.queryParamsSub = this.route.queryParamMap.subscribe((params) => {
            this.query = params.get('q') ?? '';
            this.products = this.productsService.getProducts(this.query);
        });
    }

    ngOnDestroy(): void {
        this.queryParamsSub?.unsubscribe();
    }

    onAddToCart(product: Product): void {
        addToCart(product);
    }
}
