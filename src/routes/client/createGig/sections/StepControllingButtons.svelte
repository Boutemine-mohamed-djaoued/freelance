<script>
	import { goto } from '$app/navigation';
	import { currentStep, isThisStepValid, catchError } from '$lib/stores/CreateGig.js';
	const GoToNextStep = () => {
		if ($isThisStepValid[$currentStep]) {
			goto(`/client/createGig/Step${$currentStep + 2}`);
			currentStep.update((n) => n + 1);
		} else {
			catchError.set(true);
		}
	};
	const GoToPreviousStep = () => {
		if ($currentStep == 1) {
			goto(`/client/createGig`);
			currentStep.set(0);
			return;
		}
		goto(`/client/createGig/Step${$currentStep}`);
		currentStep.update((n) => n - 1);
	};
</script>

<div class="flex my-5 font-medium">
	<button on:click={() => GoToPreviousStep()} class="flex items-center mr-auto text-white bg-primary-400 rounded-full px-5 py-2" class:hidden={$currentStep === 0}>
		<img class="rotate-180" src="/general/white-arrow.svg" alt="" />
		Back
	</button>
	<button on:click={() => GoToNextStep()} class="flex items-center ml-auto text-white bg-primary-300 rounded-full px-5 py-2" class:hidden={$currentStep === 4}>
		Next Step
		<img src="/general/white-arrow.svg" alt="" />
	</button>
</div>
