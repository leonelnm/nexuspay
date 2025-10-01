<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	let { children } = $props();

	// Track previous path to determine slide direction
	let previousPath = $state('/');
	let direction = $state(1);

	$effect(() => {
		const currentPath = page.url.pathname;

		// Determine slide direction based on navigation
		if (currentPath === '/add' && previousPath === '/') {
			direction = -1; // slide left (content comes from right)
		} else if (currentPath === '/' && previousPath === '/add') {
			direction = 1; // slide right (content comes from left)
		}

		previousPath = currentPath;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="relative min-h-screen w-full overflow-x-hidden">
	{#key page.url.pathname}
		<div
			class="min-h-screen w-full"
			in:fly={{ x: 300 * direction, duration: 100, easing: cubicInOut }}
		>
			{@render children?.()}
		</div>
	{/key}
</div>
