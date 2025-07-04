import { Routes } from '@angular/router';
import { OrderListComponent } from '../components/order-list/order-list.component';

export const ordersRoutes: Routes = [
    {
        path: '',
        component: OrderListComponent,
    },
];
