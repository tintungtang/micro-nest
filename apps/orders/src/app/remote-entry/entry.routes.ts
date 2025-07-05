import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { ordersRoutes } from '../routes/orders.routes';

export const remoteRoutes: Route[] = [
    {
        path: '',
        loadChildren: () =>
            import('../routes/orders.routes').then((m) => m.ordersRoutes),
    },
];
