<script>
	import { fly } from 'svelte/transition';
</script>

<div in:fly={{ x: 100, duration: 300 }}>
	<div class="max-md:hidden">
		<h2 class="md:text-400 mb-3 md:mb-5">Upload files</h2>
		<div class="h-[0.2rem] bg-gray-200" />
	</div>
	<h3 class="font-normal text-400 text-gray-500 mt-3 md:mt-5">Files Uploaded</h3>
	<div class="border-2 min-h-[10rem] border-gray-400 mt-1 md:mt-2 rounded-md"></div>
	<div class="flex justify-end mt-3 md:mt-5">
		<button class="flex items-center gap-2 px-5 py-2 border-2 border-gray-500 border-dashed rounded-lg">
			<img src="/general/upload.svg" alt="" />
			Upload Files
		</button>
	</div>
</div>
