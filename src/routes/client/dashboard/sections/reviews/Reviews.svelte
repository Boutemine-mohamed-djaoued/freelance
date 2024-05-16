<script>
	import { onMount } from 'svelte';
	import DonutChart from './DonutChart.svelte';
	export let reviews;
	let defaultReviews = {
		all: 15,
		avg: 4.38,
		nums: [1, 2, 3, 4, 5]
	};
	if (reviews.score) {
		defaultReviews.nums = reviews.stars;
		defaultReviews.avg = reviews.score.toFixed(2);
		defaultReviews.all = 0;
		reviews.stars.forEach((element) => {
			defaultReviews.all += element;
		});
	}
	let reviewsProgress;
	const setReviews = () => {
		for (let i = 0; i < reviewsProgress.length; i++) {
			reviewsProgress[i].style.width = `${(defaultReviews.nums[defaultReviews.nums.length - i - 1] / defaultReviews.all) * 100}%`;
			reviewsProgress[i].style.opacity = `${100 - 10 * i}%`;
		}
	};
	onMount(() => {
		reviewsProgress = document.querySelectorAll('.reviews div div');
		setReviews();
	});
</script>

<section class="bg-white rounded-xl p-5 md:w-[30rem] h-full flex flex-col">
	<h2 class="text-500 mb-5 text-primary-400">Reviews</h2>
	{#if reviews?.score}
		<div class="flex gap-5">
			<div class="flex-1">
				<div class="mx-auto w-fit relative">
					<DonutChart reviews={defaultReviews}></DonutChart>
					<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
						<p class="md:text-500 font-semibold text-center text-primary-400">{defaultReviews.avg}</p>
						<p class="text-gray-500 max-md:text-[0.7em]">{defaultReviews.all} reviews</p>
					</div>
				</div>
			</div>
			<div class="flex-1 flex flex-col justify-around">
				{#each defaultReviews.nums as num, i}
					<div class="flex reviews gap-2 items-center">
						<span class="w-2 text-center">{defaultReviews.nums.length - i}</span>
						<img class="w-3" src="/general/star.svg" alt="" />
						<div class="flex-1 relative bg-gray-100 h-3 rounded-full">
							<div class="progress-bar w-0"></div>
						</div>
						<span class="w-5 text-center font-semibold">{defaultReviews.nums[defaultReviews.nums.length - i - 1]}</span>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<div class="flex items-center h-full">
			<p class="border-2 rounded-full w-fit mx-auto px-5">No reviews yet</p>
		</div>
	{/if}
</section>

<style>
	.reviews div div {
		content: '';
		@apply bg-primary-400 inset-0 h-full absolute rounded-full;
	}
	.progress-bar {
		transition: width 0.4s ease;
	}
</style>
