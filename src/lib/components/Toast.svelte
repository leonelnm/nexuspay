<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	interface Props {
		message: string;
		type?: 'info' | 'error' | 'success' | 'warning';
		onClose?: () => void;
	}

	let { message, type = 'info', onClose }: Props = $props();

	const typeConfig = {
		info: {
			bg: 'bg-blue-50',
			text: 'text-blue-800',
			icon: 'text-blue-400',
			button: 'bg-blue-50 text-blue-500 hover:bg-blue-200 focus:ring-blue-400'
		},
		error: {
			bg: 'bg-red-50',
			text: 'text-red-800',
			icon: 'text-red-400',
			button: 'bg-red-50 text-red-500 hover:bg-red-200 focus:ring-red-400'
		},
		success: {
			bg: 'bg-green-50',
			text: 'text-green-800',
			icon: 'text-green-400',
			button: 'bg-green-50 text-green-500 hover:bg-green-200 focus:ring-green-400'
		},
		warning: {
			bg: 'bg-yellow-50',
			text: 'text-yellow-800',
			icon: 'text-yellow-400',
			button: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-200 focus:ring-yellow-400'
		}
	};

	const config = typeConfig[type];
</script>

<div class="fixed top-4 right-0 z-50 w-full max-w-md p-4 sm:right-24">
	<div
		class="flex items-center rounded-lg p-4 {config.bg} {config.text}"
		role="alert"
		transition:fly={{ y: -20, duration: 300 }}
	>
		<svg
			class="h-4 w-4 shrink-0 {config.icon}"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			viewBox="0 0 20 20"
		>
			<path
				d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
			/>
		</svg>
		<span class="sr-only">{type}</span>
		<div class="ms-3 text-sm font-medium">
			{message}
		</div>
		{#if onClose}
			<button
				type="button"
				class="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg p-1.5 focus:ring-2 {config.button} focus:outline-none"
				onclick={onClose}
				aria-label="Close"
			>
				<span class="sr-only">Cerrar</span>
				<svg
					class="h-3 w-3"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 14"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
					/>
				</svg>
			</button>
		{/if}
	</div>
</div>
