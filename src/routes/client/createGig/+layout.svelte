<script>
	import { gigData } from '$lib/stores/CreateGig.js';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import DesktopStepIndicator from './sections/DesktopStepIndicator.svelte';
	import MobileStepIndicator from './sections/MobileStepIndicator.svelte';
	import StepControllingButtons from './sections/StepControllingButtons.svelte';
	let screenWidth;
	onMount(() => {
		screenWidth = window.innerWidth;
	});
</script>

<div class="grid-system" transition:fly={{ y: 100, duration: 300 }}>
	{#if screenWidth > 768}
		<div class="flex items-center md:gap-10 xl:gap-20 min-h-[calc(100vh-5rem)]">
			<div class="shrink-0">
				<DesktopStepIndicator></DesktopStepIndicator>
				<StepControllingButtons></StepControllingButtons>
			</div>
			<div class="flex-1">
				<p class="text-center text-400 mb-10">Complete the following fields</p>
				<div class="bg-gray-100 rounded-md p-10">
					<slot />
				</div>
			</div>
		</div>
	{:else}
		<MobileStepIndicator></MobileStepIndicator>
		<div class="my-3 pb-20 wrapper bg-gray-100">
			<slot />
			<StepControllingButtons></StepControllingButtons>
		</div>
	{/if}
</div>
