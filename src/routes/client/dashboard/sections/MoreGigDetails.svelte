<script>
	import { finishJob, job } from '$lib/stores/dashboard.js';
	import { onMount } from 'svelte';
	let gig = {
		img: '',
		name: 'Sleep Well',
		topic: 'Web Developpement',
		location: 'Annaba',
		time: '29 min ago',
		price: 500,
		paimentMethod: 'Hourly',
		description:
			'Mollit in laborum tempor Lorem incididunt irure.  Aute eu ex ad sunt. Pariatur sint culpa do i ncididunt eiusmod eiusmod  culpa. laborum tempor Lorem incidieiusmod  culpa. laborum tempor Lorem incidieiusmod  culpa. laborum tempor Lorem incidieiusmod  culpa. laborum tempor Lorem incidieiusmod  culpa. laborum tempor Lorem incidieiusmod  culpa. laborum tempor Lorem incididunt.Mollit in laborum tempor Lorem incididunt irure.  Aute eu ex ad sunt. Pariatur sint culpa do i ncididunt eiusmod eiusmod  culpa. laborum tempor Lorem incididunt.',
		files: [
			{
				img: '/fileTypes/pdf.svg',
				name: 'Research.pdf',
				size: '2.8MB'
			},
			{
				img: '/fileTypes/doc.svg',
				name: 'clientList.Word',
				size: '4.2MB'
			}
		],
		skills: ['Python', 'Backend', 'Django']
	};
	let gigIcons;
	job.subscribe((value) => {
		if (value) {
			gigIcons = [
				{
					icon: '/general/MapPinLine.svg',
					text: $job.expertize_level
				},
				{
					icon: '/general/Clock.svg',
					text: $job.payment_structure
				},
				{
					icon: '/general/CurrencyDollar.svg',
					text: $job.price
				},
				{
					icon: '/general/CalendarBlank.svg',
					text: $job?.deadline?.slice(0, 10)
				}
			];
		}
	});
</script>

{#if $job}
	<section class:max-md:hidden={!finishJob} class="p-7 pt-4 md:p-10 md:max-w-[40rem] lg:min-w-[40rem]">
		<button class="back-button" on:click={() => finishJob.set(0)}>
			<img class="w-5 md:w-8" src="/general/back.svg" alt="" />
		</button>
		<h3 class="my-5 text-center md:text-400">{$job.title}</h3>
		<div class="tags flex my-5 md:my-10 justify-around text-gray-500">
			{#if gigIcons}
				{#each gigIcons as icon}
					<div class="">
						<img class="w-6 md:w-8 mb-3 mx-auto" src={icon.icon} alt="" />
						<p class="shrink-0 max-md:text-[0.9em]">{icon.text}</p>
					</div>
				{/each}
			{/if}
		</div>
		<div>
			<p class="description text-gray-500 text-justify">{$job.description}</p>
		</div>
		<h3 class="files mt-10 text-400">Files Uploaded:</h3>
		<div class="my-5">
			{#if $job.attachments}
				{#each $job.attachments as file}
					<div class="flex my-3 justify-between text-gray-500">
						<div class="flex items-center gap-2">
							<!-- <img src={file.img} alt="" /> -->
							<p>{file.link.split('%20%20')[1].split('?')[0]}</p>
						</div>
						<p>2MB</p>
					</div>
				{/each}
			{:else}
				<p>no files attached</p>
			{/if}
		</div>
		<div class="flex justify-between text-center my-7">
			<div>
				<span class="font-medium">Job Size</span>
				<p class="my-2 text-gray-500">{$job.job_size}</p>
			</div>
			<div>
				<span class="font-medium">Payement Structure</span>
				<p class="my-2 text-gray-500">{$job.payment_structure}</p>
			</div>
			<div>
				<spa class="font-medium">Payement Method</spa>
				<p class="my-2 text-gray-500">CCP</p>
			</div>
		</div>
		<h3 class="text-400">Skills & technologies:</h3>
		<div class="flex flex-wrap gap-3 my-3">
			{#if $job.tags}
				{#each $job.tags as skill}
					<p class="bg-gray-200 text-[0.85em] py-1 px-5 rounded-lg">{skill}</p>
				{/each}
			{/if}
		</div>
	</section>
{/if}

<style>
	.p-holder {
		--lines: 0;
		display: grid;
		line-height: 1.6;
		transition: grid-template-rows 0.5s ease;
	}
	.less {
		grid-template-rows: calc(5 * 1.6 * 1em);
	}
	.more {
		grid-template-rows: calc(var(--lines));
	}
	.p-holder > div {
		overflow: hidden;
	}
</style>
