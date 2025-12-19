import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormState } from '../../services/form-state';

@Component({
  selector: 'app-success',
  imports: [JsonPipe],
  templateUrl: './success.html',
  styleUrl: './success.css',
})
export class Success {
  constructor(public formState: FormState) {}
}
