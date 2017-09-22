import { AbstractControl, ValidatorFn } from '@angular/forms';

export function MaxLengthValidator(length: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: boolean} | null => {
    if (control.value && control.value.length > length - 1) {
      return {'MaxLength' : true}
    }
    return null;
  }
}

export function MinLengthValidator(length: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: boolean} | null => {
    if (control.value && control.value.length < length) {
      return {'MinLength' : true}
    }
    return null;
  }
}
