<script>
	import { showDetails, showFilters } from '$lib/stores/FeedState.js';
</script>

<button on:click={() => showDetails.set(0)} class:hidden={$showDetails === 0} class="shade absolute bg-black bg-opacity-20 w-[100vw] h-[100vh] left-0 z-[99999]"></button>
<div>
	<slot />
</div>
