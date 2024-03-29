<script>
	import GigCard from '$lib/components/ui/GigCard.svelte';
	import { fly } from 'svelte/transition';
	let gig = {
		title: 'title',
		description: 'description',
		price: 100,
		location: 'location',
		time: 'time',
		category: 'category',
		experience: 'experience',
		job: 'job',
		payment: 'payment',
		method: 'method',
		boost: 'boost',
		rate: 0,
		files: []
	};
</script>

<div in:fly={{ x: 100, duration: 300 }}>
	<div class="max-md:hidden">
		<h2 class="md:text-400 mb-3 md:mb-5">Preview</h2>
		<div class="h-[0.2rem] bg-gray-200" />
	</div>
	<GigCard {gig}></GigCard>
</div>
