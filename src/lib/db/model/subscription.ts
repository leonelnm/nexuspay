import type { Frequency, NewSubscription, NexusPayData } from "$lib/types";
import { supabase } from "../supabaseClient";

const TABLE_NAME = 'subscription';

interface SubscriptionDB {
  id: string;
  amount: number;
  created_at: string; // ISO string
  description: string;
  end_date?: string; // ISO string
  frequency: Frequency;
  name: string;
  payment_count?: number;
  payment_date: string; // ISO string
  updated_at: string; // ISO string
}

export const create = async (newSub: NewSubscription) => {
  console.log('Creating new subscription in the database...', newSub);

  const { error } = await supabase
    .from(TABLE_NAME)
    .insert({
      name: newSub.name,
      description: newSub.description,
      amount: newSub.amount,
      payment_date: newSub.paymentDate,
      frequency: newSub.frequency,
      payment_count: newSub.paymentCount || null,
      end_date: newSub.endDate || null
    })

  if (error) {
    console.error('Error creating subscription:', error.message);
    throw new Error(error.message);
  }
}


export const getAll = async (): Promise<NexusPayData> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select<'subscription', SubscriptionDB>()
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching subscriptions:', error.message);
    return { subscriptions: [], recurringPayments: [] };
  }

  return toNexusPayData(data || []);
}

function toNexusPayData(subscriptionsDB: SubscriptionDB[]): NexusPayData {
  const subscriptions = [];
  const recurringPayments = [];

  // Mapear y separar en una sola iteración
  for (const sub of subscriptionsDB) {
    const baseData = {
      id: sub.id,
      name: sub.name,
      description: sub.description,
      amount: sub.amount,
      paymentDate: sub.payment_date,
      frequency: sub.frequency,
      isActive: true // Asumimos que todas las suscripciones están activas
    };

    if (sub.payment_count || sub.end_date) {
      recurringPayments.push({
        ...baseData,
        paymentCount: sub.payment_count,
        endDate: sub.end_date,
        isActive: isActiveRecurringPayment(sub)
      });
    } else {
      subscriptions.push(baseData);
    }
  }

  return { subscriptions, recurringPayments };
}

function isActiveRecurringPayment(payment: SubscriptionDB): boolean {

  const now = new Date();

  if (payment.end_date && now > new Date(payment.end_date)) {
    return false;
  }

  // si no tiene endDate, calcular el numero de pagos desde la fecha de primer pago hasta hoy
  if (!payment.end_date && payment.payment_count && payment.payment_date) {
    const firstPaymentDate = new Date(payment.payment_date);
    let count = 0;
    const tempDate = new Date(firstPaymentDate);
    while (tempDate <= now) {
      if (payment.frequency === 'monthly') {
        tempDate.setMonth(tempDate.getMonth() + 1);
      } else if (payment.frequency === 'yearly') {
        tempDate.setFullYear(tempDate.getFullYear() + 1);
      } else if (payment.frequency === 'weekly') {
        tempDate.setDate(tempDate.getDate() + 7);
      }

      if (count >= payment.payment_count) {
        return false;
      }

      count++;
    }
  }

  return true;
}