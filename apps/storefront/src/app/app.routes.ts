import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
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
        path: '',
        component: NxWelcomeComponent,
    },
];
