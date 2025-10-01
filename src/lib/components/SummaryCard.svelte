<script lang="ts">
	import LoadingDots from './LoadingDots.svelte';

	interface Props {
		title: string;
		value: string;
		icon: 'money' | 'payments' | 'services';
		color: 'blue' | 'purple' | 'green';
		isLoading: boolean;
	}

	let { title, value, icon, color, isLoading = true }: Props = $props();

	const colorClasses = {
		blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
		purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
		green: { bg: 'bg-green-100', text: 'text-green-600' }
	};

	const iconPaths = {
		money:
			'M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z',
		payments:
			'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
		services:
			'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
	};
</script>

<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
	<div class="flex items-center">
		<div class="flex-shrink-0">
			<div class="flex h-8 w-8 items-center justify-center rounded-md {colorClasses[color].bg}">
				<svg
					class="h-5 w-5 {colorClasses[color].text}"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={iconPaths[icon]}
					></path>
				</svg>
			</div>
		</div>
		<div class="ml-4">
			<p class="text-sm font-medium text-gray-500">{title}</p>
			<p class="text-2xl font-semibold text-gray-900">
				{#if isLoading}
					<LoadingDots />
				{:else}
					{value}
				{/if}
			</p>
		</div>
	</div>
</div>
