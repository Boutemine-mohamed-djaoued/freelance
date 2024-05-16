<script>
	import GigCard from '$lib/components/ui/GigCard.svelte';
	import { fly } from 'svelte/transition';
	let gig = {
		clientInfo: {
			firstName: 'abdoo',
			lastName: 'chappa'
		},
		title: 'goat Milker',
		createdAt: '2024-5-20',
		expertize_level: 'Entry',
		payment_structure: 'By_Project',
		price: '2000',
		deadline: '2004-20-3',
		description: 'chappa chappa chappa chappa chappa chappa chappa chappa chappa chappa '
	};
</script>

<div in:fly={{ x: 100, duration: 300 }}>
	<div class="max-md:hidden">
		<h2 class="md:text-400 mb-3 md:mb-5">Preview</h2>
		<div class="h-[0.2rem] bg-gray-200" />
	</div>
	<GigCard {gig}></GigCard>
</div>
