import { Component, input } from '@angular/core';
import { FormValues } from '../../models/form-data.model';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-data-viewer',
  imports: [CardModule],
  templateUrl: './data-viewer.html',
  styleUrl: './data-viewer.css',
})
export class DataViewer {
  values = input<FormValues>();
}
