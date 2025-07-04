import { Route } from '@angular/router';

export const ordersRoutes: Route[] = [
    {
        path: '',
        loadComponent: () =>
            import('../order-list/order-list.component').then(
                (m) => m.OrderListComponent
            ),
    },
];