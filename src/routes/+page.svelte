<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { getAll } from '$lib/db/model/subscription';
	import type { NexusPayData } from '$lib/types';
	import { formatCurrency } from '$lib/utils/formatUtil';

	import ErrorState from '$lib/components/ErrorState.svelte';
	import DashboardHeader from '$lib/components/DashboardHeader.svelte';
	import SummaryCard from '$lib/components/SummaryCard.svelte';
	import SubscriptionList from '$lib/components/SubscriptionList.svelte';
	import RecurringPaymentList from '$lib/components/RecurringPaymentList.svelte';

	let data: NexusPayData = $state({ recurringPayments: [], subscriptions: [] });
	let { subscriptions, recurringPayments }: NexusPayData = $derived(data);

	let loading = $state(true);
	let error = $state<string | null>(null);

	// Calcular totales
	const monthlySubscriptions = $derived(
		formatCurrency(
			subscriptions
				.filter((s) => s.isActive && s.frequency === 'monthly')
				.reduce((sum, s) => sum + s.amount, 0)
		)
	);

	const monthlyRecurringPayments = $derived(
		formatCurrency(
			recurringPayments
				.filter((p) => p.isActive && p.frequency === 'monthly')
				.reduce((sum, p) => sum + p.amount, 0)
		)
	);

	const totalServices = $derived((subscriptions.length + recurringPayments.length).toString());

	function goToAddPage() {
		goto('/add');
	}

	onMount(async () => {
		try {
			data = await getAll();
		} catch (err) {
			console.error('Error loading data:', err);
			error = 'Error al cargar los datos. Por favor, recarga la página.';
		} finally {
			loading = false;
		}
	});
</script>

<div class="mb-16 min-h-screen bg-gray-50">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<DashboardHeader onAddClick={goToAddPage} />

		{#if error}
			<ErrorState message={error} />
		{:else}
			<!-- Summary Cards -->
			<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
				<SummaryCard
					title="Gasto Mensual Suscripciones"
					value={monthlySubscriptions}
					icon="money"
					color="blue"
					isLoading={loading}
				/>
				<SummaryCard
					title="Pagos Recurrentes Mensuales"
					value={monthlyRecurringPayments}
					icon="payments"
					color="purple"
					isLoading={loading}
				/>
				<SummaryCard
					title="Total Servicios"
					value={totalServices}
					icon="services"
					color="green"
					isLoading={loading}
				/>
			</div>

			<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
				<SubscriptionList {subscriptions} isLoading={loading} />
				<RecurringPaymentList payments={recurringPayments} isLoading={loading} />
			</div>
		{/if}
	</div>
</div>
