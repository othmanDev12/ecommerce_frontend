import {AbstractControl, ValidatorFn} from '@angular/forms';

export function passwordValidator(regExp: RegExp): ValidatorFn {

    return (control: AbstractControl): {[key: string]: any} | null  => {
        const value = control.value;
        if (value === '') {
            return null;
        }
        return !regExp.test(value) ? {invalidPattern: {regExp} } : null;
    };

}
