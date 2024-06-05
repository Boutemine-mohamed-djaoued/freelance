<script>
	import makeQuery from '$lib/util/makeQuery.js';
	import { postJob } from '$lib/util/queries.js';
	import { token, id } from '$lib/stores/Session.js';
	import { goto } from '$app/navigation';
	import { currentStep, isThisStepValid, catchError, gigData, createGigData } from '$lib/stores/CreateGig.js';
	const GoToNextStep = () => {
		if ($createGigData.isThisStepValid[$currentStep]) {
			goto(`/client/createGig/Step${$createGigData.currentStep + 2}`);
			$createGigData.currentStep += 1;
		} else {
			$createGigData.catchError = true ;
		}
	};
	const GoToPreviousStep = () => {
		if ($createGigData.currentStep == 1) {
			goto(`/client/createGig`);
			$createGigData.currentStep = 0;
			return;
		}
		goto(`/client/createGig/Step${$createGigData.currentStep}`);
		$createGigData.currentStep -= 1;
	};
	const post = async () => {
		try {
			let data = await makeQuery(postJob, { input: $createGigData.gigData, user: $id }, { 'content-type': 'application/json', Authorization: $token });
			console.log(data);
			alert('Job posted');
			goto('/client/dashboard');
			$createGigData = {
				currentStep: 0,
				isThisStepValid: new Array(5).fill(true),
				catchError: false,
				gigData: {
					description: null,
					title: null,
					tags: [],
					price: 0,
					deadline: null,
					expertize_level: 'Intermediate',
					job_size: 'Medium',
					payment_structure: 'By_Project',
					attachments: []
				}
			};
		} catch (err) {
			console.log(err);
			alert('failed to post Job');
		}
	};
</script>

<div class="flex my-5 font-medium">
	<button on:click={() => GoToPreviousStep()} class="flex items-center mr-auto text-white bg-primary-400 rounded-full px-5 py-2" class:hidden={$createGigData.currentStep === 0}>
		<img class="rotate-180" src="/general/white-arrow.svg" alt="" />
		Back
	</button>
	<button on:click={() => GoToNextStep()} class="flex items-center ml-auto text-white bg-primary-300 rounded-full px-5 py-2" class:hidden={$createGigData.currentStep === 4}>
		Next Step
		<img src="/general/white-arrow.svg" alt="" />
	</button>
	<button on:click={() => post()} class="flex items-center ml-auto text-white bg-primary-300 rounded-full px-5 py-2" class:hidden={$createGigData.currentStep !== 4}> post Job </button>
</div>
