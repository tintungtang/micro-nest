import { Route } from '@angular/router';
import { OrderListComponent } from '../components/order-list/order-list.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: OrderListComponent,
  },
];
