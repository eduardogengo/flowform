import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-field-error-validation',
  imports: [MessageModule],
  templateUrl: './field-error-validation.html',
  styleUrl: './field-error-validation.css',
})
export class FieldErrorValidation {
  @Input({ required: true }) control!: AbstractControl | null;
}
