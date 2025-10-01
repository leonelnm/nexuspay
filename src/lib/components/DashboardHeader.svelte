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
		class="me-2 mb-2 flex items-center gap-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-3 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
	>
		<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"
			></path>
		</svg>
		Agregar Nueva Suscripción o Pago
	</button>
</div>
