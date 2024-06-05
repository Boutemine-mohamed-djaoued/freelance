<script>
	import { createGigData } from '$lib/stores/CreateGig.js';
	import ChoiceDropDown from '$lib/components/ui/ChoiceDropDown.svelte';
	import { isThisStepValid, catchError, gigData } from '$lib/stores/CreateGig.js';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	let form;
	$: {
		$createGigData.isThisStepValid[0] = $createGigData.gigData.title?.length >= 5 && $createGigData.gigData.title?.length <= 50 && $createGigData.gigData.description?.length >= 50 && $createGigData.gigData.description?.length <= 500;
	}
	onMount(() => {
		form = document.querySelector('form');
	});
	$: {
		if (form && $createGigData.catchError) {
			console.log(form.reportValidity());
		}
	}
</script>

<div in:fly={{ x: 100, duration: 300 }}>
	<div class="max-md:hidden">
		<h2 class="md:text-400 mb-3 md:mb-5">General Info</h2>
		<div class="h-[0.2rem] bg-gray-200" />
	</div>
	<form class="py-3">
		<div class="max-lg:flex-col flex gap-5 justify-around my-3 md:my-5">
			<div class="flex-1 relative">
				<label for="job-title">Job title <span class="text-red-600">*</span></label>
				<br />
				<input
					class="border-2 focus:border-primary-300 focus-visible:ring-primary-300 border-gray-300 rounded-md py-3 px-5 bg-blue-white w-full lg:w-[min(22rem,100%)]"
					id="job-title"
					type="text"
					placeholder="main topic"
					bind:value={$createGigData.gigData.title}
					maxlength="50"
					minlength="5"
					required
				/>
			</div>
			<div class="flex-1">
				<label for="">Experience Level</label>
				<br />
				<div class="lg:max-w-[22rem] relative z-[20]">
					<ChoiceDropDown
						on:receiveData={(e) => {
							$createGigData.gigData.expertize_level = e.detail;
						}}
						defaultValue="Intermediate"
						options={['Entry', 'Intermediate', 'Expert']}
						getSmall={false}
					></ChoiceDropDown>
				</div>
			</div>
		</div>
		<div class="max-lg:flex-col-reverse flex gap-5">
			<div class="flex-1">
				<label for="description">Description <span class="text-red-600">*</span></label>
				<br />
				<textarea
					class="border-2 border-gray-300 rounded-md py-3 px-5 h-[10rem] bg-blue-white w-full lg:w-[min(22rem,100%)] focus:border-primary-300 focus-visible:ring-primary-300"
					id="description"
					placeholder="explanation"
					bind:value={$createGigData.gigData.description}
					maxlength="500"
					minlength="50"
					required
				></textarea>
			</div>
			<div class="flex-1">
				<label for="">Job Size</label>
				<br />
				<div class="lg:max-w-[22rem]">
					<ChoiceDropDown
						on:receiveData={(e) => {
							$createGigData.gigData.job_size = e.detail;
						}}
						defaultValue="Medium"
						options={['Small', 'Medium', 'Large']}
					></ChoiceDropDown>
				</div>
			</div>
		</div>
	</form>
</div>

<style>
	label {
		@apply md:text-400;
	}
</style>
