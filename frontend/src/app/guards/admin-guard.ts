import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../servicios/auth';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.obtenerToken() && auth.esAdmin()) {
    return true;
  }

  router.navigateByUrl('/publicaciones');
  return false;
};
