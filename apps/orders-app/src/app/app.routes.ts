import { Route } from '@angular/router';
import { ordersRoutes } from './routes/orders.routes';

export const appRoutes: Route[] = [
    {
        path: '',
        children: ordersRoutes
    }
];
