export type Frequency = "weekly" | "monthly" | "yearly";

export interface Subscription {
  id: string;
  name: string;
  description: string;
  amount: number;
  paymentDate: string; // ISO string o "YYYY-MM-DD"
  frequency: Frequency;
}

export interface RecurringPayment extends Subscription {
  paymentCount?: number;
  endDate?: string;
}