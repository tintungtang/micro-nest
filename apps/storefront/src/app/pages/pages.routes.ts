import { DashboardComponent } from './dashboard/dashboard.component';
import { Route } from '@angular/router';
import { PagesComponent } from './pages.component';
import { SampleComponent } from './sample/sample.component';

export const pagesRoutes: Route[] = [
    {
        path: '', component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'sample', component: SampleComponent },
            {
                path: 'products',
                loadChildren: () =>
                    import('product-app/Routes').then((m) => m.remoteRoutes)
            },
            {
                path: 'orders',
                loadChildren: () =>
                    import('orders/Routes').then((m) => m.remoteRoutes)
            },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ]
    }
];

