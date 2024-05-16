<script>
	import  getFileType  from '$lib/util/getFileType.js';
	import { gigData, isThisStepValid } from '$lib/stores/CreateGig.js';
	import Loading from '$lib/components/ui/Loading.svelte';
	import { fly } from 'svelte/transition';
	import uploadFiles from '$lib/util/uploadFiles.js';
	let fileInput;
	let uploading = false;
	let formData = new FormData();
	$: {
		$isThisStepValid[3] = !uploading;
	}
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
				$gigData.attachments.push({
					link: links[i],
					kind: value.type
				});
				i++;
			}
			$gigData = $gigData;
		} catch (err) {
			console.log(err);
		}
		formData = new FormData();
		uploading = false;
	};
	const saveFile = async () => {
		for (let file of fileInput.files) {
			if (file.type !== '') formData.append('files', file);
		}
		fileInput.value = null;
		uploading = true;
		await fileUploader();
	};
</script>

<div in:fly={{ x: 100, duration: 300 }}>
	<div class="max-md:hidden">
		<h2 class="md:text-400 mb-3 md:mb-5">Upload files</h2>
		<div class="h-[0.2rem] bg-gray-200" />
	</div>
	<div class="relative">
		<h3 class="font-normal text-400 text-gray-500 mt-3 md:mt-5">Files Uploaded</h3>
		<div class="opcity-100 relative border-2 min-h-[10rem] border-gray-400 mt-1 md:mt-2 rounded-md p-2">
			<div class="flex">
				{#if $gigData.attachments}
					{#each $gigData.attachments as file}
						<div class="me-1 mb-1">
							<img class="w-12" src={`/fileTypes/${getFileType(file.kind)}.svg`} alt="" />
						</div>
					{/each}
				{/if}
			</div>
			<div class="on-top flex flex-col justify-center items-center gap-2">
				<div class:hidden={!uploading} class="bg-white py-5 px-16 rounded-xl">
					Uploading...
					<Loading></Loading>
				</div>
			</div>
		</div>
		<div class="flex justify-between mt-3 md:mt-5 items-center">
			<input on:change={() => saveFile()} class="rounded-lg hidden" id="fileInput" type="file" multiple bind:this={fileInput} />
			<label for="fileInput" class="ml-auto flex items-center gap-2 px-5 py-2 border-2 border-gray-500 border-dashed rounded-lg">
				<img src="/general/upload.svg" alt="" />
				Upload Files
			</label>
		</div>
	</div>
</div>

<style>
	.on-top {
		position: absolute;
		width: 100%;
		height: 100%;
		inset: 0;
	}
</style>
