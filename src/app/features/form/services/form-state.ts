import { Injectable, signal, computed } from '@angular/core';
import { FormData } from '../models/form-data.model';

@Injectable({
  providedIn: 'root',
})
export class FormState {

  // dados do formulário
  formData = signal<FormData>({ startedAt: new Date(), data: {} });

  // leitura pública dos dados

  updateData(dataForm: any, step: number) {
    console.log('update data', dataForm, step);
    const formData: FormData = {
      ...dataForm,
    };

    console.log('formdata', formData);


    // this.formData.set(formData);
    this.formData.update((current) => ({
      ...current,
      data: { ...current.data, ...dataForm },
      ...(step === 3 ? { finishedAt: new Date() } : {}),
    }));
  }

  // reset opcional (ex: ao finalizar)
  reset() {
    this.formData.set({ startedAt: new Date(), data: {} });
  }
}
