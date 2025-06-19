import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'mfe-product-unavailable',
  template: `Product App is currently unavailable. Please try again later.`,
  standalone: true,
  imports: [CommonModule],
})
export class ProductUnavailableComponent {}

@NgModule({
  imports: [ProductUnavailableComponent],
  exports: [ProductUnavailableComponent],
})
export class FallbackProductModule {}
