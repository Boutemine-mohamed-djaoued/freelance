<script>
	import { showProposalList } from '$lib/stores/proposal.js';
	import ProposalDetail from './sections/ProposalDetail.svelte';
	import ProposalsList from './sections/ProposalsList.svelte';
	import Title from './sections/Title.svelte';
	import { fly } from 'svelte/transition';
	import makeQuery from '$lib/util/makeQuery.js';
	import { getJobRequests } from '$lib/util/queries';
	import { token, id } from '$lib/stores/Session.js';
	import { onMount } from 'svelte';
	let jobId = 'b79a681bd3fb496a80c6656b01260e46';
	let proposalsData;
	onMount(async () => {
		try {
			let data = await makeQuery(
				getJobRequests,
				{
					getJobRequestsId: jobId,
					userid: $id
				},
				{
					'Content-Type': 'application/json',
					authorization: $token
				}
			);
			console.log(data);
			proposalsData = data.data.getJobRequests;
			console.log(proposalsData);
		} catch (err) {
			console.log(err);
		}
	});
</script>

<div transition:fly={{ y: 100, duration: 300 }} class="grid-system flex flex-col">
	<Title title={proposalsData?.job}></Title>
	{#if proposalsData?.requests}
		<div class="my-5 border-2 rounded-[2rem] flex">
			<div class:max-md:hidden={$showProposalList} class="flex-1">
				<ProposalDetail></ProposalDetail>
			</div>
			<div class:max-md:hidden={!$showProposalList}>
				<ProposalsList proposals={proposalsData?.requests}></ProposalsList>
			</div>
		</div>
	{/if}
</div>
