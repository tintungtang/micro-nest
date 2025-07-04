import { Route } from '@angular/router';

export const remoteRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('../routes/orders.routes').then((m) => m.ordersRoutes),
  },
]; 