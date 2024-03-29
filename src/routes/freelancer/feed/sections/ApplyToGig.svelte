<script>
	import { showDetails } from '$lib/stores/FeedState.js';
</script>

<section class:left={$showDetails === 2} class:p-10={$showDetails != 2} class="min-h-[100vh] max-md:w-[100vw] bg-gray-100">
	<div class="first-phase">
		<button on:click={() => showDetails.set(2)} class="bg-primary-300 text-white py-4 w-full rounded-md">Apply To Job</button>
		<button class="border-2 border-primary-300 my-4 w-full py-4 rounded-md">
			Save Job
			<img class="inline-block" src="/general/heart.svg" alt="" />
		</button>
		<div class="text-primary-300">
			<img class="inline-block" src="/general/Shield.svg" alt="" />
			<span>Report this post</span>
		</div>
		<div class="flex mt-10 items-center">
			<p class="text-primary-300 ring-primary-300 text-600 ring-1 px-4 mr-3 rounded-md">7</p>
			<p>You have applied into 7 Jobs this week !</p>
		</div>
		<div class="flex items-center my-3">
			<p class="text-primary-300 ring-primary-300 text-600 ring-1 px-4 mr-3 rounded-md">4</p>
			<p>You have finished 4 Jobs this week !</p>
		</div>
	</div>
	<div class:triangle={$showDetails === 2} class="client-profile pt-10 relative isolate">
		<h2 class="md:text-500 font-medium">Client Prfile</h2>
		<div class:flex={$showDetails !== 2} class="items-center mt-5">
			<img class="m-3" src="/defaultProfile.svg" alt="" />
			<div>
				<p>Echidna Greed</p>
				<p class="text-gray-400">Client Proffesional title</p>
			</div>
		</div>
		<p class="max-w-[35ch] text-gray-500 my-3">Quis eiusmod deserunt cillum laboris magna cupidatat esse labore irure quis cupidatat in. Mollit in laborum tempor Lorem incididunt irure.</p>
		<span class="text-400 font-medium">Last Job Posted:</span>
		<div class:flex={$showDetails !== 2} class="items-center mt-5">
			<div class="w-16 h-16 rounded-md bg-gray-200 m-3">
				<img src="" alt="" />
			</div>
			<div>
				<p>UI/UX Web Design</p>
				<p class="max-w-[30ch] text-[0.85em]">Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt.</p>
			</div>
		</div>
		<div class:hidden={$showDetails === 2}>
			<p class="my-5">Active Gigs: 2</p>
			<p>Willaya : <span class="text-gray-400">skikda</span></p>
		</div>
		<div class="flex">
			<label class:hidden={$showDetails <= 1} for="" class="w-full px-10 mt-5 text-start text-gray-400">Proposal Description</label>
		</div>
	</div>
	<div class:hidden={$showDetails !== 2} class="second-phase flex flex-col justify-star px-5">
		<textarea class="h-[10rem] w-[clamp(20rem,40vw,25rem)] rounded-md" name="" id="" placeholder="Description"></textarea>
		<div class="flex gap-5">
			<div>
				<label class="text-gray-400" for="">Rate</label>
				<br />
				<input class="w-32 rounded-md" type="text" />
			</div>
			<div>
				<label class="text-gray-400" for="">Time</label>
				<br />
				<input class="w-32 rounded-md" type="text" />
			</div>
		</div>
		<div class="flex justify-center">
			<button class="bg-primary-300 my-8 px-16 py-3 rounded-md text-white mx-auto"> Send Proposal</button>
		</div>
	</div>
</section>

<style>
	.first-phase {
		transition: opacity 0.5s ease;
	}

	.client-profile {
		transition: transform 0.5s ease;
	}
	.left {
		position: relative;
		padding-inline: 0;
	}
	.left .first-phase {
		display: none;
	}
	.left .client-profile {
		width: 100%;
		margin-inline: auto;
		text-align: center;
		opacity: 0;
		animation: show 0.5s 0.5s ease forwards;
	}
	.left * {
		margin-inline: auto;
	}
	.second-phase {
		opacity: 0;
		animation: show 0.5s 0.5s ease forwards;
	}
	@media (width < 787px) {
		.left .client-profile {
			animation: show 0.5s ease forwards;
		}
		.second-phase {
			animation: show 0.5s ease forwards;
		}
	}
	@keyframes show {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	.triangle::after {
		content: '';
		z-index: -1;
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		background-color: white;
		clip-path: polygon(0% 0%, 100% 0, 72% 100%, 28% 100%);
	}
</style>
