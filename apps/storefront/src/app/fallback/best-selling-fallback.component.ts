import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'mfe-product-best-selling-unavailable',
    standalone: true,
    imports: [CommonModule],
    template: `Best selling products are currently unavailable.`,
})
export class BestSellingFallbackComponent {}
