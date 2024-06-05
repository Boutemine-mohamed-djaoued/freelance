<script>
	import makeQuery from '$lib/util/makeQuery.js';
	import { finishJob, review, report } from '$lib/stores/dashboard.js';
	import ActivityBarChart from '$lib/components/dashboard/ActivityBarChart.svelte';
	import ActiveJobs from '$lib/components/dashboard/ActiveJobs.svelte';
	import PostGig from '$lib/components/dashboard/PostGig.svelte';
	import Reviews from '$lib/components/dashboard/reviews/Reviews.svelte';
	import Statistics from '$lib/components/dashboard/Statistics.svelte';
	import { fly } from 'svelte/transition';
	import MoreGigDetails from '$lib/components/dashboard/MoreGigDetails.svelte';
	import FreelancerFinishJob from './sections/FreelancerFinishJob.svelte';
	import { getFreelancerDash } from '$lib/util/queries.js';
	import { onMount } from 'svelte';
	import { id, token } from '$lib/stores/Session.js';
	import Skeleton from '$lib/components/dashboard/Skeleton.svelte';
	import Review from './sections/Review.svelte';
	import Report from '$lib/components/dashboard/Report.svelte';
	let jobs;
	onMount(async () => {
		try {
			let data = await makeQuery(
				getFreelancerDash,
				{ freelancerDashId: $id },
				{
					'Content-Type': 'application/json',
					authorization: $token
				}
			);
			console.log(data);
			if (data?.data) {
				jobs = data.data.freelancerDash;
			}
			// 		console.log(data);
			// 		console.log(jobs);
		} catch (err) {
			console.log(err);
		}
	});
</script>

{#if jobs}
	<div>
		<div class="grid-system my-5 md:my-10 min-h-[calc(100vh-10rem)]">
			<div class="main-grid max-md:flex flex-col gap-5 md:gap-10">
				<div class="col-start-1 col-span-3 max-md:order-1">
					<Statistics money={jobs.moneyMade} activeJobs={jobs.jobsProgress.length} proposals={jobs.requests.length} completedJobs={jobs.jobsArchive.length} type="freelancer"></Statistics>
				</div>
				<div class="col-span-2 max-md:order-3">
					<ActiveJobs type="freelancer" Posted={[]} Active={jobs.jobsProgress} Done={jobs.jobsArchive}></ActiveJobs>
				</div>
				<div class="max-md:order-2">
					<PostGig type="freelancer"></PostGig>
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
					<FreelancerFinishJob></FreelancerFinishJob>
				</div>
			</div>
		</div>
		{#if $review}
			<Review></Review>
		{/if}
		{#if $report}
			<Report type="freelancer"></Report>
		{/if}
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
