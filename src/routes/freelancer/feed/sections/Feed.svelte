<script>
	import makeQuery from '$lib/util/makeQuery.js';
	import { freelancerFeed } from '$lib/util/queries.js';
	import { id, token } from '$lib/stores/Session.js';
	import { showDetails, showFilters } from '$lib/stores/FeedState.js';
	import GigCard from '$lib/components/ui/GigCard.svelte';
	import ChoiceDropDown from '$lib/components/ui/ChoiceDropDown.svelte';
	import { onMount } from 'svelte';
	import { filters } from '$lib/stores/filters.js';
	import Loading from '$lib/components/ui/Loading.svelte';
	import NavigateGigs from './NavigateGigs.svelte';
	import { job } from '$lib/stores/FeedState.js';
	let gigNum = 911;
	let sortMethod = null;
	let gigs;
	const fetchGigs = async () => {
		try {
			gigs = null;
			let data = await makeQuery(
				freelancerFeed,
				{ getFreelancerFeedId: $id, ...$filters },
				{
					'Content-Type': 'application/json',
					authorization: $token
				}
			);
			console.log(data);
			if (data) {
				gigs = data.data.getFreelancerFeed;
			}
		} catch (err) {
			console.log(err);
		}
	};
	const sortGigs = (value) => {
		if (value) sortMethod = value;
		console.log(sortMethod);
		if (sortMethod == 'price') {
			gigs.sort((a, b) => b.price - a.price);
		} else if (sortMethod == 'time') {
			gigs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
		}
		gigs = [...gigs];
	};
	filters.subscribe(async () => {
		await fetchGigs();
	});
	const getJob = (myJob) => {
		showDetails.set(1);
		job.set(myJob);
	};
</script>

<main class="md:mx-10">
	<div class="flex items-center justify-between font-semibold">
		<button on:click={() => showFilters.set(true)} class="flex items-center gap-2 md:hidden">
			<img src="/general/filter.svg" alt="" />
			filters
		</button>
		<p class="max-md:hidden text-500">{gigNum} Gigs</p>
		<div class="w-[8rem]">
			<ChoiceDropDown on:receiveData={(e) => sortGigs(e.detail)} getSmall="true" defaultValue="Sort By" options={['price', 'time']}></ChoiceDropDown>
		</div>
	</div>
	<div>
		{#if gigs && gigs.length}
			{#each gigs as gig}
				<GigCard on:click={() => getJob(gig)} {gig}></GigCard>
			{/each}
			<NavigateGigs></NavigateGigs>
		{:else if gigs}
			<p class="text-400 text-center mt-16">No Result Found</p>
		{:else}
			<div class="mt-16">
				<Loading></Loading>
			</div>
		{/if}
	</div>
</main>
