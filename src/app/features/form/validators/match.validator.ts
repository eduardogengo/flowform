import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchFields(field1: string, field2: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const control1 = group.get(field1);
    const control2 = group.get(field2);

    if (!control1 || !control2) {
      return null;
    }

    const v1 = control1.value;
    const v2 = control2.value;

    // If either is empty, remove previous mismatch error and let other validators handle emptiness/format
    if (!v1 || !v2) {
      if (control2.hasError('mismatch')) {
        const errors = { ...(control2.errors || {}) } as any;
        delete errors['mismatch'];
        control2.setErrors(Object.keys(errors).length ? errors : null);
      }
      return null;
    }

    if (v1 !== v2) {
      control2.setErrors({ ...(control2.errors || {}), mismatch: true });
      return { fieldsMismatch: true };
    }

    // values match -> ensure mismatch error removed
    if (control2.hasError('mismatch')) {
      const errors = { ...(control2.errors || {}) } as any;
      delete errors['mismatch'];
      control2.setErrors(Object.keys(errors).length ? errors : null);
    }

    return null;
  };
}
