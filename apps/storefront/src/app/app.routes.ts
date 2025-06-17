import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';
import { officerGuard } from './guards/officer.guard';
import { CartPipelineComponent } from './pipelines/cart-pipeline/cart-pipeline.component';

export const appRoutes: Route[] = [
    {
        path: 'dashboard',
        canActivate: [officerGuard],
        loadChildren: () =>
            import('./pages/dashboard/dashboard.routes').then(
                (m) => m.dashboardRoutes
            ),
    },
    {
        path: 'product-ui',
        loadChildren: () =>
            import('product-ui/Routes').then((m) => m.remoteRoutes),
    },
    {
        path: 'auth-ui',
        loadChildren: () =>
            import('auth-ui/Routes').then((m) => m.remoteRoutes),
    },
    {
        path: 'cart',
        component: CartPipelineComponent,
        data: {
            elementName: 'cart-react-app',
            loadChildren: () => import('cart/Module'),
        },
    },
    {
        path: '',
        component: NxWelcomeComponent,
    },
];
