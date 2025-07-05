
import { Route } from '@angular/router';
import { OrderListComponent } from '../components/order-list.component';

export const ordersRoutes: Route[] = [
    {
        path: '',
        component: OrderListComponent,
    },
    {
        path: 'orders',
        component: OrderListComponent,
    },
    // Add more routes as needed
    {
        path: '**',
        redirectTo: ''
    }
];
