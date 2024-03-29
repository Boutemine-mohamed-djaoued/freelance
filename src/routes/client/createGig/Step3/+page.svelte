<script>
	import { onMount } from 'svelte';
	import ChoiceDropDown from '$lib/components/ui/ChoiceDropDown.svelte';
	import { isThisStepValid } from '$lib/stores/CreateGig.js';
	import { fly } from 'svelte/transition';
	let payment = ['time 1', 'time 2', 'time 3'];
	let method = ['work 1', 'work 2', 'work 3'];
	let boost = ['frequency 1', 'frequency 2', 'frequency 3'];
	let rate;
	$: {
		$isThisStepValid[2] = rate >= 1000;
	}

	const consolData = (e) => {
		console.log(e.detail);
	};
</script>

<div in:fly={{ x: 100, duration: 300 }}>
	<div class="max-md:hidden">
		<h2 class="md:text-400 mb-3 md:mb-5">Time & Location</h2>
		<div class="h-[0.2rem] bg-gray-200" />
	</div>
	<form>
		<div class="max-lg:flex-col flex gap-5 justify-around my-3 md:mt-5 md:mb-14">
			<div class="flex-1">
				<label for="">payment</label>
				<br />
				<div class="lg:max-w-[22rem] relative z-[20]">
					<ChoiceDropDown on:receiveData={consolData} defaultValue="cash 1" options={payment}></ChoiceDropDown>
				</div>
			</div>
			<div class="flex-1">
				<label for="job-title">Rate <span class="text-red-600">*</span></label>
				<br />
				<input class="border-2 focus:border-primary-300 focus-visible:ring-primary-300 border-gray-300 rounded-md py-3 px-5 bg-blue-white w-full lg:w-[min(22rem,100%)]" id="job-title" type="number" placeholder="Amount in DA" bind:value={rate} required min="1000" />
			</div>
		</div>
		<div class="max-lg:flex-col-reverse flex gap-5">
			<div class="flex-1">
				<label for="">method</label>
				<br />
				<div class="lg:max-w-[22rem]">
					<ChoiceDropDown on:receiveData={consolData} defaultValue="work 1" options={method}></ChoiceDropDown>
				</div>
			</div>
			<div class="flex-1">
				<label for="">boost</label>
				<br />
				<div class="lg:max-w-[22rem]">
					<ChoiceDropDown on:receiveData={consolData} defaultValue="frequency 1" options={boost}></ChoiceDropDown>
				</div>
			</div>
		</div>
	</form>
</div>

<style>
	label {
		@apply md:text-400 text-gray-500;
	}
</style>
