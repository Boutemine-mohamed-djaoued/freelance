<script>
	import { fly } from 'svelte/transition';
</script>

<div class="full-width" transition:fly={{ y: 100, duration: 300 }}>
	<slot />
</div>
