import { Route } from '@angular/router';
import { loadRemoteWithFallback } from 'hub';

export const appRoutes: Route[] = [
  {
      path: 'pages',
      loadChildren: () =>
          import('./pages/pages.routes').then((c) => c.pagesRoutes)
  },
  {
      path: 'products/:id',
      loadComponent: () =>
          import('product-app/ProductDetailsPage').then((m) => m.ProductDetailsPage)
  },
  {
      path: 'auth',
      loadChildren: () =>
          import('auth-app/Routes').then((m) => m.remoteRoutes),
  },
    {
        path: '',
        redirectTo: 'pages',
        pathMatch: 'full',
    },
    {
        path: '***',
        redirectTo: 'pages'
    },
];
