<script lang="ts">
	import { goto } from '$app/navigation';
	import type { RecurringPayment, Subscription } from '$lib/types';
	import { formatCurrency, formatDate, formatFrequency } from '$lib/utils/formatUtil';

	// Mock data
	let subscriptions: Subscription[] = [
		{
			id: '1',
			name: 'Netflix',
			description: 'Streaming de entretenimiento',
			amount: 15.99,
			paymentDate: '2025-10-15',
			frequency: 'monthly'
		},
		{
			id: '2',
			name: 'Spotify Premium',
			description: 'Música sin anuncios',
			amount: 9.99,
			paymentDate: '2025-10-20',
			frequency: 'monthly'
		},
		{
			id: '3',
			name: 'Adobe Creative Cloud',
			description: 'Suite de diseño profesional',
			amount: 52.99,
			paymentDate: '2025-11-01',
			frequency: 'monthly'
		}
	];

	let recurringPayments: RecurringPayment[] = [
		{
			id: '1',
			name: 'Préstamo Personal',
			description: 'Cuotas del préstamo bancario',
			amount: 450.0,
			paymentDate: '2025-10-05',
			frequency: 'monthly',
			paymentCount: 36
		},
		{
			id: '2',
			name: 'Seguro del Auto',
			description: 'Prima mensual del seguro',
			amount: 120.0,
			paymentDate: '2025-10-10',
			frequency: 'monthly',
			endDate: '2026-09-10'
		},
		{
			id: '3',
			name: 'Gimnasio',
			description: 'Membresía anual del gimnasio',
			amount: 300.0,
			paymentDate: '2025-12-01',
			frequency: 'yearly',
			paymentCount: 3
		}
	];

	function goToAddPage() {
		goto('/add');
	}
</script>

<div class="min-h-screen bg-gray-50 py-8">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Header with Action Button -->
		<div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h1 class="mb-2 text-3xl font-bold text-gray-900">NexusPay Dashboard</h1>
				<p class="text-gray-600">Gestiona tus suscripciones y pagos recurrentes</p>
			</div>
			<button
				on:click={goToAddPage}
				class="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700 sm:flex-shrink-0"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"
					></path>
				</svg>
				Agregar Nueva Suscripción o Pago
			</button>
		</div>

		<!-- Summary Cards -->
		<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
			<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<div class="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100">
							<svg
								class="h-5 w-5 text-blue-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
								></path>
							</svg>
						</div>
					</div>
					<div class="ml-4">
						<p class="text-sm font-medium text-gray-500">Gasto Mensual Suscripciones</p>
						<p class="text-2xl font-semibold text-gray-900">
							{formatCurrency(
								subscriptions
									.filter((s) => s.frequency === 'monthly')
									.reduce((sum, s) => sum + s.amount, 0)
							)}
						</p>
					</div>
				</div>
			</div>

			<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<div class="flex h-8 w-8 items-center justify-center rounded-md bg-purple-100">
							<svg
								class="h-5 w-5 text-purple-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
								></path>
							</svg>
						</div>
					</div>
					<div class="ml-4">
						<p class="text-sm font-medium text-gray-500">Pagos Recurrentes Mensuales</p>
						<p class="text-2xl font-semibold text-gray-900">
							{formatCurrency(
								recurringPayments
									.filter((p) => p.frequency === 'monthly')
									.reduce((sum, p) => sum + p.amount, 0)
							)}
						</p>
					</div>
				</div>
			</div>

			<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<div class="flex h-8 w-8 items-center justify-center rounded-md bg-green-100">
							<svg
								class="h-5 w-5 text-green-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
								></path>
							</svg>
						</div>
					</div>
					<div class="ml-4">
						<p class="text-sm font-medium text-gray-500">Total Servicios</p>
						<p class="text-2xl font-semibold text-gray-900">
							{subscriptions.length + recurringPayments.length}
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
			<!-- Subscriptions Section -->
			<div class="rounded-lg border border-gray-200 bg-white shadow-sm">
				<div class="border-b border-gray-200 px-6 py-4">
					<h2 class="flex items-center gap-2 text-xl font-semibold text-gray-900">
						<svg
							class="h-6 w-6 text-blue-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
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
					{#each subscriptions as subscription}
						<div class="px-6 py-4 transition-colors duration-150 hover:bg-gray-50">
							<div class="flex items-center justify-between">
								<h3 class="font-medium text-gray-900">{subscription.name}</h3>
								<div class="ml-4 flex items-center">
									<span
										class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
									>
										Activa
									</span>
								</div>
							</div>
							<p class="mt-1 text-sm text-gray-600">{subscription.description}</p>
							<div class="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
								<span class="flex items-center gap-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-4"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
										/>
									</svg>

									{formatCurrency(subscription.amount)}
								</span>
								<span class="flex items-center gap-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-4"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
										/>
									</svg>

									{formatDate(subscription.paymentDate)}
								</span>
								<span class="flex items-center gap-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-4"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
										/>
									</svg>

									{formatFrequency(subscription.frequency)}
								</span>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Recurring Payments Section -->
			<div class="rounded-lg border border-gray-200 bg-white shadow-sm">
				<div class="border-b border-gray-200 px-6 py-4">
					<h2 class="flex items-center gap-2 text-xl font-semibold text-gray-900">
						<svg
							class="h-6 w-6 text-purple-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
							></path>
						</svg>
						Pagos Recurrentes
					</h2>
					<p class="mt-1 text-sm text-gray-500">{recurringPayments.length} pagos programados</p>
				</div>
				<div class="divide-y divide-gray-200">
					{#each recurringPayments as payment}
						<div class="px-6 py-4 transition-colors duration-150 hover:bg-gray-50">
							<div class="flex items-start justify-between">
								<div class="flex-1">
									<h3 class="font-medium text-gray-900">{payment.name}</h3>
									<p class="mt-1 text-sm text-gray-600">{payment.description}</p>
									<div class="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
										<span class="flex items-center gap-1">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="size-4"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
												/>
											</svg>
											{formatCurrency(payment.amount)}
										</span>
										<span class="flex items-center gap-1">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="size-4"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
												/>
											</svg>
											{formatDate(payment.paymentDate)}
										</span>
										<span class="flex items-center gap-1">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="size-4"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
												/>
											</svg>
											{formatFrequency(payment.frequency)}
										</span>
										{#if payment.paymentCount}
											<span class="flex items-center gap-1">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="size-4"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"
													/>
												</svg>

												{payment.paymentCount} cuotas
											</span>
										{/if}
										{#if payment.endDate}
											<span class="flex items-center gap-1">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="size-6"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
													/>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
													/>
												</svg>

												Hasta {formatDate(payment.endDate)}
											</span>
										{/if}
									</div>
								</div>
								<div class="ml-4 flex items-center">
									<span
										class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
									>
										Programado
									</span>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
