<script lang="ts">
	import { goto } from '$app/navigation';
	import { create } from '$lib/db/model/subscription';
	import type { RecurringPayment } from '$lib/types';
	import { slide } from 'svelte/transition';

	// Types
	interface FormData extends Omit<RecurringPayment, 'id'> {
		type: 'subscription' | 'recurring';
	}

	// Form state
	let formData: FormData = $state({
		type: 'subscription',
		name: '',
		description: '',
		amount: 0,
		paymentDate: '',
		frequency: 'monthly',
		paymentCount: undefined,
		endDate: undefined,
		isActive: true
	});

	let errors: Record<string, string> = $state({});
	let isSubmitting = $state(false);

	function validateForm(): boolean {
		errors = {};

		if (!formData.name.trim()) {
			errors.name = 'El nombre es requerido';
		}

		if (!formData.description.trim() || formData.description.length > 100) {
			errors.description = 'La descripción es requerida y debe tener menos de 100 caracteres';
		}

		if (formData.amount <= 0) {
			errors.amount = 'El monto debe ser mayor a 0';
		}

		if (!formData.paymentDate) {
			errors.paymentDate = 'La fecha de pago es requerida';
		}

		if (formData.type === 'recurring') {
			if (!formData.paymentCount && !formData.endDate) {
				errors.duration = 'Debe especificar la cantidad de pagos o fecha final';
			}
			if (formData.paymentCount && formData.paymentCount <= 0) {
				errors.paymentCount = 'La cantidad de pagos debe ser mayor a 0';
			}
		}

		return Object.keys(errors).length === 0;
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();

		if (!validateForm()) return;

		isSubmitting = true;

		try {
			await create({
				name: formData.name.trim(),
				description: formData.description.trim(),
				amount: formData.amount,
				paymentDate: formData.paymentDate,
				frequency: formData.frequency,
				paymentCount: formData.type === 'recurring' ? formData.paymentCount : undefined,
				endDate: formData.type === 'recurring' ? formData.endDate : undefined
			});

			// Redirect back to dashboard
			goto('/');
		} catch (error) {
			console.error('Error saving:', error);
			// Handle error - show toast or error message
		} finally {
			isSubmitting = false;
		}
	}

	function handleCancel() {
		goto('/');
	}

	function resetFormForType() {
		if (formData.type === 'subscription') {
			formData.paymentCount = undefined;
			formData.endDate = '';
		}
		errors = {};
	}

	$effect(() => {
		if (formData.type) {
			resetFormForType();
		}
	});
</script>

<svelte:head>
	<title>Agregar - NexusPay</title>
</svelte:head>

<div class="mb-16 min-h-dvh bg-gray-50">
	<div class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="mb-8">
			<button
				onclick={handleCancel}
				class="mb-4 flex items-center text-gray-600 transition-colors duration-200 hover:text-gray-900"
			>
				<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"
					></path>
				</svg>
				Volver al Dashboard
			</button>
			<h1 class="text-3xl font-bold text-gray-900">Agregar Nuevo Servicio</h1>
			<p class="mt-2 text-gray-600">Configura una nueva suscripción o pago recurrente</p>
		</div>

		<!-- Form -->
		<div class="rounded-lg border border-gray-200 bg-white shadow-sm">
			<form onsubmit={handleSubmit} class="p-6">
				<!-- Type Selection -->
				<div class="mb-6">
					<fieldset class="mt-4">
						<legend class="mb-2 text-base font-medium text-gray-900">Tipo de Servicio</legend>
						<p class="mb-4 text-sm leading-5 text-gray-500">
							¿Qué tipo de servicio deseas agregar?
						</p>
						<div class="space-y-4">
							<div class="flex items-center">
								<input
									id="subscription"
									name="serviceType"
									type="radio"
									bind:group={formData.type}
									value="subscription"
									class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
								/>
								<label for="subscription" class="ml-3 block text-sm font-medium text-gray-700">
									<span class="block">Suscripción</span>
									<span class="block font-normal text-gray-500"
										>Servicio continuo sin fecha de finalización</span
									>
								</label>
							</div>
							<div class="flex items-center">
								<input
									id="recurring"
									name="serviceType"
									type="radio"
									bind:group={formData.type}
									value="recurring"
									class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
								/>
								<label for="recurring" class="ml-3 block text-sm font-medium text-gray-700">
									<span class="block">Pago Recurrente</span>
									<span class="block font-normal text-gray-500"
										>Pago con cantidad limitada o fecha final</span
									>
								</label>
							</div>
						</div>
					</fieldset>
				</div>

				<!-- Basic Information -->
				<div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
					<div>
						<label for="name" class="mb-2 block text-sm font-medium text-gray-700">
							Nombre del Servicio *
						</label>
						<input
							id="name"
							type="text"
							bind:value={formData.name}
							class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
							placeholder="ej. Netflix, Préstamo Personal"
							class:border-red-500={errors.name}
						/>
						{#if errors.name}
							<p class="mt-1 text-sm text-red-600">{errors.name}</p>
						{/if}
					</div>

					<div>
						<label for="amount" class="mb-2 block text-sm font-medium text-gray-700">
							Monto *
						</label>
						<div class="relative">
							<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<span class="text-gray-500 sm:text-sm">€</span>
							</div>
							<input
								id="amount"
								type="number"
								step="0.01"
								min="0"
								bind:value={formData.amount}
								class="w-full rounded-md border border-gray-300 py-2 pr-3 pl-8 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
								placeholder="0.00"
								class:border-red-500={errors.amount}
							/>
						</div>
						{#if errors.amount}
							<p class="mt-1 text-sm text-red-600">{errors.amount}</p>
						{/if}
					</div>
				</div>

				<div class="mb-6">
					<label for="description" class="mb-2 block text-sm font-medium text-gray-700">
						Descripción *
					</label>
					<textarea
						id="description"
						bind:value={formData.description}
						rows="3"
						class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
						placeholder="Describe el servicio o motivo del pago"
						class:border-red-500={errors.description}
					></textarea>
					{#if errors.description}
						<p class="mt-1 text-sm text-red-600">{errors.description}</p>
					{/if}
				</div>

				<!-- Payment Details -->
				<div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
					<div>
						<label for="paymentDate" class="mb-2 block text-sm font-medium text-gray-700">
							Fecha de Pago *
						</label>
						<input
							id="paymentDate"
							type="date"
							bind:value={formData.paymentDate}
							class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
							class:border-red-500={errors.paymentDate}
						/>
						{#if errors.paymentDate}
							<p class="mt-1 text-sm text-red-600">{errors.paymentDate}</p>
						{/if}
					</div>

					<div>
						<label for="frequency" class="mb-2 block text-sm font-medium text-gray-700">
							Frecuencia de Pago *
						</label>
						<select
							id="frequency"
							bind:value={formData.frequency}
							class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
						>
							<option value="weekly">Semanal</option>
							<option value="monthly">Mensual</option>
							<option value="yearly">Anual</option>
						</select>
					</div>
				</div>

				<!-- Recurring Payment Specific Fields -->
				{#if formData.type === 'recurring'}
					<div class="mb-6 border-t border-gray-200 pt-6" transition:slide>
						<h3 class="mb-4 text-lg font-medium text-gray-900">Configuración de Pago Recurrente</h3>
						<p class="mb-4 text-sm text-gray-600">
							Especifica cuándo debe finalizar este pago recurrente
						</p>

						<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
							<div>
								<label for="paymentCount" class="mb-2 block text-sm font-medium text-gray-700">
									Cantidad de Pagos
								</label>
								<input
									id="paymentCount"
									type="number"
									min="1"
									bind:value={formData.paymentCount}
									class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
									placeholder="ej. 12, 24, 36"
									class:border-red-500={errors.paymentCount}
								/>
								{#if errors.paymentCount}
									<p class="mt-1 text-sm text-red-600">{errors.paymentCount}</p>
								{/if}
							</div>

							<div>
								<label for="endDate" class="mb-2 block text-sm font-medium text-gray-700">
									Fecha Final
								</label>
								<input
									id="endDate"
									type="date"
									bind:value={formData.endDate}
									class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
								/>
							</div>
						</div>

						{#if errors.duration}
							<p class="mt-2 text-sm text-red-600">{errors.duration}</p>
						{/if}

						<div class="mt-4 rounded-md bg-blue-50 p-4">
							<div class="flex">
								<div class="flex-shrink-0">
									<svg class="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
										<path
											fill-rule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
											clip-rule="evenodd"
										></path>
									</svg>
								</div>
								<div class="ml-3">
									<h3 class="text-sm font-medium text-blue-800">Información</h3>
									<div class="mt-2 text-sm text-blue-700">
										<p>
											Puedes especificar la cantidad de pagos o la fecha final, no ambos. Si
											especificas ambos, se usará la cantidad de pagos.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/if}

				<!-- Form Actions -->
				<div class="flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row">
					<button
						type="submit"
						disabled={isSubmitting}
						class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700 disabled:bg-blue-400 sm:flex-none"
					>
						{#if isSubmitting}
							<svg
								class="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							Guardando...
						{:else}
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7"
								></path>
							</svg>
							Guardar
						{/if}
					</button>
					<button
						type="button"
						onclick={handleCancel}
						disabled={isSubmitting}
						class="flex-1 rounded-lg bg-gray-100 px-6 py-3 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200 disabled:bg-gray-50 sm:flex-none"
					>
						Cancelar
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
