<script lang="ts">
	import type { RecurringPayment } from '$lib/types';
	import {
		formatCurrency,
		formatDate,
		formatFrequency,
		fromDateToString
	} from '$lib/utils/formatUtil';

	interface Props {
		payment: RecurringPayment;
	}

	let { payment }: Props = $props();

	let nextPayment = $derived.by(() => {
		if (!payment.isActive) {
			return null;
		}

		const now = new Date();

		const todayUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
		let nextDateUTC = new Date(payment.paymentDate);

		let count = 0;
		while (nextDateUTC.getTime() < todayUTC.getTime()) {
			switch (payment.frequency) {
				case 'weekly':
					nextDateUTC.setDate(nextDateUTC.getDate() + 7);
					break;
				case 'monthly':
					nextDateUTC.setMonth(nextDateUTC.getMonth() + 1);
					break;
				case 'yearly':
					nextDateUTC.setFullYear(nextDateUTC.getFullYear() + 1);
					break;
			}
			count++;
			if (
				(payment.paymentCount && count >= payment.paymentCount) ||
				(payment.endDate && nextDateUTC.getTime() > new Date(payment.endDate).getTime())
			) {
				return null;
			}
		}

		if (nextDateUTC.getTime() === new Date(payment.paymentDate).getTime()) {
			return null;
		}

		return nextDateUTC;
	});
</script>

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
							class="size-4"
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
				{#if nextPayment}
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
								d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
							/>
						</svg>
						Próximo pago: {fromDateToString(nextPayment)}
					</span>
				{/if}
			</div>
		</div>
		<div class="ml-4 flex items-center">
			<span
				class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
				class:bg-gray-200={!payment.isActive}
				class:text-gray-800={!payment.isActive}
			>
				{payment.isActive ? 'Programado' : 'Finalizado'}
			</span>
		</div>
	</div>
</div>
