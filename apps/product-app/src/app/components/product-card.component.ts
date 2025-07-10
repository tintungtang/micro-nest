import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
    selector: 'mfe-product-card',
    imports: [CommonModule, RouterLink],
    templateUrl: './product-card.component.html',
    encapsulation: ViewEncapsulation.Emulated
})
export class ProductCardComponent {
    @Input() product!: { id: number; name: string; description: string; imageUrl: string; price: number };
    @Input() productId!: string | number;
    @Input() showAddToCart = true;
    @Output() addToCart = new EventEmitter<void>();

    constructor(private readonly router: Router) {}

    onAddToCart() {
        console.log('[AddToCart]', this.product);
        this.addToCart.emit();
    }

    viewDetails() {
        if (this.product.id) {
            this.router.navigateByUrl(`/pages/products/${this.product.id}`);
        }
    }
}
