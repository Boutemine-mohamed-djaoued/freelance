<script>
	import Header from '$lib/layout/header/Header.svelte';
	import { showDetails, showFilters } from './../lib/stores/FeedState.js';
	import '../app.css';
</script>

<div class:h-[100vh]={$showDetails === 1 || $showDetails === 2 || $showFilters} class="freelancer relative grid-system overflow-clip">
	<Header></Header>
	<slot />
</div>
