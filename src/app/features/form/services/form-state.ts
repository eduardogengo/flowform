import { Injectable, signal } from '@angular/core';
import { FormStateSnapshot } from '../models/form-data.model';

@Injectable({
  providedIn: 'root',
})
export class FormState {
  private _formStateSnapshot = signal<FormStateSnapshot | undefined>(undefined);
  private _submitted = signal(false);

  readonly submitted = this._submitted.asReadonly();
  readonly formStateSnapshot = this._formStateSnapshot.asReadonly();

  updateData(dataForm: FormStateSnapshot, isCompleted: boolean) {
    const finishedAt = isCompleted ? new Date() : undefined;
    this._formStateSnapshot.update((current) => {
      const updated: FormStateSnapshot = {
        startedAt: current?.startedAt ?? new Date(),
        finishedAt,
        values: { ...current?.values, ...dataForm },
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
    return !!this.formStateSnapshot()?.finishedAt;
  }

  initializeFormData() {
    this._formStateSnapshot.set({ startedAt: new Date(), values: {} });
    this._submitted.set(false);
  }

  setFormDataUndefined() {
    this._formStateSnapshot.set(undefined);
    this._submitted.set(false);
  }
}
