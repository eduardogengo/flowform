import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

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
  ],
  templateUrl: './wizard.html',
  styleUrl: './wizard.css',
})
export class Wizard {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  isFormValid(step?: number): boolean {
    if (!step) {
      return this.form.valid;
    } else {
      const isStepValid = this.isStepValid(step);
      console.log('isStepValid', isStepValid);
      return isStepValid;
    }
  }

  private isStepValid(step: number): boolean {
    console.log('step', step);
    switch (step) {
      case 1:
        return !!(this.form.get('firstName')?.valid && this.form.get('lastName')?.valid);
      case 2:
        return !!(this.form.get('email')?.valid && this.form.get('phone')?.valid);
      default:
        return false;
    }
  }

  isFieldInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control.touched;
  }

  submit() {
    console.log(this.form.value);
    this.router.navigate(['/success']);
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
        this.form.get('phone')?.markAsTouched();
        break;
    }
  }
}
