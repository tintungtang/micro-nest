import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MfeButtonComponent } from 'shared-ui';

@Component({
  selector: 'mfe-product-best-selling-section',
  standalone: true,
  imports: [CommonModule, MfeButtonComponent],
  templateUrl: './best-selling.component.html',
})
export class BestSellingComponent {}
