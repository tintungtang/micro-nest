import { Route } from '@angular/router';
import { OrderListComponent } from '../components/order-list/OrderListComponent.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: OrderListComponent
  }
];