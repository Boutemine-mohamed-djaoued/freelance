<script>
	export let title;
	export let options;
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	function sendData(value) {
		dispatch('receiveData', value);
	}
	let droppedDown = false;
	const dropDown = () => {
		droppedDown = !droppedDown;
	};
</script>

<div class="explore max-md:w-full rounded-md p-[0.5em] max-md:text-left">
	<button
		class="md:hover:text-primary-300"
		on:click={() => {
			dropDown();
		}}
	>
		{title}
		<img class:rotate-180={droppedDown} class="inline-block" src="/home/header/downArrow.svg" alt="" />
	</button>
	<div class:down={droppedDown} class:up={!droppedDown} class="dropdown md:mt-2 md:absolute">
		<div class="md:bg-white max-md:bg-off-white px-5 md:my-5 font-semibold rounded-lg md:shadow-xl">
			{#each options as option}
				<a class="block my-3" on:click={() => dropDown()} on:click={sendData(option.value)} href={option.path}>{option.value}</a>
			{/each}
		</div>
	</div>
	
<style>
	.explore .dropdown {
		display: grid;
		transition: grid-template-rows 0.3s ease;
	}
	.up {
		grid-template-rows: 0fr;
	}
	.explore:has(.down) button {
		@apply text-primary-300;
	}
	a:hover {
		@apply text-primary-300;
	}
	.dropdown > div {
		overflow: hidden;
	}
	@media (width > 787px) {
		.dropdown > div {
			transform: translateX(-1.25rem);
		}
	}
	.down {
		grid-template-rows: 1fr;
	}
</style>
