<script>
	import Info from './sections/Info.svelte';
	import { fly } from 'svelte/transition';
</script>

<main class="grid-system" transition:fly={{ duratoin: 300, y: 100 }}>
	<Info></Info>
</main>
