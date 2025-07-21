import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { ordersRoutes } from '../routes/orders.routes';

export const remoteRoutes: Route[] = [
    { path: '', component: RemoteEntryComponent },
];

// Export ordersRoutes for module federation
export { ordersRoutes };
