<script>
	import makeQuery from '$lib/util/makeQuery.js';
	import { validateJob } from '$lib/util/queries';
	import { job, review, finishJob, doneJob, report } from '$lib/stores/dashboard.js';
	import { id, token } from '$lib/stores/Session.js';
	let files = ['file1.pdf', 'file2.img', 'file3.doc', 'file3.img'];
	import getFileType from '$lib/util/getFileType.js';
	import Loading from '$lib/components/ui/Loading.svelte';
	import { fly } from 'svelte/transition';
	import uploadFiles from '$lib/util/uploadFiles.js';
	import { freelancerUploadFiles } from '$lib/util/queries.js';
	let fileInput;
	let attachements = $job?.files;
	console.log('attachements');
	console.log(attachements);
	let uploading = false;
	let formData = new FormData();
	const fileUploader = async () => {
		try {
			console.log('uplaoding...');
			let links = await uploadFiles(formData);
			console.log('uploaded');
			console.log(links);
			let i = 0;
			for (let entry of formData.entries()) {
				let key = entry[0];
				let value = entry[1];
				attachements.push({
					link: links[i],
					kind: value.type
				});
				i++;
			}
			attachements = attachements;
		} catch (err) {
			console.log(err);
		}
		formData = new FormData();
		uploading = false;
	};
	const saveFile = async () => {
		uploading = true;
		for (let file of fileInput.files) {
			if (file.type !== '') formData.append('files', file);
		}
		fileInput.value = null;
		uploading = true;
		await fileUploader();
		try {
			console.log(attachements);
			console.log($job._id);
			let data = await makeQuery(
				freelancerUploadFiles,
				{ uploadFilesId: $id, jobid: $job._id, files: attachements },
				{
					'Content-Type': 'application/json',
					authorization: $token
				}
			);
			console.log(data);
			// 		console.log(data);
			// 		console.log(jobs);
		} catch (err) {
			console.log(err);
		}
		uploading = false;
	};
	const reviewFreelancer = () => {
		if (!$doneJob) {
			alert('You will be able to review this client when the job is done');
			return;
		}
		review.set(true);
		finishJob.set(false);
	};
</script>

{#if $job}
	<section class="min-h-[100vh - 5rem] h-full max-md:w-[100vw] bg-gray-100 p-10 lg:min-w-[28rem]">
		{#if !$job.freelancerReview}
			<button on:click={() => reviewFreelancer()} class="bg-primary-300 text-white py-4 w-full rounded-md inline-block text-center font-semibold">Review Client</button>
		{:else}
			<button class="bg-primary-400 text-white py-4 w-full rounded-md inline-block text-center font-semibold">Already reviewed</button>
		{/if}
		<button
			on:click={() => {
				$report = true;
				$finishJob = false;
			}}
			class="text-primary-300 mt-2 cursor-pointer"
		>
			<img class="inline-block" src="/general/Shield.svg" alt="" />
			<span>Report this client</span>
		</button>
		<div class="flex justify-between my-5">
			<h2>Agreed upon Price :</h2>
			<p class="bg-primary-300 bg-opacity-15 text-primary-300 px-3 py-1 rounded-lg">{$job.price} DA</p>
		</div>
		<div class="my-5">
			<h2 class="md:text-500 font-medium">Files Uploaded</h2>
			<div>
				<div class="min-h-[15rem] max-w-[22rem] p-5 border-2 rounded-xl my-5">
					<div class="flex flex-wrap">
						{#if attachements}
							{#each attachements as file}
								<div class="me-1 mb-1">
									<img class="w-12" src={`/fileTypes/${getFileType(file.kind)}.svg`} alt="" />
								</div>
							{/each}
						{/if}
					</div>
				</div>
				{#if !$doneJob}
					<div class="flex justify-between mt-3 md:mt-5 items-center">
						<input on:change={() => saveFile()} class="rounded-lg hidden" id="fileInput" type="file" multiple bind:this={fileInput} />
						<label for="fileInput" class="ml-auto cursor-pointer flex items-center gap-2 px-5 py-2 border-2 border-gray-500 border-dashed rounded-lg">
							<img src="/general/upload.svg" alt="" />
							{uploading ? 'uploading...' : 'Upload Files'}
						</label>
					</div>
				{/if}
			</div>
		</div>
		<div class="client-profile relative isolate">
			<h2 class="text-500 font-medium">Client Profile</h2>
			<div class="flex items-center mt-5">
				<img class="m-3 w-12 rounded-full aspect-square" src={$job.details.photo || "/defaultProfile.svg"} alt="" />
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
