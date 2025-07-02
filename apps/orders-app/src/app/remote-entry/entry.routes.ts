import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { OrdersListComponent } from '../components/orders-list.component';

export const remoteRoutes: Route[] = [
    { path: '', component: RemoteEntryComponent },
    { path: 'list', component: OrdersListComponent },
];
