import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
      path: 'pages',
      loadChildren: () =>
          import('./pages/pages.routes').then((c) => c.pagesRoutes)
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('auth-app/Routes').then((m) => m.remoteRoutes),
    },
    {
        path: '',
        redirectTo: 'pages',
        pathMatch: 'full',
    },
    {
        path: '***',
        redirectTo: 'pages'
    },
];
