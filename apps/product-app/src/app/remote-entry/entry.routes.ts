import { Route } from '@angular/router';
import { ProductDetailsComponent } from '../components/product-details.component';
import { RemoteEntryComponent } from './entry.component';

export const remoteRoutes: Route[] = [
    {
        path: '',
        component: RemoteEntryComponent,
    },
    {
        path: ':id',
        component: ProductDetailsComponent,
        children: [
            {
                path: 'edit',
                component: ProductDetailsComponent,
            },
        ],
    },
];
