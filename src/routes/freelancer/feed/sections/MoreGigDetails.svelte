<script>
	import { onMount } from 'svelte';
	import { showDetails } from '../../../../lib/stores/FeedState';
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
	let gigIcons = [
		{
			icon: '/general/MapPinLine.svg',
			text: gig.location
		},
		{
			icon: '/general/Clock.svg',
			text: gig.paimentMethod
		},
		{
			icon: '/general/CurrencyDollar.svg',
			text: gig.price
		},
		{
			icon: '/general/CalendarBlank.svg',
			text: gig.time
		}
	];
	let showMoreDescription = false;
	const toggleDescription = () => {
		showMoreDescription = !showMoreDescription;
	};
	onMount(() => {
		let p = document.querySelector('.description');
		let pHolder = document.querySelector('.p-holder');
		pHolder.style.setProperty('--lines', p.clientHeight + 'px');
	});
</script>

<section class:max-md:hidden={$showDetails === 2} class="p-10 max-w-[40rem]">
	<button class="back-button" on:click={() => showDetails.set(0)}>
		<img class="w-5 md:w-8" src="/general/back.svg" alt="" />
	</button>
	<div class="title flex items-center my-5 md:my-10">
		<div class="w-16 md:w-20 aspect-square rounded-lg bg-gray-200">
			<img src="" alt="" />
		</div>
		<h3 class="ml-5 md:text-400">{gig.topic}</h3>
	</div>
	<div class="tags flex my-5 md:my-10 justify-around text-gray-500">
		{#each gigIcons as icon}
			<div class="">
				<img class="w-6 md:w-8 mb-3 mx-auto" src={icon.icon} alt="" />
				<p class="shrink-0 max-md:text-[0.9em]">{icon.text}</p>
			</div>
		{/each}
	</div>
	<div class:less={!showMoreDescription} class:more={showMoreDescription} class="p-holder">
		<div>
			<p class="description text-gray-500 text-justify">{gig.description}</p>
		</div>
	</div>
	<div class="flex justify-end">
		<button on:click={() => toggleDescription()} class="text-primary-300 underline">
			<span class:hidden={!showMoreDescription}>less</span>
			<span class:hidden={showMoreDescription}>more</span>
		</button>
	</div>
	<h3 class="files mt-10 text-400">Files Uploaded:</h3>
	<div class="my-5">
		{#each gig.files as file}
			<div class="flex my-3 justify-between text-gray-500">
				<div class="flex items-center gap-2">
					<img src={file.img} alt="" />
					<p>{file.name}</p>
				</div>
				<p>{file.size}</p>
			</div>
		{/each}
	</div>
	<div class="flex justify-between text-center my-7">
		<div>
			<span class="font-medium">Work modality</span>
			<p class="my-2 text-gray-500">Onsite</p>
		</div>
		<div>
			<span class="font-medium">Payement Structure</span>
			<p class="my-2 text-gray-500">Milestone</p>
		</div>
		<div>
			<spa class="font-medium">Payement Method</spa>
			<p class="my-2 text-gray-500">CCP</p>
		</div>
	</div>
	<h3 class="text-400">Skills & technologies:</h3>
	<div class="flex gap-5 my-3">
		{#each gig.skills as skill}
			<p class="bg-gray-200 text-[0.85em] py-1 px-5 rounded-lg">{skill}</p>
		{/each}
	</div>
</section>

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
