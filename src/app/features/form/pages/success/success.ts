import { DatePipe } from '@angular/common';

import { Component } from '@angular/core';
import { FormState } from '../../services/form-state';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { DataViewer } from '../../components/data-viewer/data-viewer';

@Component({
  selector: 'app-success',
  imports: [ButtonModule, RouterLink, DatePipe, DataViewer],
  templateUrl: './success.html',
  styleUrl: './success.css',
})
export class Success {
  constructor(public formState: FormState) {}
}
