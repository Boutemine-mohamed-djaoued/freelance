<script>
	import makeQuery from '$lib/util/makeQuery.js';
	import { postProposal } from '$lib/util/queries.js';
	import { id, token } from '$lib/stores/Session.js';
	import { job } from '$lib/stores/FeedState.js';
	let pairs;
	let date = '';
	let terms = {
		price: 0,
		service: 0,
		received: 0
	};
	let proposal = {
		price: null,
		description: null,
		attachements: ['file1.svg', 'file2.jpg', 'file3.pdf'],
		deadline: null
	};
	$: {
		terms.service = Math.round(terms.price * 0.1);
		terms.received = terms.price - terms.service;
	}
	$: {
		proposal.price = terms.price;
		if (date) proposal.deadline = new Date(date).toISOString();
		console.log(proposal.deadline);
	}
	job.subscribe((value) => {
		if (value) {
			terms.price = value.price;
			pairs = [
				{
					one: 'Job Size',
					two: $job.job_size
				},
				{
					one: 'Expertise Level',
					two: $job.expertize_level
				},
				{
					one: 'Price',
					two: $job.price + ' DA'
				},
				{
					one: 'Deadline',
					two: $job.deadline.slice(0, 10)
				},
				{
					one: 'Payment Structure',
					two: $job.payment_structure
				}
			];
		}
	});
	const submitProposal = async () => {
		try {
			console.log(proposal);
			let data = await makeQuery(
				postProposal,
				{
					userid: $id,
					input: { ...proposal, job: $job._id }
				},
				{
					'Content-Type': 'application/json',
					authorization: $token
				}
			);
			if (data.data.postJobRequest.message == 'Created') {
				alert('Proposal submitted successfully');
			} else if (data.data.postJobRequest.message == 'Updated') {
				alert('Proposal updated successfully');
			}
		} catch (err) {
			console.log(err);
		}
	};
</script>

{#if $job}
	<form on:submit|preventDefault={submitProposal}>
		<h2 class="md:text-500 my-5 md:my-10">Submit a proposal</h2>
		<div class="p-5 md:p-10 border-2 rounded-xl">
			<h3 class="md:text-400 text-primary-400">Job Details</h3>
			<div class="md:flex gap-5">
				<div class="w-full">
					<h4 class="my-3 md:my-3">{$job.title}</h4>
					<p class="max-w-[50rem]">{$job.description}</p>
					<div class="mt-3 md:mt-8 pt-3 border-t-2">
						<h5 class="my-2 md:my-3">Skills & Technologies</h5>
						{#each $job.tags as skill}
							<span class="inline-block max-md:text-[0.8em] px-3 py-1 me-2 mb-2 bg-primary-400 bg-opacity-10 rounded-full">{skill}</span>
						{/each}
					</div>
				</div>
				<div class="min-w-[15rem] pt-3 max-md:mt-3 ml-auto max-md:border-t-2 md:border-s-2 md:px-5">
					{#each pairs as pair}
						<div class="my-2">
							<p class="text-[0.9em]">{pair.one}</p>
							<h5 class="text-primary-400">{pair.two}</h5>
						</div>
					{/each}
				</div>
			</div>
		</div>
		<div class="my-5 md:my-10 p-5 md:p-10 border-2 rounded-xl">
			<h3 class="md:text-400 mb-3 text-primary-400">Terms & Policy</h3>
			<div class="md:flex gap-5">
				<div class="flex flex-col gap-5 flex-1">
					<div class="flex justify-between max-md:flex-col md:items-center md:gap-5">
						<div>
							<h4>Proposal</h4>
							<p>Total amount the client will see on your proposal</p>
						</div>
						<input class="max-md:ml-auto min-w-0 w-[10rem] rounded-xl text-right" type="number" required min="1000" bind:value={terms.price} />
					</div>
					<div class="flex max-md:flex-col justify-between md:items-center md:gap-5">
						<div>
							<h4>Service Fee</h4>
							<p>10% for our services</p>
						</div>
						<input class="max-md:ml-auto min-w-0 w-[10rem] rounded-xl text-right bg-gray-200 focus:border-0 focus:ring-0" type="text" readonly bind:value={terms.service} />
					</div>
					<div class="flex max-md:flex-col justify-between md:items-center md:gap-5">
						<div>
							<h4>You'll receiver'</h4>
							<p>the amount received after our service fee</p>
						</div>
						<input class="max-md:ml-auto min-w-0 w-[10rem] rounded-xl text-right bg-gray-200 focus:border-0 focus:ring-0" type="text" readonly bind:value={terms.received} />
					</div>
				</div>
				<div class="flex-1 max-md:mt-5 max-md:pt-5 max-md:border-t-2 md:border-s-2 md:ps-5">
					<div class="flex max-md:flex-col md:items-center mb-5 max-md:gap-3">
						<h4 class=" w-[15ch]">Time needed</h4>
						<input class="min-w-0 w-[10rem] rounded-xl" type="date" placeholder="date" bind:value={date} required />
					</div>
					<div class="flex max-md:flex-col md:items-center gap-3 md:gap-10">
						<h4 class="w-[15ch]">Attachements</h4>
						<div class="w-full flex flex-col gap-5">
							<div class="h-[6rem] flex flex-col items-center justify-center gap-3 ring-1 ring-gray-500 rounded-xl p-3 w-full"></div>
							<button class="flex gap-3 ring-1 px-3 py-1 rounded-lg ring-gray-500 ml-auto">
								<img class="w-5" src="/general/upload.svg" alt="" />
								<p>upload file</p>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="my-5 md:my-10 p-5 md:p-10 border-2 rounded-xl">
			<h4 class="w-[20ch] mb-5 md:text-400 text-primary-400">Proposal Description</h4>
			<textarea class=" min-w-0 min-h-[10rem] w-full rounded-xl" placeholder="" minlength="100" required bind:value={proposal.description} />
		</div>
		<div class="flex max-md:justify-between my-5 font-medium gap-5">
			<a href="/freelancer/feed" class="flex items-center md:text-400 md:ml-auto text-primary-300 rounded-full px-5 py-2"> back to feed </a>
			<input type="submit" class="flex md:text-400 items-center text-white bg-primary-400 rounded-full px-5 py-2" value="Submit Proposal" />
		</div>
	</form>
{/if}

<style>
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button,
	input[type='number']::-webkit-clear-button {
		display: none;
		-webkit-appearance: none;
		margin: 0;
	}
</style>
