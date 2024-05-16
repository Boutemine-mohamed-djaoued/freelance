<script>
	import { onMount } from 'svelte';
	import { isThisStepValid, gigData } from '$lib/stores/CreateGig.js';
	import { fly } from 'svelte/transition';

	let toSelect = ['Web Development', 'SEO Writing', 'Administrative Support', 'Article', 'Blog Content', 'Customer Service', 'Ebook Writing', 'Email Communication', 'Fact-Checking', 'File Maintenance', 'File Management', 'Ghostwriting', 'Google Docs', 'List-Based Infographics'];
	let selected = ['Mobile', 'Blog Writing', 'Logo Design', 'Creative Writing', 'Translation', 'Copywriting'];

	$: {
		$isThisStepValid[2] = selected.length != 0;
	}

	$: {
		$gigData.tags = selected;
	}
	const selectTag = (i) => {
		selected = [...selected, toSelect[i]];
		toSelect.splice(i, 1);
		toSelect = toSelect;
	};
	const unSelectTag = (i) => {
		toSelect = [...toSelect, selected[i]];
		selected.splice(i, 1);
		selected = selected;
	};
	const consolData = (e) => {
		console.log(e.detail);
	};
</script>

<div class="md:min-h-[20rem]" in:fly={{ x: 100, duration: 300 }}>
	<div class="max-md:hidden">
		<h2 class="md:text-400 mb-3 md:mb-5">Skills Required</h2>
		<div class="h-[0.2rem] bg-gray-200" />
	</div>
	<div class="md:flex mt-5 gap-5 items-center">
		<div>
			<h3 class="mb-2">Search for skills you need</h3>
			<div class="flex items-center">
				<div class="bg-black p-2 rounded-s-lg">
					<img src="/general/magnifier.svg" alt="" />
				</div>
				<input class="min-w-0 rounded-e-lg" type="text" />
			</div>
			<h3 class="mt-3 mb-2">Selected Skills</h3>
			<div>
				{#each selected as skill, i}
					<button on:click={() => unSelectTag(i)} class="border-2 border-primary-300 border-opacity-45 hover:border-gray-300 rounded-2xl px-2 py-1 me-1 mb-1 text-300">
						{skill}
						<img class="w-3 inline ml-1" src="/general/close.png" alt="" />
					</button>
				{/each}
			</div>
		</div>
		<div>
			<h3 class="mt-3 mb-2">Suggestions</h3>
			{#each toSelect as skill, i}
				<button on:click={() => selectTag(i)} class="border-2 hover:border-primary-300 hover:border-opacity-45 border-gray-300 rounded-2xl px-2 py-1 me-1 mb-1 text-300">
					{skill}
					<img class="w-3 inline ml-1 rotate-45" src="/general/close.png" alt="" />
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
</style>
