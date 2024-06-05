<script>
	let pages = 5;
	let activePage = 0;
	let progressCount = 0;
	let showenPages = new Array(5).fill(1).map((_, i) => i + 1);
	import {filters} from '$lib/stores/filters.js';
	const changeState = (direction) => {
		if (direction === 1) {
			return activePage < 2 || progressCount >= pages - 5;
		} else if (direction === -1) {
			return activePage > 2 || progressCount <= 0;
		}
	};
	const navigateGigs = (direction) => {
		$filters.query = $filters.query;
		if (changeState(direction)) {
			activePage += direction;
		} else {
			if (direction === -1) {
				if (activePage === 2) {
					progressCount -= 1;
				}
				progressCount += direction;
			}
			for (let i = 0; i < showenPages.length; i++) {
				showenPages[i] = progressCount + i + activePage;
			}
			if (direction === 1) {
				progressCount += direction;
			}
		}
		console.log('direction', direction);
		console.log('activePage', activePage);
		console.log('progressCount', progressCount);
	};
</script>

<div class="mt-5 mb-10 mx-auto w-fit flex gap-2 md:gap-3">
	<div class:hidden={activePage === 0}>
		<button on:click={() => navigateGigs(-1)}>
			<img class="mx-auto max-md:w-3" src="/general/back.svg" alt="" />
		</button>
	</div>
	{#each showenPages as current, i}
		<div class:hidden={i + 1 > pages}>
			<button class:active={activePage === i}>{current}</button>
		</div>
	{/each}
	<div class:hidden={activePage === 4}>
		<button on:click={() => navigateGigs(1)}>
			<img class="mx-auto max-md:w-3 rotate-180" src="/general/back.svg" alt="" />
		</button>
	</div>
</div>

<style>
	button {
		@apply grid items-center aspect-square w-8 md:w-12 ring-1 ring-gray-300 rounded-md;
	}
	.active {
		@apply bg-primary-400 text-white font-semibold;
	}
</style>
