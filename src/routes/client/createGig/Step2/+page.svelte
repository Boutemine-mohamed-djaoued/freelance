<script>
	import ChoiceDropDown from '$lib/components/ui/ChoiceDropDown.svelte';
	import { fly } from 'svelte/transition';
	let time = ['time 1', 'time 2', 'time 3'];
	let wilayas = ['wilay 1', 'wilaya 2', 'wilaya 3'];
	let work = ['work 1', 'work 2', 'work 3'];
	let frequency = ['frequency 1', 'frequency 2', 'frequency 3'];
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
			<div class="flex-1" >
				<label for="">Time</label>
				<br />
				<div class="lg:max-w-[22rem] relative z-[20]">
					<ChoiceDropDown on:receiveData={consolData} defaultValue="time 1" options={time}></ChoiceDropDown>
				</div>
			</div>
			<div class="flex-1">
				<label for="">Wilayas</label>
				<br />
				<div class="lg:max-w-[22rem] relative z-[10]">
					<ChoiceDropDown on:receiveData={consolData} defaultValue="wilays 1" options={wilayas}></ChoiceDropDown>
				</div>
			</div>
		</div>
		<div class="max-lg:flex-col-reverse flex gap-5">
			<div class="flex-1">
				<label for="">Update frequency</label>
				<br />
				<div class="lg:max-w-[22rem]">
					<ChoiceDropDown on:receiveData={consolData} defaultValue="work 1" options={work}></ChoiceDropDown>
				</div>
			</div>
			<div class="flex-1">
				<label for="">Job</label>
				<br />
				<div class="lg:max-w-[22rem]">
					<ChoiceDropDown on:receiveData={consolData} defaultValue="frequency 1" options={frequency}></ChoiceDropDown>
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
