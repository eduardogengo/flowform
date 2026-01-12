export interface FormStateSnapshot  {
  values: FormValues;
  startedAt: Date;
  finishedAt?: Date;
}

export interface FormValues {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}
