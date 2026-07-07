import { Route } from '@angular/router';
import { ProductListComponent } from '../components/product-list.component';
import { ProductDetailsComponent } from '../components/product-details.component';

export const remoteRoutes: Route[] = [
    { path: '', component: ProductListComponent },
    { path: ':id', component: ProductDetailsComponent }
];
