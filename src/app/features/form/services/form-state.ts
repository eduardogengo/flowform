import { Injectable, signal, computed } from '@angular/core';
import { FormData } from '../models/form-data.model';

@Injectable({
  providedIn: 'root',
})
export class FormState {
  // dados do formulário
  formData = signal<FormData | undefined>(undefined);

  // leitura pública dos dados

  updateData(dataForm: any, step: number) {
    console.log('update data', dataForm, step);

    this.formData.update((current) => {
      const updated: FormData = {
        startedAt: current?.startedAt ?? new Date(),
        data: { ...current?.data, ...dataForm },
      };

      if (step === 3) {
        updated.finishedAt = new Date();
      }

      return updated;
    });
  }

  intializeFormData() {
    this.formData.set({ startedAt: new Date(), data: {} });
  }

  setFormDataUndefined() {
    this.formData.set(undefined);
  }

  // reset opcional (ex: ao finalizar)
  reset() {
    this.formData.set({ startedAt: new Date(), data: {} });
  }
}
