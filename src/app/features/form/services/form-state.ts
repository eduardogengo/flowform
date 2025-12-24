import { Injectable, signal } from '@angular/core';
import { FormData } from '../models/form-data.model';

@Injectable({
  providedIn: 'root',
})
export class FormState {
  private _formData = signal<FormData | undefined>(undefined);
  private _submitted = signal(false);

  readonly submitted = this._submitted.asReadonly();
  readonly formData = this._formData.asReadonly();

  updateData(dataForm: FormData, isCompleted: boolean) {
    const finishedAt = isCompleted ? new Date() : undefined;
    this._formData.update((current) => {
      const updated: FormData = {
        startedAt: current?.startedAt ?? new Date(),
        finishedAt,
        data: { ...current?.data, ...dataForm },
      };
      
      return updated;
    });
    if (!!finishedAt) {
      this.markAsSubmitted();
    }
  }

  markAsSubmitted() {
    this._submitted.set(true);
  }

  isFormFinished() {
    return !!this.formData()?.finishedAt;
  }

  initializeFormData() {
    this._formData.set({ startedAt: new Date(), data: {} });
    this._submitted.set(false);
  }

  setFormDataUndefined() {
    this._formData.set(undefined);
    this._submitted.set(false);
  }
}
