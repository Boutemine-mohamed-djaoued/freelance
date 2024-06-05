<script>
	import ChoiceDropDown from '$lib/components/ui/ChoiceDropDown.svelte';
	import { fly } from 'svelte/transition';
	import { createGigData } from '$lib/stores/CreateGig.js';

	$: {
		$createGigData.isThisStepValid[1] = $createGigData.gigData.price >= 1000 && $createGigData.gigData.deadline;
	}
	let timeDeadline;
	$: {
		if (timeDeadline) $createGigData.gigData.deadline = new Date(timeDeadline).toISOString();
		if ($createGigData.gigData.deadline) timeDeadline = $createGigData.gigData.deadline.slice(0, 10);
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
	<div>
		<div class="max-lg:flex-col flex gap-5 justify-around my-3 md:mt-5 md:mb-14">
			<div class="flex-1">
				<label for="">Dead Line</label>
				<br />
				<div class="lg:max-w-[22rem] relative z-[20]">
					<input class="w-full rounded-md py-3" type="date" bind:value={timeDeadline} />
				</div>
			</div>
			<div class="flex-1">
				<label for="job-title">Rate <span class="text-red-600">*</span></label>
				<br />
				<input class="border-2 focus:border-primary-300 focus-visible:ring-primary-300 border-gray-300 rounded-md py-3 px-5 bg-blue-white w-full lg:w-[min(22rem,100%)]" id="job-title" type="number" placeholder="Amount in DA" bind:value={$createGigData.gigData.price} required min="1000" />
			</div>
		</div>
		<div class="max-lg:flex-col-reverse flex gap-5">
			<div class="flex-1">
				<label for="">Payment Structure</label>
				<br />
				<div class="lg:max-w-[22rem]">
					<ChoiceDropDown
						on:receiveData={(e) => {
							$createGigData.gigData.payment_structure = e.detail;
						}}
						defaultValue="By_Project"
						options={['By_Project', 'By_Milestone']}
					></ChoiceDropDown>
				</div>
			</div>
			<div class="flex-1">
				<label for="">Payment Method</label>
				<br />
				<div class="lg:max-w-[22rem]">
					<ChoiceDropDown on:receiveData={consolData} defaultValue="ccp" options={['ccp']}></ChoiceDropDown>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	label {
		@apply md:text-400 text-gray-500;
	}
</style>
