import { FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
    const parent = formGroup.parent as FormGroup;
    if (!parent) return null;
    return parent.get('password').value === parent.get('passwordConfirm').value ?
      null : { 'passwordMismatch': true };
  }