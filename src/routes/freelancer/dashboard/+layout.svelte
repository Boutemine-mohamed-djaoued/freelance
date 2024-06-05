<script>
	import { finishJob, review , report} from '$lib/stores/dashboard.js';
	const handleClick = () => {
		finishJob.set(false);
		review.set(false);
		report.set(false);
	};
</script>

<button on:click={() => handleClick()} class:hidden={!$finishJob && !$review && !$report} class="shade absolute bg-black bg-opacity-30 w-[100vw] h-[120vh] top-0 left-0 z-[999]"></button>
<slot />
