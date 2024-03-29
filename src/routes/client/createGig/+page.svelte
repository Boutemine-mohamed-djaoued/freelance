<script>
	import ChoiceDropDown from '$lib/components/ui/ChoiceDropDown.svelte';
	import { isThisStepValid, catchError } from '$lib/stores/CreateGig.js';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	let options = ['Entry', 'Intermediate', 'Expert'];
	let jobs = ['size 1', 'size 2', 'size 3'];
	let jobTitleValue = '';
	let descriptionValue = '';
	$: {
		$isThisStepValid[0] = jobTitleValue.length >= 5 && jobTitleValue.length <= 30 && descriptionValue.length >= 10 && descriptionValue.length <= 150;
	}
	let errorBtn;
	onMount(() => {
		errorBtn = document.querySelector('.focused');
	});
	$: {
		$catchError;
		console.log('helo');
		if (errorBtn) {
			errorBtn.focus();
			console.log('lkdjf')
		}
	}
	const consolData = (e) => {
		console.log(e.detail);
	};
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
				<input class="border-2 focus:border-primary-300 focus-visible:ring-primary-300 border-gray-300 rounded-md py-3 px-5 bg-blue-white w-full lg:w-[min(22rem,100%)]" id="job-title" type="text" placeholder="main topic" bind:value={jobTitleValue} maxlength="30" minlength="5" required />
			</div>
			<div class="flex-1">
				<label for="">Experience</label>
				<br />
				<div class="lg:max-w-[22rem] relative z-[20]">
					<ChoiceDropDown on:receiveData={consolData} defaultValue="Intermediate" {options}></ChoiceDropDown>
				</div>
			</div>
		</div>
		<div class="max-lg:flex-col-reverse flex gap-5">
			<div class="flex-1">
				<label for="description">Description <span class="text-red-600">*</span></label>
				<br />
				<textarea class="border-2 border-gray-300 rounded-md py-3 px-5 h-[10rem] bg-blue-white w-full lg:w-[min(22rem,100%)] focus:border-primary-300 focus-visible:ring-primary-300" id="description" placeholder="explanation" bind:value={descriptionValue} maxlength="150" minlength="10" required
				></textarea>
			</div>
			<div class="flex-1">
				<label for="">Job</label>
				<br />
				<div class="lg:max-w-[22rem]">
					<ChoiceDropDown on:receiveData={consolData} defaultValue="size 1" options={jobs}></ChoiceDropDown>
				</div>
			</div>
		</div>
		<button class="focused">lsfjkdsl</button>
	</form>
</div>

<style>
	label {
		@apply md:text-400;
	}
</style>
