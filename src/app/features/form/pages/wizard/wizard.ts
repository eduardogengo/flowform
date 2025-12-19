import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';

@Component({
  selector: 'app-wizard',
  imports: [StepperModule, ButtonModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './wizard.html',
  styleUrl: './wizard.css',
})
export class Wizard {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  submit() {
    console.log(this.form.value);
    this.router.navigate(['/success']);
  }
}
