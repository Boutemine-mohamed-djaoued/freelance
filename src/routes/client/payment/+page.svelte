<script>
	import { goto } from '$app/navigation';
	import { id, token } from '$lib/stores/Session.js';
	import { fly } from 'svelte/transition';
	import makeQuery from '$lib/util/makeQuery.js';
	import { getChargilyLink } from '$lib/util/queries.js';
	import { job } from '$lib/stores/dashboard.js';
	import { onMount } from 'svelte';
	console.log($job);
	let data;
	onMount(async () => {
		try {
			data = await makeQuery(
				getChargilyLink,
				{
					getChargilyLinkId: $id,
					job: $job._id
				},
				{
					'Content-Type': 'application/json',
					authorization: $token
				}
			);
			console.log(data);
			// proposalsData = data.data.getJobRequests;
			// console.log(proposalsData);
		} catch (err) {
			console.log(err);
		}
	});
</script>

<div class="flex flex-col max-w-[30rem] mx-auto" transition:fly={{ y: 100, duratin: 300 }}>
	<div class="text-center mt-10 md:text-500">fullfill your payment</div>
	<div class="mx-auto w-fit my-10 rounded-2xl overflow-hidden">
		<img class="" width="500px" src="/payment.jpg" alt="" />
	</div>
	<div class="flex justify-between gap-10 items-center">
		<div class="w-fit">
			<a href="/client/dashboard" class="bg-primary-400 inline-block my-5 text-white rounded-lg py-2 px-10 font-semibold">dashbord</a>
		</div>
		{#if data?.data?.getChargilyLink?.url}
			<a href={data.data.getChargilyLink.url} class="bg-green-400 inline-block my-5 text-white rounded-lg py-2 px-10 font-semibold">pay with chargily</a>
		{:else}
			<p class="bg-green-400 rounded-xl px-8 py-2 text-white font-semibold">laoding...</p>
		{/if}
	</div>
</div>
