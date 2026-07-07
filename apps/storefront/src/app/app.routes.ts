import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { loadRemoteModule as loadReactRemoteModule } from '@nx/react/mf';
import { PagesComponent } from './pages/pages.component';
import { CartPipelineComponent } from './pipelines/cart-pipeline/cart-pipeline.component';
import { officerGuard } from './guards/officer.guard';

export const appRoutes: Route[] = [
    {
        // Global layout (header + footer) wraps every MFE.
        path: '',
        component: PagesComponent,
        children: [
            {
                path: 'pages',
                loadChildren: () =>
                    import('./pages/pages.routes').then((c) => c.pagesRoutes)
            },
            {
                path: 'auth',
                loadChildren: () =>
                    loadRemoteModule('auth-app', './Routes').then((m) => m.remoteRoutes),
            },
            {
                path: 'account',
                canActivate: [officerGuard],
                loadChildren: () =>
                    loadRemoteModule('auth-app', './AccountRoutes').then((m) => m.accountRoutes),
            },
            {
                path: 'orders',
                canActivate: [officerGuard],
                loadChildren: () =>
                    loadRemoteModule('orders-app', './Routes').then((m) => m.ordersRoutes),
            },
            {
                // React remote mounted through a custom element bridge.
                path: 'cart',
                component: CartPipelineComponent,
                data: {
                    elementName: 'mfe-cart-page',
                    // cart is a React remote — it lives in the @nx/react/mf registry.
                    loadElement: () => loadReactRemoteModule('cart', './CartPage'),
                },
            },
            {
                path: '',
                redirectTo: 'pages',
                pathMatch: 'full',
            },
        ],
    },
    {
        path: '**',
        redirectTo: 'pages'
    },
];
