import { JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { StepperModule } from 'primeng/stepper';
import { InputMaskModule } from 'primeng/inputmask';
import { CardModule } from 'primeng/card';

import { FormState } from '../../services/form-state';
import { FieldErrorValidation } from '../../components/field-error-validation/field-error-validation';
import { matchFields } from '../../validators/match.validator';

@Component({
  selector: 'app-wizard',
  imports: [
    StepperModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    IftaLabelModule,
    ReactiveFormsModule,
    JsonPipe,
    MessageModule,
    FieldErrorValidation,
    InputMaskModule,
    CardModule
  ],
  templateUrl: './wizard.html',
  styleUrl: './wizard.css',
})
export class Wizard implements OnInit, OnDestroy {
  form: FormGroup;
  formStepsQuantity = 3;

  constructor(private fb: FormBuilder, private router: Router, public formState: FormState) {
    this.form = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        emailConfirmation: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
      },
      {
        validators: [matchFields('email', 'emailConfirmation')],
      }
    );
  }

  ngOnInit(): void {
    this.formState.intializeFormData();
  }

  ngOnDestroy(): void {
    if (!this.isFormFinished) {
      this.formState.setFormDataUndefined();
    }
  }

  isFormValid(step?: number): boolean {
    if (!step) {
      return this.form.valid;
    } else {
      const isStepValid = this.isStepValid(step);
      if (isStepValid) {
        this.updateFormState(step);
      }
      return isStepValid;
    }
  }

  isStepValid(step: number): boolean {
    switch (step) {
      case 1:
        return !!(this.form.get('firstName')?.valid && this.form.get('lastName')?.valid);
      case 2:
        return !!(
          this.form.get('email')?.valid &&
          this.form.get('emailConfirmation')?.valid &&
          this.form.get('phone')?.valid
        );
      default:
        return false;
    }
  }

  isFieldInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control.touched;
  }

  updateFormState(step: number) {
    this.formState.updateData(this.form.value, step);
  }

  isFormFinished = false;
  submit() {
    if (this.isFormValid()) {
      this.formState.updateData(this.form.value, this.formStepsQuantity);
      this.isFormFinished = true;
      this.router.navigate(['/success']);
    }
  }

  onNext(activateCallback: (step: number) => void, from: number, to: number) {
    if (this.isFormValid(from)) {
      activateCallback(to);
    } else {
      this.markStepTouched(from);
    }
  }

  onBack(activateCallback: (step: number) => void, to: number) {
    activateCallback(to);
  }

  private markStepTouched(step: number) {
    switch (step) {
      case 1:
        this.form.get('firstName')?.markAsTouched();
        this.form.get('lastName')?.markAsTouched();
        break;
      case 2:
        this.form.get('email')?.markAsTouched();
        this.form.get('emailConfirmation')?.markAsTouched();
        this.form.get('phone')?.markAsTouched();
        break;
    }
  }

  changeStep(step: number): void {
    // Se tentar ir para step 2, valida step 1
    if (step === 2 && !this.isStepValid(1)) {
      this.markStepTouched(1);
      return;
    }
    // Se tentar ir para step 3, valida steps 1 e 2
    if (step === 3 && (!this.isStepValid(1) || !this.isStepValid(2))) {
      if (!this.isStepValid(1)) this.markStepTouched(1);
      if (!this.isStepValid(2)) this.markStepTouched(2);
      return;
    }
  }
}
