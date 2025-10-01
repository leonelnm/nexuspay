<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { supabase } from '$lib/db/supabaseClient';
	import { logout } from '$lib/db/auth';
	import { authSession } from '$lib/db/authState.svelte';
	import { goto } from '$app/navigation';

	let { children } = $props();

	// Track previous path to determine slide direction
	let previousPath = $state('/');
	let direction = $state(1);
	let loggingOut = $state(false);

	supabase.auth.getSession().then(({ data }) => {
		authSession.session = data.session;
	});

	supabase.auth.onAuthStateChange((_event, newSession) => {
		authSession.session = newSession;
	});

	if (!authSession.session && page.url.pathname !== '/login') {
		goto('/login');
	} else if (authSession.session && page.url.pathname === '/login') {
		goto('/');
	}

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

	const handleLogout = async () => {
		loggingOut = true;
		const { error } = await logout();
		if (error) {
			console.error('Error al cerrar sesión:', error);
		} else {
			authSession.session = null;
			goto('/login');
		}
		loggingOut = false;
	};

	console.log('layout');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="relative min-h-screen w-full overflow-x-hidden bg-gray-50">
	{#key page.url.pathname}
		<div
			class="min-h-screen w-full"
			in:fly={{ x: 300 * direction, duration: 100, easing: cubicInOut }}
		>
			<!-- Logout Button - Only show when authenticated and not on login page -->
			{#if authSession.session && page.url.pathname !== '/login'}
				<div class="mx-auto flex max-w-7xl justify-end px-4 py-4 sm:px-6 lg:px-8">
					<button
						onclick={handleLogout}
						disabled={loggingOut}
						class="me-2 mb-2 flex gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 focus:outline-none"
						title="Cerrar sesión"
					>
						{#if loggingOut}
							<svg class="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
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
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="h-5 w-5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
								/>
							</svg>
						{/if}
						<span class="inline">Cerrar sesión</span>
					</button>
				</div>
			{/if}
			{@render children?.()}
		</div>
	{/key}
</div>
