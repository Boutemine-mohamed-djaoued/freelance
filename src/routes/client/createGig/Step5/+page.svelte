<script>
	import GigCard from '$lib/components/ui/GigCard.svelte';
	import { fly } from 'svelte/transition';
	import { createGigData } from '$lib/stores/CreateGig.js';
	import { user } from '$lib/stores/Session.js';
	let gig = {
		clientInfo: {
			firstName: $user.firstName,
			lastName: $user.lastName
		},
		title: $createGigData.gigData.title,
		createdAt: $createGigData.gigData.createdAt,
		expertize_level: $createGigData.gigData.expertize_level,
		payment_structure: $createGigData.gigData.payment_structure,
		price: $createGigData.gigData.price,
		deadline: $createGigData.gigData.deadline,
		description: $createGigData.gigData.description
	};
</script>

<div in:fly={{ x: 100, duration: 300 }}>
	<div class="max-md:hidden">
		<h2 class="md:text-400 mb-3 md:mb-5">Preview</h2>
		<div class="h-[0.2rem] bg-gray-200" />
	</div>
	<GigCard {gig}></GigCard>
</div>
