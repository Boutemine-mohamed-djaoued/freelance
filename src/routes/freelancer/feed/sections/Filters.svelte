<script>
	import { showFilters } from '$lib/stores/FeedState.js';
	import { filters } from '$lib/stores/filters.js';
	let filterValues = [
		{
			title: 'Job rate',
			name: 'rate',
			values: ['Any', 900, 50000, 80000, 1000000]
		},
		{
			title: 'Date of posting',
			name: 'date',
			values: ['Any', 'Last 24 hours', 'Last 3 days', 'Last 7 days']
		},
		{
			title: 'Experience Level',
			name: 'experience',
			values: ['Any', 'Entry', 'Intermediate', 'Expert']
		},
		{
			title: 'Job Size',
			name: 'size',
			values: ['Any', 'Small', 'Medium', 'Large']
		},
		{
			title: 'payment structure',
			name: 'structure',
			values: ['Any', 'By_Milestone', 'By_Project']
		}
	];
	const filterFeed = (field, value) => {
		if (value === 'Any') {
			$filters[field] = null;
		} else {
			$filters[field] = value;
		}
	};
</script>

<aside class="bg-white w-full p-5 md:mb-5 rounded-lg">
	<div class="flex justify-between items-center">
		<h2 class="my-3 md:my-4 text-400 font-semibold">Filters</h2>
		<button on:click={() => showFilters.set(false)}>
			<img class="w-5 md:hidden" src="/general/back.svg" alt="" />
		</button>
	</div>
	{#each filterValues as filter}
		<form>
			<h3 class="my-2 md:my-3 text-300 font-semibold">{filter.title}</h3>
			{#each filter.values as value}
				<label class="hover:cursor-pointer" for={value}>
					<input on:change={() => filterFeed(filter.name, value)} checked={value === 'Any'} class="m-2" type="radio" id={value} name={filter.title} {value} />
					{#if filter.title === 'Gig rate'}
						>
					{/if}
					{value}
				</label><br />
			{/each}
		</form>
	{/each}
</aside>

<style>
	input[type='radio']:checked {
		@apply bg-primary-300;
	}
	input[type='radio'] {
		@apply ring-transparent outline-none;
	}
	input[type='radio']:checked:focus {
		@apply shadow-sm;
	}
</style>
