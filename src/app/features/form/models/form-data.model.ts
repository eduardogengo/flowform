export interface FormData {
  data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  startedAt: Date;
  finishedAt?: Date
}
