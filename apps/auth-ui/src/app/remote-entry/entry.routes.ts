import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { LoginComponent } from '../pages/login/login.component';

export const remoteRoutes: Route[] = [
  { path: '', component: RemoteEntryComponent },
  { path: 'login', component: LoginComponent },
];
