import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'storefront-category-section',
  standalone: true,
    imports: [CommonModule],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent {
  categories = [
    { title: 'Fruits & Veges', image: '/assets/images/category-thumb-1.jpg' },
    { title: 'Breads & Sweets', image: '/assets/images/category-thumb-2.jpg' },
    { title: 'Beverages', image: '/assets/images/category-thumb-3.jpg' },
  ];
}
