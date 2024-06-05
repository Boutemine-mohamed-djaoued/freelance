<script>
	import { report, job } from '$lib/stores/dashboard.js';
	import { onMount } from 'svelte';
	import { id, token } from '$lib/stores/Session.js';
	import makeQuery from '$lib/util/makeQuery.js';
	import { createReport } from '$lib/util/queries.js';
	let myComment;
	export let type;
	let myClientId;
	let myFreelancerId;
	let myType;
	if (type == 'freelancer') {
		myFreelancerId = $id;
		myClientId = $job.details._id;
		myType = 'FC';
	} else {
		myFreelancerId = $job.details._id;
		myClientId = $id;
		myType = 'CF';
	}
	onMount(async () => {});
	const submit = async () => {
		console.log($job);
		try {
			let data = await makeQuery(
				createReport,
				{ freelancerId: myFreelancerId, description: myComment, clientId: myClientId, job: $job._id, type: myType },
				{
					'Content-Type': 'application/json',
					authorization: $token
				}
			);
			alert('Report Submitted');
			console.log(data);
		} catch (err) {
			console.log(err);
		}
		report.set(false);
	};
</script>

<div class="card p-10 bg-off-white z-[1000] rounded-lg">
	<p class="text-center">Report <span class="font-semibold">Alexander Truc </span> :</p>
	<p class="my-3">Tell us about the reason</p>
	<textarea class="min-h-[10rem] w-[25rem] block bg-gray-100" name="" id="" bind:value={myComment}></textarea>
	<button on:click={() => submit()} class="mt-5 mx-auto block bg-red-500 text-white font-semibold py-2 px-5 rounded-lg">Report</button>
</div>

<style>
	.card {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, calc(-50% + 100px));
		animation: pop 0.5s forwards;
	}

	@keyframes pop {
		0% {
			opacity: 0;
		}
		100% {
			transform: translate(-50%, -50%);
			opacity: 1;
		}
	}
</style>
