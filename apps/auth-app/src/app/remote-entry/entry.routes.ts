import { Route } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';

export const remoteRoutes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
];
