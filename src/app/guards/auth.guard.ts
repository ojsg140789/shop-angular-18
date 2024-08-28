import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

export const authGuard: CanActivateFn = async () => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = await new Promise<boolean>((resolve) => {
    const user = authService.getUser();
    console.log('user', user);
    if (user !== null) {
      resolve(true);
    }
    resolve(false);
  });

  if (isLoggedIn) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
