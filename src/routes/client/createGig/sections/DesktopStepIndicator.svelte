<script>
	import { onMount } from 'svelte';
	import { currentStep, catchError, isThisStepValid  , createGigData} from '$lib/stores/CreateGig.js';
	let steps = [
		{
			title: 'General Info',
			description: 'Describe the job you need'
		},
		{
			title: 'Rate',
			description: 'How much are you paying'
		},
		{
			title: 'Skills Required',
			description: 'What are the skills you need'
		},
		{
			title: 'Upload Files',
			description: 'Files needed to perform it'
		},
		{
			title: 'Review & Post',
			description: 'Make sure we got it right'
		}
	];
	let circlesContainer;
	let circles;
	onMount(() => {
		circlesContainer = document.querySelector('.circles-container');
		circles = document.querySelectorAll('.circle');
		createGigData.subscribe((value) => {
			circlesContainer.style.setProperty('--progress-length', `calc((((100% - 3.5rem * 5) / 10) * ${2 * (value.currentStep + 1) - 1}) + 3.5rem * ${value.currentStep + 1})`);
		});
		createGigData.subscribe((value) => {
			if (value.catchError) {
				setTimeout(() => {
					$createGigData.catchError = false ;
				}, 1000);
			}
		});
	});
</script>

<aside class="flex gap-8">
	<div class="text-right py-5 flex flex-col gap-10">
		{#each steps as step, i}
			<div>
				<p class="text-gray-400">Step {i + 1}</p>
				<h3 class=" font-normal text-400">{step.title}</h3>
				<p>{step.description}</p>
			</div>
		{/each}
	</div>
	<div class="circles-container flex flex-col justify-around relative">
		{#each steps as step, i}
			<div class:current={i == $createGigData.currentStep && !$createGigData.catchError} class:passed={i < $createGigData.currentStep} class:error={$createGigData.catchError && !$createGigData.isThisStepValid[$createGigData.currentStep] && i == $createGigData.currentStep} class="circle grid items-center text-center w-14 border-2 bg-blue-white rounded-full aspect-square">
				<p>{i + 1}</p>
			</div>
		{/each}
	</div>
</aside>

<style>
	.circles-container {
		--progress-length: 0;
	}
	.circles-container::after {
		content: '';
		position: absolute;
		top: 0;
		left: 50%;
		width: 3px;
		height: calc((100%));
		z-index: -1;
		background-color: rgba(128, 128, 128, 0.568);
	}
	.circles-container::before {
		content: '';
		position: absolute;
		top: 0;
		left: 50%;
		width: 5px;
		border-radius: 50px;
		height: var(--progress-length);
		z-index: -1;
		@apply bg-primary-300;
		transition: height 0.5s ease;
	}
	.passed {
		animation: passed-animation 0.3s ease forwards;
	}
	@keyframes passed-animation {
		0% {
			scale: 1.2;
		}
		100% {
			scale: 1;
			@apply text-white font-semibold bg-primary-400;
		}
	}
	.current {
		animation: current-animation 0.5s ease forwards;
	}
	@keyframes current-animation {
		0% {
			scale: 1;
		}
		100% {
			scale: 1.2;
			@apply text-white font-semibold bg-primary-300;
		}
	}
	.error {
		position: relative;
		@apply bg-red-500 text-white font-medium;
		animation: error-animation 0.5s ease;
	}
	@keyframes error-animation {
		0% {
		}
		25% {
			transform: translateX(-0.1rem);
		}
		50% {
			transform: translateX(+0.1rem);
		}
		75% {
			transform: translateX(-0.1rem);
		}
		100% {
			transform: translateX(+0.1rem);
		}
	}
</style>
