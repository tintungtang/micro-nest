import { DashboardComponent } from './dashboard/dashboard.component';
import { Route } from '@angular/router';
import { PagesComponent } from './pages.component';
import { SampleComponent } from './sample/sample.component';
import { OrderComponent } from './order/order.component';

export const pagesRoutes: Route[] = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'sample', component: SampleComponent },
      { path: 'order', component: OrderComponent },
      {
        path: 'products',
        loadChildren: () =>
          import('product-app/Routes').then((m) => m.remoteRoutes),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
