<script>
	import { showDetails, showFilters } from '$lib/stores/FeedState.js';
</script>

<button on:click={() => showDetails.set(false)} class:hidden={!$showDetails} class="shade absolute bg-black bg-opacity-30 w-[100vw] h-[100vh] left-0 z-[999]"></button>
<div>
	<slot />
</div>
