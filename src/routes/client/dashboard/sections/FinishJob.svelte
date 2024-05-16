<script>
	import makeQuery from '$lib/util/makeQuery.js';
	import { validateJob } from '$lib/util/queries';
	import { job } from '$lib/stores/dashboard.js';
	import { id, token } from '$lib/stores/Session.js';
	let files = ['file1.pdf', 'file2.img', 'file3.doc', 'file3.img'];
	const finishJob = async () => {
		let data = await makeQuery(
			validateJob,
			{ job: $job._id, client: $id },
			{
				'Content-Type': 'application/json',
				authorization: $token
			}
		);
		console.log(data);
	};
</script>

{#if $job}
	<section class="min-h-[100vh - 5rem] h-full max-md:w-[100vw] bg-gray-100 p-10 lg:min-w-[28rem]">
		<button on:click={() => finishJob()} class="bg-primary-300 text-white py-4 w-full rounded-md inline-block text-center font-semibold">Finish Job</button>
		<div class="text-primary-300 mt-2">
			<img class="inline-block" src="/general/Shield.svg" alt="" />
			<span>Report this freelancer</span>
		</div>
		<div class="flex justify-between my-5">
			<h2>Agreed upon Price :</h2>
			<p class="bg-primary-300 bg-opacity-15 text-primary-300 px-3 py-1 rounded-lg">{$job.price} DA</p>
		</div>
		<div class="my-5">
			<h2 class="md:text-500 font-medium">Files Reveived</h2>
			<div class="rounded-xl mt-3">
				{#if files}
					{#each files as file}
						<div class="flex items-center gap-3">
							<div class="relative file my-2">
								<!-- <img class="w-10" src={`/fileTypes/${file.split('.').pop()}.svg`} alt="" /> -->
								<button class="download rounded-md">
									<img src="/general/download.svg" alt="lsjdf" />
								</button>
							</div>
							<p class="text-gray-500">{file}</p>
							<p class="ml-auto text-gray-500">2MB</p>
						</div>
					{/each}
				{/if}
			</div>
		</div>
		<div class="client-profile relative isolate">
			<h2 class="text-500 font-medium">Freelancer Profile</h2>
			<div class="flex items-center mt-5">
				<img class="m-3" src="/defaultProfile.svg" alt="" />
				<div>
					<p>{$job.freelancerDetails.fristName + ' ' + $job.freelancerDetails.lastName}</p>
					<p class="text-gray-400">{$job.freelancerDetails.jobTitle}</p>
				</div>
			</div>
			<p class="max-w-[35ch] text-gray-500 my-3">{$job.freelancerDetails.bio}</p>
		</div>
	</section>
{/if}

<style>
	.file:hover .download {
		display: flex;
	}

	.download {
		display: none;
		justify-content: center;
		align-items: center;
		width: 100%;
		aspect-ratio: 1;
		background-color: rgba(0, 0, 0, 0.616);
		position: absolute;
		/* top: 50%; */
		/* left: 50%; */
		/* transform: translate(-50%, -50%); */
		inset: 0;
	}
</style>
