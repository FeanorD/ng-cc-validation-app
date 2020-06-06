import { Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Key } from 'protractor';
import { invalid } from '@angular/compiler/src/render3/view/util';

export class CardValidators extends Validators {
    static ccNumberValidator(numbers: object): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {
            let invalidNumber: boolean = true;
            Object.keys(numbers).forEach(function(k) {
                let regex = numbers[k];
                if (!regex.test(control.value)) {
                    invalidNumber = false;
                }
            })
            if (!invalidNumber) {
                invalidNumber = !this.ccNumberChecksum(control.value);
            }
            return invalidNumber ? {'invalidNumber': {value: control.value}} : null;
        };
    }

    static expirationDateValidator(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {
            let invalidDate: boolean = true;

            return invalidDate ? {'ivalidDate': {value: control.value}} : null;
        }
    }

    static cvvValidator(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {
            let checkCvvLength: RegExp = /^\d{3}$/;
            let invalidCvv: boolean = !checkCvvLength.test(control.value);

            return invalidCvv ? {'invalidCvv': {value: control.value}} : null;
        }
    }

    private static ccNumberChecksum(ccNumber: string): boolean {
        let sum: number = 0;
        let shouldDouble: boolean = false;
        let check: boolean = false;

        for (let i = ccNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(ccNumber[i]);

            if (shouldDouble) {
                if ((digit *= 2) > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            shouldDouble = !shouldDouble;
        }
        check = (sum % 10) == 0;

        return check;
    }
}

// export function ccNumberValidator() {
    
// }