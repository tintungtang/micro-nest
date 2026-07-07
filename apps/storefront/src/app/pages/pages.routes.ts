import { DashboardComponent } from './dashboard/dashboard.component';
import { Route } from '@angular/router';
import { SampleComponent } from './sample/sample.component';
import { loadRemoteModule } from '@nx/angular/mf';

export const pagesRoutes: Route[] = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'sample', component: SampleComponent },
    {
        path: 'products',
        loadChildren: () =>
            loadRemoteModule('product-app', './Routes').then((m) => m.remoteRoutes)
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
