<script>
	import { showDetails } from '$lib/stores/FeedState.js';
	import { job } from '$lib/stores/FeedState.js';
</script>

{#if $job}
	<section class="min-h-[100vh - 5rem] h-full max-md:w-[100vw] bg-gray-100 p-10">
		<div>
			<a href="/freelancer/feed/submitProposal" on:click={() => ($showDetails = false)} class="bg-primary-300 text-white py-4 w-full rounded-md inline-block text-center font-semibold">Apply To Job</a>
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
		<div class="client-profile pt-4 relative isolate">
			<h2 class="text-500 font-medium">Client Profile</h2>
			<div class="flex items-center mt-5">
				<img class="m-3 w-14 rounded-full" src={ $job.clientInfo.photo ||"/defaultProfile.svg"} alt="" />
				<div>
					<p>{$job.clientInfo.firstName + ' ' + $job.clientInfo.lastName}</p>
					<p class="text-gray-400">{$job.clientInfo.jobTitle}</p>
				</div>
			</div>
			<p class="max-w-[35ch] text-gray-500 my-3">{$job.clientInfo.bio}</p>
		</div>
	</section>
{/if}
