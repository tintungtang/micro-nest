import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'mfe-storefront-category-section',
    imports: [ CommonModule ],
    standalone: true,
    templateUrl: './categories.component.html'
})
export class CategoriesComponent {
  categories = [
    { title: 'Fruits & Veges', image: '/assets/images/category-thumb-1.jpg' },
    { title: 'Breads & Sweets', image: '/assets/images/category-thumb-2.jpg' },
    { title: 'Beverages', image: '/assets/images/category-thumb-3.jpg' },
  ];
}
