import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';

export const appRoutes: Route[] = [
  {
      path: 'pages',
      loadChildren: () =>
          import('./pages/pages.routes').then((c) => c.pagesRoutes)
  },
  {
      path: 'auth',
      loadChildren: () =>
          loadRemoteModule('auth-app', './Routes').then((m) => m.remoteRoutes),
  },
  {
      path: 'orders',
      loadChildren: () =>
          import('orders-app/Routes').then((m) => m.ordersRoutes),
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
