<script lang="ts">
	import { goto } from '$app/navigation';
	import { login, signup } from '$lib/db/auth';

	type Tab = 'login' | 'signup';

	let activeTab = $state<Tab>('login');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let fullName = $state('');
	let errorMsg = $state('');
	let successMsg = $state('');
	let loading = $state(false);

	const handleLogin = async (event: Event) => {
		event.preventDefault();
		errorMsg = '';
		successMsg = '';
		loading = true;

		try {
			const { error } = await login(email, password);

			if (error) {
				errorMsg = error.message;
			} else {
				successMsg = 'Inicio de sesión exitoso';
				setTimeout(() => goto('/'), 500);
			}
		} catch (err) {
			errorMsg = 'Error inesperado al iniciar sesión';
		} finally {
			loading = false;
		}
	};

	const handleSignup = async (event: Event) => {
		event.preventDefault();
		errorMsg = '';
		successMsg = '';

		if (password !== confirmPassword) {
			errorMsg = 'Las contraseñas no coinciden';
			return;
		}

		if (password.length < 6) {
			errorMsg = 'La contraseña debe tener al menos 6 caracteres';
			return;
		}

		loading = true;

		try {
			const { error } = await signup(email, password, fullName);

			if (error) {
				errorMsg = error.message;
			} else {
				successMsg = 'Cuenta creada exitosamente. Revisa tu email para confirmar.';
				// Limpiar formulario
				email = '';
				password = '';
				confirmPassword = '';
				fullName = '';
			}
		} catch (err) {
			errorMsg = 'Error inesperado al crear la cuenta';
		} finally {
			loading = false;
		}
	};

	const switchTab = (tab: Tab) => {
		activeTab = tab;
		errorMsg = '';
		successMsg = '';
	};
</script>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-12"
>
	<div class="w-full max-w-md">
		<!-- Logo/Título -->
		<div class="mb-8 text-center">
			<h1 class="mb-2 text-4xl font-bold text-gray-900">NexusPay</h1>
			<p class="text-gray-600">Gestiona tus suscripciones y pagos recurrentes</p>
		</div>

		<!-- Card Principal -->
		<div class="overflow-hidden rounded-2xl bg-white shadow-xl">
			<!-- Tabs -->
			<div class="grid grid-cols-2 border-b border-gray-200">
				<button
					onclick={() => switchTab('login')}
					class="relative px-6 py-4 text-center font-medium transition-all duration-200 {activeTab ===
					'login'
						? 'text-blue-600'
						: 'text-gray-500 hover:text-gray-700'}"
				>
					Iniciar Sesión
					{#if activeTab === 'login'}
						<div class="absolute right-0 bottom-0 left-0 h-0.5 bg-blue-600"></div>
					{/if}
				</button>
				<button
					onclick={() => switchTab('signup')}
					class="relative px-6 py-4 text-center font-medium transition-all duration-200 {activeTab ===
					'signup'
						? 'text-blue-600'
						: 'text-gray-500 hover:text-gray-700'}"
				>
					Crear Cuenta
					{#if activeTab === 'signup'}
						<div class="absolute right-0 bottom-0 left-0 h-0.5 bg-blue-600"></div>
					{/if}
				</button>
			</div>

			<!-- Contenido -->
			<div class="p-8">
				<!-- Mensajes -->
				{#if errorMsg}
					<div
						class="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
					>
						<svg class="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
								clip-rule="evenodd"
							></path>
						</svg>
						{errorMsg}
					</div>
				{/if}

				{#if successMsg}
					<div
						class="mb-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800"
					>
						<svg class="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clip-rule="evenodd"
							></path>
						</svg>
						{successMsg}
					</div>
				{/if}

				<!-- Formulario Login -->
				{#if activeTab === 'login'}
					<form onsubmit={handleLogin} class="space-y-5">
						<div>
							<label for="login-email" class="mb-2 block text-sm font-medium text-gray-700">
								Correo Electrónico
							</label>
							<input
								id="login-email"
								type="email"
								bind:value={email}
								placeholder="tu@email.com"
								required
								class="focus:ring-opacity-50 w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
						</div>

						<div>
							<label for="login-password" class="mb-2 block text-sm font-medium text-gray-700">
								Contraseña
							</label>
							<input
								id="login-password"
								type="password"
								bind:value={password}
								placeholder="••••••••"
								required
								class="focus:ring-opacity-50 w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							class="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
						>
							{#if loading}
								<span class="flex items-center justify-center gap-2">
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
									Iniciando sesión...
								</span>
							{:else}
								Iniciar Sesión
							{/if}
						</button>
					</form>
				{/if}

				<!-- Formulario Signup -->
				{#if activeTab === 'signup'}
					<form onsubmit={handleSignup} class="space-y-5">
						<div>
							<label for="signup-name" class="mb-2 block text-sm font-medium text-gray-700">
								Nombre Completo
							</label>
							<input
								id="signup-name"
								type="text"
								bind:value={fullName}
								placeholder="Juan Pérez"
								required
								class="focus:ring-opacity-50 w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
						</div>

						<div>
							<label for="signup-email" class="mb-2 block text-sm font-medium text-gray-700">
								Correo Electrónico
							</label>
							<input
								id="signup-email"
								type="email"
								bind:value={email}
								placeholder="tu@email.com"
								required
								class="focus:ring-opacity-50 w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
						</div>

						<div>
							<label for="signup-password" class="mb-2 block text-sm font-medium text-gray-700">
								Contraseña
							</label>
							<input
								id="signup-password"
								type="password"
								bind:value={password}
								placeholder="••••••••"
								required
								minlength="6"
								class="focus:ring-opacity-50 w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
							<p class="mt-1 text-xs text-gray-500">Mínimo 6 caracteres</p>
						</div>

						<div>
							<label
								for="signup-confirm-password"
								class="mb-2 block text-sm font-medium text-gray-700"
							>
								Confirmar Contraseña
							</label>
							<input
								id="signup-confirm-password"
								type="password"
								bind:value={confirmPassword}
								placeholder="••••••••"
								required
								class="focus:ring-opacity-50 w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							class="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
						>
							{#if loading}
								<span class="flex items-center justify-center gap-2">
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
									Creando cuenta...
								</span>
							{:else}
								Crear Cuenta
							{/if}
						</button>
					</form>
				{/if}
			</div>
		</div>

		<!-- Footer -->
		<div class="mt-6 text-center text-sm text-gray-600">
			<p>Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad</p>
		</div>
	</div>
</div>
