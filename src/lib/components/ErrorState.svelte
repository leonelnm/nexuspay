<script lang="ts">
	interface Props {
		message: string;
	}

	let { message }: Props = $props();
</script>

<div class="flex min-h-dvh items-center justify-center bg-gray-50">
	<div class="text-center">
		<svg
			class="mx-auto h-16 w-16 text-red-500"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			></path>
		</svg>
		<p class="mt-4 text-lg text-red-600">{message}</p>
		<button
			onclick={() => window.location.reload()}
			class="mt-4 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
		>
			Reintentar
		</button>
	</div>
</div>
