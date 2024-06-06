<script>
	import { onMount } from 'svelte';
	import { session } from '$lib/stores/Session.js';
	onMount(() => {
		return () => ($session = 'default');
	});
</script>

<slot />
