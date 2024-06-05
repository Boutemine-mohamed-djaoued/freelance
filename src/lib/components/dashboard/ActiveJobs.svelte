<script>
	import { showProposalList } from '$lib/stores/proposal.js';
	import { finishJob, job, doneJob } from '$lib/stores/dashboard.js';
	import { goto } from '$app/navigation';
	export let Posted;
	export let Active;
	export let Done;
	export let type;
	let active;
	type == 'freelancer' ? (active = 'Active') : (active = 'Posted');
	Posted.sort((a, b) => b.requests.length - a.requests.length);
	let jobsArrays = { Posted, Active, Done };
	const handleJobs = (i) => {
		if (active === 'Posted') {
			if (jobsArrays[active][i]?.requests?.length <= 0) return;
			showProposalList.set(true);
			goto(`/client/${jobsArrays[active][i]._id}`);
		} else {
			$finishJob = true;
			$job = jobsArrays[active][i];
			if (active === 'Done') {
				doneJob.set(true);
			} else if (active === 'Active') {
				doneJob.set(false);
			}
		}
	};
</script>

<section class="bg-white p-5 pb-0 rounded-xl">
	<div class="flex items-center justify-between">
		<h2 class="text-500 text-primary-400">Jobs</h2>
		<div class="me-3 md:me-7 bg-primary-400 rounded-xl p-1 text-white max-md:text-[0.8em] flex">
			<button class:hidden={type == 'freelancer'} class:active={active == 'Posted'} on:click={() => (active = 'Posted')} class="px-1 rounded-s-lg">Posted</button>
			<button class:active={active == 'Active'} on:click={() => (active = 'Active')} class="border-white px-1" class:rounded-s-lg={type == 'freelancer'}>Active</button>
			<button class:active={active == 'Done'} on:click={() => (active = 'Done')} class="px-1 rounded-e-lg">Done</button>
		</div>
	</div>
	<div class="max-md:h-[20rem] md:h-[16rem] max-md:text-[0.8em] overflow-y-auto flex flex-col justify-start">
		{#if jobsArrays[active]?.length > 0}
			{#each jobsArrays[active] as job, i}
				<button on:click={() => handleJobs(i)} class="text-left flex bg-gray-100 bg-opacity-70 justify-between items-center py-2 ps-2 pe-5 my-1 max-md:me-2 me-5 rounded-2xl hover:bg-primary-300 hover:bg-opacity-10">
					<div class="flex items-center">
						{#if active != 'Posted'}
							<div class="pr-3">
								<img class="max-md:w-10" src="/defaultProfile.svg" alt="" />
							</div>
							<div>
								<p>{job.title}</p>
								<p class="text-gray-500">{job.details.firstName + ' ' + job.details.lastName}</p>
							</div>
						{:else}
							<div>
								<p>{job.title}</p>
								<p class="text-gray-500">{job.requests?.length || 0} requests</p>
							</div>
						{/if}
					</div>
					<div>
						<p>{job.createdAt.slice(0, 10)}</p>
						<p>{job.price} DA</p>
					</div>
				</button>
			{/each}
		{:else}
			<p class="mt-5 w-fit mx-auto px-3 rounded-full border-2">no {active} jobs</p>
		{/if}
	</div>
</section>

<style>
	.active {
		@apply bg-blue-white text-primary-400 font-semibold;
	}
	::-webkit-scrollbar {
		width: 10px;
	}
	@media (width < 768px) {
		::-webkit-scrollbar {
			width: 5px;
		}
	}
	::-webkit-scrollbar-track {
		background: transparent;
		margin-top: 0.75rem;
	}

	::-webkit-scrollbar-thumb {
		@apply bg-primary-300;
		border-radius: 20px;
	}
</style>
