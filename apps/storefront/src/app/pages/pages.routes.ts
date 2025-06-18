import { DashboardComponent } from './dashboard/dashboard.component';
import { Route } from '@angular/router';
import { PagesComponent } from './pages.component';

export const pagesRoutes: Route[] = [
    {
        path: '', component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'dashboard/:id', component: DashboardComponent },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ]
    }
];
