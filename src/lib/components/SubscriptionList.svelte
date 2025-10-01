<script lang="ts">
	import type { Subscription } from '$lib/types';
	import LoadingDots from './LoadingDots.svelte';
	import SubscriptionCard from './SubscriptionCard.svelte';

	interface Props {
		subscriptions: Subscription[];
		isLoading?: boolean;
	}

	let { subscriptions, isLoading = true }: Props = $props();
</script>

<div class="rounded-lg border border-gray-200 bg-white shadow-sm">
	<div class="border-b border-gray-200 px-6 py-4">
		<h2 class="flex items-center gap-2 text-xl font-semibold text-gray-900">
			<svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
				></path>
			</svg>
			Suscripciones
		</h2>
		<p class="mt-1 text-sm text-gray-500">{subscriptions.length} suscripciones activas</p>
	</div>
	<div class="divide-y divide-gray-200">
		{#if isLoading}
			<div class="flex justify-center p-6 text-center">
				<LoadingDots size="medium" />
			</div>
		{:else if subscriptions.length === 0}
			<div class="px-6 py-8 text-center text-gray-500">No hay suscripciones activas</div>
		{/if}
		{#each subscriptions as subscription (subscription.id)}
			<SubscriptionCard {subscription} />
		{/each}
	</div>
</div>
