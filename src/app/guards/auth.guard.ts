import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.waitForInitialization().then(() => {
    if (authService.isLoggedIn) {
      return true;
    }

    router.navigate(['/']);
    return false;
  });
};

export const loginGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.waitForInitialization().then(() => {
    if (!authService.isLoggedIn) {
      return true;
    }

    router.navigate(['/library-grid']);
    return false;
  });
};

export const libraryGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.waitForInitialization().then(() => {
    if (!authService.isLoggedIn) {
      router.navigate(['/']);
      return false;
    }

    if (authService.hasAccess('library')) {
      return true;
    }

    router.navigate(['/']);
    return false;
  });
};

export const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.waitForInitialization().then(() => {
    if (!authService.isLoggedIn) {
      router.navigate(['/']);
      return false;
    }

    if (authService.isAdmin()) {
      return true;
    }

    router.navigate(['/library-grid']);
    return false;
  });
};