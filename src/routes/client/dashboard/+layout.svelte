<script>
	import { finishJob } from '$lib/stores/dashboard.js';
</script>

<button on:click={() => finishJob.set(false)} class:hidden={!$finishJob} class="shade absolute bg-black bg-opacity-30 w-[100vw] h-[100vh] left-0 z-[999]"></button>
<slot />
