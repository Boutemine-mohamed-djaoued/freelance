<script>
	import { review, job } from '$lib/stores/dashboard.js';
	import { onMount } from 'svelte';
	import { id, token } from '$lib/stores/Session.js';
	import makeQuery from '$lib/util/makeQuery.js';
	import { clientReveiwFreelancer } from '$lib/util/queries.js';
	let stars = [1, 2, 3, 4, 5];
	let myComment;
	let active = 0;

	onMount(async () => {});
	const submit = async () => {
		console.log('hello');
		console.log($job);
		try {
			let data = await makeQuery(
				clientReveiwFreelancer,
				{ reviewed: $job.details._id, score: active + 1, comment: myComment, reviewer: $id, work: $job._id },
				{
					'Content-Type': 'application/json',
					authorization: $token
				}
			);
			console.log(data);
			$job.clientReview = true ;
			alert('Review Submitted');
		} catch (err) {
			console.log(err);
		}
		review.set(false);
	};
</script>

<div class="card p-10 bg-off-white z-[1000] rounded-lg">
	<p class="text-center">What Would you rate <span class="font-semibold">{$job.details.firstName + " " + $job.details.lastName} </span> :</p>
	<div class="my-5 flex gap-1 justify-center">
		{#each stars as star, i}
			<button
				on:click={() => {
					active = i;
					stars = stars;
				}}
			>
				{#if i > active}
					<img class="w-10 aspect-square" src="/general/empty-star.svg" alt="" />
				{:else}
					<img class="w-10 aspect-square" src="/general/primary-star.svg" alt="" />
				{/if}
			</button>
		{/each}
	</div>
	<p>Tell us about your experience</p>
	<textarea class="min-h-[10rem] w-[25rem] block bg-gray-100" name="" id="" bind:value={myComment}></textarea>
	<button on:click={() => submit()} class="mt-5 mx-auto block bg-primary-300 text-white font-semibold py-2 px-5 rounded-lg">Submit</button>
</div>

<style>
	.card {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, calc(-50% + 100px));
		animation: pop 0.5s forwards;
	}

	@keyframes pop {
		0% {
			opacity: 0;
		}
		100% {
			transform: translate(-50%, -50%);
			opacity: 1;
		}
	}
</style>
