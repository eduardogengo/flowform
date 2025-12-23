import { DatePipe, JsonPipe } from '@angular/common';

import { Component } from '@angular/core';
import { FormState } from '../../services/form-state';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-success',
  imports: [JsonPipe, ButtonModule, RouterLink, DatePipe],
  templateUrl: './success.html',
  styleUrl: './success.css',
})
export class Success {
  constructor(public formState: FormState) {}
}
