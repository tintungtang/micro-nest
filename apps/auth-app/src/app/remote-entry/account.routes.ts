import { Route } from '@angular/router';

export const accountRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('../pages/profile/profile.component').then((m) => m.ProfileComponent),
  },
];
