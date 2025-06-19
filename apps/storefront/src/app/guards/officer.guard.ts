import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const officerGuard: CanActivateFn = () => {
  const router = inject(Router);
  const role = localStorage.getItem('userRole');
  // if (role === 'officer') {
  //   return true;
  // }
  // return router.parseUrl('/auth/login');

    return true;
};
