import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MfeButtonComponent } from 'shared-ui';

@Component({
    selector: 'mfe-product-card',
    standalone: true,
    imports: [CommonModule, MfeButtonComponent],
    templateUrl: './product-card.component.html',
})
export class ProductCardComponent {}
