<script>
	import makeQuery from '$lib/util/makeQuery.js';
	import { finishJob } from '$lib/stores/dashboard.js';
	import ActivityBarChart from './sections/ActivityBarChart.svelte';
	import ActiveJobs from './sections/ActiveJobs.svelte';
	import PostGig from './sections/PostGig.svelte';
	import Reviews from './sections/reviews/Reviews.svelte';
	import Statistics from './sections/Statistics.svelte';
	import { fly } from 'svelte/transition';
	import MoreGigDetails from './sections/MoreGigDetails.svelte';
	import FinishJob from './sections/FinishJob.svelte';
	import { getClientJobs } from '$lib/util/queries.js';
	import { onMount } from 'svelte';
	import { id, token } from '$lib/stores/Session.js';
	import Skeleton from './sections/Skeleton.svelte';
	let jobs;
	onMount(async () => {
		try {
			let data = await makeQuery(
				getClientJobs,
				{ clientJobsId: $id },
				{
					'Content-Type': 'application/json',
					authorization: $token
				}
			);
			console.log(data);
			if (data.data) {
				jobs = data.data.clientJobs;
			}
			console.log(data);
			console.log(jobs);
		} catch (err) {
			console.log(err);
		}
	});
</script>

{#if jobs}
	<div class="">
		<div transition:fly={{ y: 100, duration: 300 }} class="grid-system my-5 md:my-10">
			<div class="main-grid max-md:flex flex-col gap-5 md:gap-10">
				<div class="col-start-1 col-span-3 max-md:order-1">
					<Statistics wallet={'1000'} postedJobs={jobs.jobs?.length || 0} activeJobs={jobs.jobsProgress?.length || 0} completedJobs={jobs.jobsArchive?.length || 0}></Statistics>
				</div>
				<div class="col-span-2 max-md:order-3">
					<ActiveJobs Posted={jobs.jobs} Active={jobs.jobsProgress} Done={jobs.jobsArchive}></ActiveJobs>
				</div>
				<div class="max-md:order-2">
					<PostGig></PostGig>
				</div>
				<div class="max-md:order-3">
					<Reviews reviews={jobs.rating}></Reviews>
				</div>
				<div class="col-start-2 col-span-2 max-md:hidden">
					<ActivityBarChart postedJobs={jobs.graph}></ActivityBarChart>
				</div>
			</div>
		</div>
		<div class:off-screen={!$finishJob} class:in-screen={$finishJob} class="details bg-white absolute top-[3.6rem] h-[calc(100vh-3.6rem)] md:top-[5rem] md:h-[calc(100vh-5rem)] z-[999]">
			<div class="md:flex overflow-y-auto h-[calc(100vh-3.6rem)] md:h-[calc(100vh-5rem)] border-t-2">
				<div>
					<MoreGigDetails></MoreGigDetails>
				</div>
				<div class="shrink-0">
					<FinishJob></FinishJob>
				</div>
			</div>
		</div>
	</div>
{:else}
	<Skeleton></Skeleton>
{/if}

<style>
	@media (width >= 768px) {
		.main-grid {
			display: grid;
			grid-template-rows: auto auto auto;
			grid-template-columns: auto 1fr auto;
		}
	}
	.details {
		transition: transform 0.7s ease;
	}

	::-webkit-scrollbar {
		width: 0px;
	}
	::-webkit-scrollbar-track {
		background: transparent;
	}

	::-webkit-scrollbar-thumb {
		@apply bg-primary-300;
		border-radius: 20px;
	}
	@media (width < 768px) {
		.details,
		.filters {
			transition: transform 0.5s ease;
		}
		.filters {
			overflow-y: scroll;
		}
		.hide-filters {
			transform: translateX(-100%);
		}
		::-webkit-scrollbar {
			width: 5px;
		}
	}
	.in-screen {
		transform: translateX(calc(100vw - 100%));
	}
	.off-screen {
		transform: translateX(100vw);
	}
</style>
