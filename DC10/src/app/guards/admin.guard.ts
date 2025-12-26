import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { from, of, switchMap, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  const authService = inject(AuthService);

  return user(auth).pipe(
    switchMap(u => {
      if (!u) return of(router.createUrlTree(['/auth/login']));
      return from(authService.getRole(u.uid)).pipe(
        map(role => (role === 'admin' ? true : router.createUrlTree(['/'])))
      );
    })
  );
};
