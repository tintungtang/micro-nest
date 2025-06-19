import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'mfe-product-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './product-card.component.html',
    encapsulation: ViewEncapsulation.Emulated,
})
export class ProductCardComponent {
    @Input() product!: { name: string; description: string; imageUrl: string; price: number };
    @Input() productId!: string | number;
    @Input() showAddToCart = true;
    @Output() addToCart = new EventEmitter<void>();

    constructor(private readonly router: Router) {}

    onAddToCart() {
        this.addToCart.emit();
    }

    viewDetails() {
        if (this.productId !== undefined && this.productId !== null) {
            this.router.navigate(['/products', this.productId]);
        }
    }
}
