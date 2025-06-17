import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header.component';
import { HeroComponent } from './components/hero.component';
import { CategoriesComponent } from './components/categories.component';

@Component({
  standalone: true,
  selector: 'storefront-dashboard',
  imports: [CommonModule, HeaderComponent, HeroComponent, CategoriesComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
