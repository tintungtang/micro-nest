import { Route } from '@angular/router';

export const ordersRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('../components/order-list.component').then((m) => m.OrderListComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('../components/order-detail.component').then((m) => m.OrderDetailComponent),
  },
];
