<script lang="ts">
	interface Props {
		onAddClick: () => void;
	}

	let { onAddClick }: Props = $props();
</script>

<div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
	<div>
		<h1 class="mb-2 text-3xl font-bold text-gray-900">NexusPay Dashboard</h1>
		<p class="text-gray-600">Gestiona tus suscripciones y pagos recurrentes</p>
	</div>
	<button
		onclick={onAddClick}
		class="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700 sm:flex-shrink-0"
	>
		<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"
			></path>
		</svg>
		Agregar Nueva Suscripción o Pago
	</button>
</div>
