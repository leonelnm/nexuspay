export type Frequency = "weekly" | "monthly" | "yearly";

export interface Subscription {
  id: string;
  name: string;
  description: string;
  amount: number;
  paymentDate: string; // ISO string o "YYYY-MM-DD"
  frequency: Frequency;
  isActive: boolean;
}

export interface RecurringPayment extends Subscription {
  paymentCount?: number;
  endDate?: string;
}

export interface NexusPayData {
  subscriptions: Subscription[];
  recurringPayments: RecurringPayment[];
}

export interface NewSubscription {
  name: string;
  description: string;
  amount: number;
  paymentDate: string; // ISO string o "YYYY-MM-DD"
  frequency: Frequency;
  paymentCount?: number;
  endDate?: string;
}