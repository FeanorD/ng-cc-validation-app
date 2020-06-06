import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { CardValidators } from '../validators/validators';
import { acceptedCreditCards } from '../cc-issuers';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  validationForm;
  issuerType: string;
  isBackHidden: boolean;
  isNextHidden: boolean;
  isNextDisabled: boolean;
  isKeyboardAvailable: boolean;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      number: ['', [
        Validators.required,
        CardValidators.ccNumberValidator(acceptedCreditCards),
      ]],
      expirationDate: ['', [
        Validators.required,
        // CardValidators.expirationDateValidator(),
      ]],
      cvv: ['', [
        Validators.required,
        CardValidators.cvvValidator(),
      ]],
    });

    this.isBackHidden = true;
    this.isNextHidden = false;
    this.isNextDisabled = true;
  }

  onCCNumberInput(): void {
    console.log(this.validationForm.get('number').valid);
    if (acceptedCreditCards.mastercard.test(this.validationForm.get('number').value)) {
      this.issuerType = 'mastercard';
    } else if (acceptedCreditCards.visa.test(this.validationForm.get('number').value)) {
      this.issuerType = 'visa';
    } else {
      this.issuerType = '';
    }
    this.isNextDisabled = !(this.validationForm.get('number').valid && this.validationForm.get('expirationDate').valid);
  }

  onExpDateInput(): void {
    this.isNextDisabled = !(this.validationForm.get('number').valid && this.validationForm.get('expirationDate').valid);
  }
  
  onNextClick(): void {
    this.isBackHidden = false;
    this.isNextHidden = true;
  }

  onBackClick(): void {
    this.isBackHidden = true;
    this.isNextHidden = false;
  }

  onCvvFocus(): void {
    this.isKeyboardAvailable = true;
  }

  onCvvBlur(): void {
    this.isKeyboardAvailable = false;
  }

}
