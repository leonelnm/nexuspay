<script lang="ts">
	interface Props {
		size?: 'small' | 'medium' | 'large';
	}

	let { size = 'small' }: Props = $props();

	const sizeClasses = {
		small: 'h-2 w-2',
		medium: 'h-3 w-3',
		large: 'h-5 w-5'
	};

	let classes = sizeClasses[size] || sizeClasses['medium'];
</script>

<div class="my-2 flex animate-pulse space-x-2">
	<div class={classes + ' rounded-full bg-gray-500'}></div>
	<div class={classes + ' rounded-full bg-gray-500'}></div>
	<div class={classes + ' rounded-full bg-gray-500'}></div>
</div>
