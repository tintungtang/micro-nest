import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../components/product-card.component';

@Component({
  selector: 'app-nx-welcome',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <div class="p-4">
      <app-product-card></app-product-card>
    </div>
  `,
})
export class NxWelcomeComponent {}

