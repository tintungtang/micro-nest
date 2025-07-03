import { Route } from '@angular/router';
import { loadRemoteWithFallback } from 'hub';

export const appRoutes: Route[] = [
  {
    path: 'orders-app',
    loadChildren: () => import('orders-app/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.routes').then((c) => c.pagesRoutes),
  },
  {
    path: 'auth',
    loadChildren: () => import('auth-app/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full',
  },
  {
    path: '***',
    redirectTo: 'pages',
  },
];
