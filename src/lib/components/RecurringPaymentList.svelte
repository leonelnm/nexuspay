<script lang="ts">
	import type { RecurringPayment } from '$lib/types';
	import LoadingDots from './LoadingDots.svelte';
	import RecurringPaymentCard from './RecurringPaymentCard.svelte';

	interface Props {
		payments: RecurringPayment[];
		isLoading?: boolean;
	}

	let { payments, isLoading = true }: Props = $props();
</script>

<div class="rounded-lg border border-gray-200 bg-white shadow-sm">
	<div class="border-b border-gray-200 px-6 py-4">
		<h2 class="flex items-center gap-2 text-xl font-semibold text-gray-900">
			<svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
				></path>
			</svg>
			Pagos Recurrentes
		</h2>
		<p class="mt-1 text-sm text-gray-500">{payments.length} pagos programados</p>
	</div>
	<div class="divide-y divide-gray-200">
		{#if isLoading}
			<div class="flex justify-center p-6 text-center">
				<LoadingDots size="medium" />
			</div>
		{:else if payments.length === 0}
			<div class="px-6 py-8 text-center text-gray-500">No hay pagos recurrentes</div>
		{/if}
		{#each payments as payment (payment.id)}
			<RecurringPaymentCard {payment} />
		{/each}
	</div>
</div>
