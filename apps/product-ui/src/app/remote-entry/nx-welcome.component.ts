import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../components/product-card.component';

@Component({
  selector: 'mfe-product-nx-welcome',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <div class="p-4">
      <mfe-product-card></mfe-product-card>
    </div>
  `,
})
export class NxWelcomeComponent {}

