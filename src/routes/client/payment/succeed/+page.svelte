<script>
	import makeQuery from '$lib/util/makeQuery.js';
	import { validateJob } from '$lib/util/queries';
	import { id, token } from '$lib/stores/Session.js';
	import {job} from '$lib/stores/dashboard.js';
	import { onMount } from 'svelte';
	onMount(async () => {
		try {
			let data = await makeQuery(
				validateJob,
				{ job: $job._id, client: $id },
				{
					'Content-Type': 'application/json',
					authorization: $token
				}
			);
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	});
	// const finishTheJob = async () => {
	// 	review.set(true);
	// 	finishJob.set(false);
	// 	let data = await makeQuery(
	// 		validateJob,
	// 		{ job: $job._id, client: $id },
	// 		{
	// 			'Content-Type': 'application/json',
	// 			authorization: $token
	// 		}
	// 	);
	// 	console.log(data);
	// };
</script>
<div class="text-center mt-10 md:text-500">payment succuessuflly done</div>
<div class="mx-auto w-fit my-10 rounded-2xl overflow-hidden">
	<img class="" width="500px" src="/succeed.avif" alt="" />
</div>
<div class="mx-auto w-fit">
	<a href="/client/dashboard" class="bg-primary-400 inline-block my-5 text-white rounded-lg py-2 px-10 font-semibold">back to dashboard</a>
</div>
