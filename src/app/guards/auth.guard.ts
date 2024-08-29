import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

export const authGuard: CanActivateFn = async () => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getUser();
    if (token) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
};
