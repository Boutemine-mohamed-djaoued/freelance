<script>
	export let options;
	export let defaultValue;

	import { createEventDispatcher } from 'svelte';

	let droppedDown = false;
	let choosenOptionValue = defaultValue;
	const dispatch = createEventDispatcher();

	function sendData(value) {
		dispatch('receiveData', value);
	}
	const dropDown = () => {
		droppedDown = !droppedDown;
	};
	const chooseOption = (value) => {
		choosenOptionValue = value;
		dropDown();
	};
</script>

<div class="explore w-full rounded-md max-md:text-left relative">
	<button
		class="md:hover:border-primary-300 border-2 rounded-md border-gray-300 px-5 py-3 w-full flex items-center justify-between bg-blue-white"
		on:click={() => {
			dropDown();
		}}
	>
		{choosenOptionValue}
		<img class:rotate-180={droppedDown} class="inline-block" src="/home/header/downArrow.svg" alt="" />
	</button>
	<div class:down={droppedDown} class:up={!droppedDown} class="dropdown absolute w-full">
		<div class="rounded-b-md text-gray-500">
			{#each options as option}
				<button class="w-[100%] bg-blue-white text-start border-gray-300 border-b-2 border-x-2 border-x-primary-300 py-3 px-5" on:click={() => chooseOption(option)} on:click={sendData(option)}>{option}</button>
			{/each}
		</div>
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
	.explore:has(.down) > button {
		@apply border-primary-300 rounded-t-md rounded-b-none;
	}

	.down > div > button:last-child {
		@apply border-primary-300 border-b-2;
	}
	.dropdown button:hover {
		@apply bg-primary-300 text-white border-primary-300;
	}
	.dropdown > div {
		overflow: hidden;
	}
	.down {
		grid-template-rows: 1fr;
	}
</style>
