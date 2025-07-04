import { Route } from '@angular/router';

export const ordersRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('../components/order-list.component').then((m) => m.OrderListComponent),
  },
]; 