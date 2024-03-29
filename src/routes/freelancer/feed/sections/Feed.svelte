<script>
	import { showDetails, showFilters } from '$lib/stores/FeedState.js';
	import GigCard from '$lib/components/ui/GigCard.svelte';
	import ChoiceDropDown from '$lib/components/ui/ChoiceDropDown.svelte';
	let gigNum = 911;
	let gigs = [
		{
			img: '',
			name: 'Sleep Well',
			topic: 'Web Developpement',
			location: 'Annaba',
			time: '29 min ago',
			price: 500,
			paimentMethod: 'Hourly',
			description: 'Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.'
		},
		{
			img: '',
			name: 'Sleep Well',
			topic: 'Web Developpement',
			location: 'Annaba',
			time: '29 min ago',
			price: 500,
			paimentMethod: 'Hourly',
			description: 'Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.'
		},
		{
			img: '',
			name: 'Sleep Well',
			topic: 'Web Developpement',
			location: 'Annaba',
			time: '29 min ago',
			price: 500,
			paimentMethod: 'Hourly',
			description: 'Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.'
		},
		{
			img: '',
			name: 'Sleep Well',
			topic: 'Web Developpement',
			location: 'Annaba',
			time: '29 min ago',
			price: 500,
			paimentMethod: 'Hourly',
			description: 'Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.'
		},
		{
			img: '',
			name: 'Sleep Well',
			topic: 'Web Developpement',
			location: 'Annaba',
			time: '29 min ago',
			price: 500,
			paimentMethod: 'Hourly',
			description: 'Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.'
		},
		{
			img: '',
			name: 'Sleep Well',
			topic: 'Web Developpement',
			location: 'Annaba',
			time: '29 min ago',
			price: 500,
			paimentMethod: 'Hourly',
			description: 'Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.'
		}
	];
	let options = ['price', 'time', 'location'];
</script>

<main class="md:mx-10">
	<div class="flex items-center justify-between font-semibold">
		<button on:click={() => showFilters.set(true)} class="flex items-center gap-2 md:hidden">
			<img src="/general/filter.svg" alt="" />
			filters
		</button>
		<p class="max-md:hidden text-500">{gigNum} Gigs</p>
		<div class="w-[8rem]">
			<ChoiceDropDown defaultValue="Sort By" {options}></ChoiceDropDown>
		</div>
	</div>
	<div>
		{#each gigs as gig}
			<GigCard on:click={() => showDetails.set(1)} {gig}></GigCard>
		{/each}
	</div>
</main>
