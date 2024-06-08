import { AbstractControl, ValidatorFn } from '@angular/forms';

// Validator for CIN and Passeport
export function cinPasseportValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    const regex = /^[a-zA-Z]{1,2}\d{5,7}$/;
    if (!regex.test(value)) {
      return { 'cinPasseportInvalid': true };
    }

    const letters = value.match(/[a-zA-Z]/g)?.length || 0;
    const numbers = value.match(/\d/g)?.length || 0;

    if ((letters === 1 && numbers >= 5 && numbers <= 7) || (letters === 2 && numbers >= 4 && numbers <= 6)) {
      return null;
    } else {
      return { 'cinPasseportInvalid': true };
    }
  };
}

// Validator for numTel
export function numTelValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const regex = /^[67]\d{8}$/;
    return regex.test(value) ? null : { 'numTelInvalid': true };
  };
}

export function dateNaissanceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = new Date(control.value);
    const today = new Date();
    return value > today ? { 'dateNaissanceInvalid': true } : null;
  };
}
