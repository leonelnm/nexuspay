import type { Frequency } from "$lib/types";

export function formatFrequency(frequency: Frequency): string {
  const frequencies = {
    weekly: 'Semanal',
    monthly: 'Mensual',
    yearly: 'Anual'
  };
  return frequencies[frequency as keyof typeof frequencies] || frequency;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('es-ES');
}