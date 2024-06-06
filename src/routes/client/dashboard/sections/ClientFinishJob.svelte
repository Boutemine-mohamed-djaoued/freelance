<script>
	import getFileType from '$lib/util/getFileType.js';
	import { job, review, finishJob, doneJob, report } from '$lib/stores/dashboard.js';
	async function downloadFile(url, filename) {
		const link = document.createElement('a');
		let data = await fetch(url);
		let res = await data.blob();
		const aElement = document.createElement('a');
		aElement.setAttribute('download', filename);
		const href = URL.createObjectURL(res);
		aElement.href = href;
		aElement.setAttribute('target', '_blank');
		aElement.click();
		URL.revokeObjectURL(href);
	}
	const reviewFreelancer = () => {
		review.set(true);
		finishJob.set(false);
	};
</script>

{#if $job}
	<section class="min-h-[100vh - 5rem] h-full max-md:w-[100vw] bg-gray-100 p-10 lg:min-w-[28rem]">
		{#if !$doneJob}
			<a href="/client/payment" class="bg-primary-300 text-white py-4 w-full rounded-md inline-block text-center font-semibold">Finish Job</a>
		{:else if !$job.clientReview}
			<button on:click={() => reviewFreelancer()} class="bg-primary-300 text-white py-4 w-full rounded-md inline-block text-center font-semibold">Review Freelancer</button>
		{:else}
			<button class="bg-primary-400 text-white py-4 w-full rounded-md inline-block text-center font-semibold">Already Reviewed</button>
		{/if}
		<button
			on:click={() => {
				$report = true;
				$finishJob = false;
			}}
			class="text-primary-300 mt-2"
		>
			<img class="inline-block" src="/general/Shield.svg" alt="" />
			<span>Report this freelancer</span>
		</button>
		<div class="flex justify-between my-5">
			<h2>Agreed upon Price :</h2>
			<p class="bg-primary-300 bg-opacity-15 text-primary-300 px-3 py-1 rounded-lg">{$job.price} DA</p>
		</div>
		<div class="my-5">
			<h2 class="md:text-500 font-medium">Files Received</h2>
			<div class="rounded-xl mt-3">
				{#if $job.files?.length}
					{#each $job.files as file}
						<div class="flex items-center gap-3">
							<div class="relative file my-2">
								<img class="w-10" src={`/fileTypes/${getFileType(file.kind)}.svg`} alt="" />
								<button on:click={() => downloadFile(file.link, 'hello')} class="download rounded-md">
									<img src="/general/download.svg" alt="lsjdf" />
								</button>
							</div>
							<p class="text-gray-500">{file.link.split('%20%20')[1].split('?')[0]}</p>
						</div>
					{/each}
				{:else}
					<p class="mx-auto w-fit border-2 rounded-2xl px-2">no files yet</p>
				{/if}
			</div>
		</div>
		<div class="client-profile relative isolate">
			<h2 class="text-500 font-medium">Freelancer Profile</h2>
			<div class="flex items-center mt-5">
				<img class="m-3 w-12 rounded-full aspect-square"  src={$job.details.photo || "/defaultProfile.svg"} alt="" />
				<div>
					<p>{$job.details.firstName + ' ' + $job.details.lastName}</p>
					<p class="text-gray-400">{$job.details.jobTitle}</p>
				</div>
			</div>
			<p class="max-w-[35ch] text-gray-500 my-3">{$job.details.bio}</p>
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
