<script>
	import timeTeller from '$lib/util/timeTeller.js';
	import { proposal, showProposalList } from '$lib/stores/proposal.js';
	import { onMount } from 'svelte';
	export let proposals;
	// Sum:null
	// attachments:[]
	// bio:"hna z.3ma"
	// createdAt:"2024-05-14T00:37:15.646Z"
	// deadline:"2024-05-31T00:00:00.000Z"
	let stars = [1, 2, 3, 4, 5];
	let active = 0;

	$: {
		if (proposals) {
			// for (let i = 0; i < 20; i++) {
			// 	proposals.push(proposals[0]);
			// }
			proposal.set(proposals[active]);
		}
	}
	const selectProposal = (i) => {
		active = i;
		proposal.set(proposals[i]);
		showProposalList.set(false);
	};
</script>

{#if proposals?.length}
	<aside class="bg-blue-white max-md:m-2 max-md:w-full md:min-w-[23rem] md:m-10 md:ms-0 md:mb-0">
		<h2 class="text-400 my-5">All Proposals</h2>
		<div class="md:overflow-y-scroll md:max-h-[40rem] md:pr-3 w-full">
			{#each proposals as proposal, i}
				<button class:active={i == active} on:click={() => selectProposal(i)} class="block hover:bg-white rounded-xl w-full bg-gray-100 p-2 my-2">
					<div class="flex gap-3 items-center">
						<img src="/defaultProfile.svg" alt="" />
						<div class="flex w-full justify-between gap-10">
							<div>
								<p class="truncate-text-1">{proposal.firstName + ' ' + proposal.lastName}</p>
								<div class="flex gap-2">
									<p class="text-primary-300">{proposal.score}</p>
									<div class="flex">
										{#each stars as star}
											{#if proposal.score >= star}
												<img src="/general/primary-star.svg" alt="" />
											{/if}
										{/each}
									</div>
								</div>
							</div>
							<div>
								<p class="text-primary-400 font-semibold">{proposal.price} DA</p>
								<p>2 days ago</p>
							</div>
						</div>
					</div>
				</button>
			{/each}
		</div>
	</aside>
{/if}

<style>
	.active {
		@apply md:border-primary-300 md:border-2;
	}
	/* your styles go here */
	::-webkit-scrollbar {
		width: 3px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: transparent;
		margin-top: 0.75rem;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		@apply bg-primary-300;
		/* @apply bg-transparent; */
		border-radius: 20px;
	}
</style>
