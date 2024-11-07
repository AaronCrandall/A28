import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const token = localStorage.getItem('jwt');
  const router = inject(Router);

  if (token) {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
};
