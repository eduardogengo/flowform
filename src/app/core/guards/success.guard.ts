import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FormState } from '../../features/form/services/form-state';

export const successGuard: CanActivateFn = () => {
  const formState = inject(FormState);
  const router = inject(Router);

  console.log('verificando se form foi enviado', formState.submitted());
  if (formState.submitted()) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
