<script>
	import { onMount } from 'svelte';
	import Swiper from 'swiper';
	import 'swiper/css/bundle';
	import { Navigation } from 'swiper/modules';
	import { currentStep, catchError, isThisStepValid } from '$lib/stores/CreateGig.js';
	let steps = [
		{
			title: 'General Info',
			description: 'Describe the job you need'
		},
		{
			title: 'Time',
			description: 'When do you need it'
		},
		{
			title: 'Rate',
			description: 'How much are you paying'
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
		let localCurrentStep = 0;
		currentStep.subscribe((n) => {
			if (n > localCurrentStep) {
				swiperDescription.slideNext();
				swiperCircles.slideNext();
			} else if (n < localCurrentStep) {
				swiperDescription.slidePrev();
				swiperCircles.slidePrev();
			}
			localCurrentStep = n;
			if (n < 2) {
				circlesContainer.style.setProperty('--line-offset', `calc((((100% - 3rem * 3) / 6) * ${2 * (0 + 1) - 1}) + 3rem * ${0 + 1})`);
			} else {
				circlesContainer.style.setProperty('--line-offset', `calc((((100% - 3rem * 3) / 6) * ${2 * (1 + 1) - 1}) + 3rem * ${1 + 1})`);
			}
			circlesContainer.style.setProperty('--progress-length', `calc((((100% - 3rem * 3) / 6) * ${2 * (n + 1) - 1}) + 3rem * ${n})`);
		});
		catchError.subscribe((value) => {
			if (value) {
				setTimeout(() => {
					catchError.set(false);
				}, 1000);
			}
		});
		let swiperDescription = new Swiper('.swiper-container-description', {
			modules: [Navigation],
			direction: 'horizontal',
			loop: true,
			slidesPerView: 1,
			allowTouchMove: false
		});
		let swiperCircles = new Swiper('.swiper-container-circles', {
			modules: [Navigation],
			direction: 'horizontal',
			loop: false,
			slidesPerView: 3,
			spaceBetween: 0,
			centeredSlides: true,
			allowTouchMove: false
		});
	});
</script>

<section class="my-5 full-width">
	<div class="swiper swiper-container-description">
		<div class="swiper-wrapper">
			{#each steps as step, i}
				<div class="swiper-slide text-center font-semibold my-2">
					<p>{step.description}</p>
				</div>
			{/each}
		</div>
	</div>
	<div class="relative swiper swiper-container-circles mt-3">
		<div class="swiper-wrapper circles-container">
			{#each steps as step, i}
				<div class="swiper-slide text-center font-semibold my-2">
					<div class="flex flex-col">
						<div class:current={i == $currentStep && !$catchError} class:passed={i < $currentStep} class:error={$catchError && !$isThisStepValid[$currentStep] && i == $currentStep} class="circle flex-1 grid items-center text-center w-12 border-2 mx-auto bg-blue-white rounded-full aspect-square">
							<p>{i + 1}</p>
						</div>
						<h3 class="h-10 grid items-center text-primary-300 mt-2">{step.title}</h3>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.circles-container {
		--progress-length: 0;
		--line-offset: calc((100% - 3 * 3rem) / 6);
	}
	.circles-container::after {
		content: '';
		position: absolute;
		left: var(--line-offset);
		top: 25%;
		height: 3px;
		width: calc((100%));
		z-index: -1;
		background-color: rgba(128, 128, 128, 0.568);
	}
	.circles-container::before {
		content: '';
		position: absolute;
		left: calc((100% - 3 * 3rem) / 6);
		top: 25%;
		width: var(--progress-length);
		border-radius: 50px;
		height: 5px;
		z-index: -1;
		@apply bg-primary-300;
		transition: width 0.5s ease;
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
			@apply text-white font-semibold bg-primary-300;
			scale: 1.2;
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
