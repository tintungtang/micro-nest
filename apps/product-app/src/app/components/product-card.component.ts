import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'mfe-product-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './product-card.component.html',
    encapsulation: ViewEncapsulation.Emulated,
})
export class ProductCardComponent {
    @Input() product!: { name: string; description: string; imageUrl: string; price: number };
    @Input() showAddToCart = true;
    @Output() addToCart = new EventEmitter<void>();

    onAddToCart() {
        this.addToCart.emit();
    }
}
