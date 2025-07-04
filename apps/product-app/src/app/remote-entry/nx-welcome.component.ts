import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../components/product-card.component';

@Component({
    selector: 'mfe-product-nx-welcome',
    imports: [CommonModule, ProductCardComponent],
    template: `
        <div class="p-4">
            <mfe-product-card [product]="product"></mfe-product-card>
        </div>
    `
})
export class NxWelcomeComponent {
    product = {
        id: -1,
        name: 'Sample Product',
        description: 'Demo description',
        imageUrl: '',
        price: 0
    };
}

