import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero.component';
import { CategoriesComponent } from './components/categories.component';
import { BestSellingComponent } from 'product-ui/BestSellingFragment';
import { BannerBlocksComponent } from './components/banner-blocks.component';
import { FeaturedProductsComponent } from './components/featured-products.component';
import { NewsletterComponent } from './components/newsletter.component';
import { PopularProductsComponent } from './components/popular-products.component';
import { LatestProductsComponent } from './components/latest-products.component';
import { LatestBlogComponent } from './components/latest-blog.component';
import { DownloadAppComponent } from './components/download-app.component';
import { SearchTagsComponent } from './components/search-tags.component';
import { FeaturesComponent } from './components/features.component';

@Component({
  standalone: true,
  selector: 'mfe-storefront-dashboard',
  imports: [
    CommonModule,
    HeroComponent,
    CategoriesComponent,
    BestSellingComponent,
    BannerBlocksComponent,
    FeaturedProductsComponent,
    NewsletterComponent,
    PopularProductsComponent,
    LatestProductsComponent,
    LatestBlogComponent,
    DownloadAppComponent,
    SearchTagsComponent,
    FeaturesComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
