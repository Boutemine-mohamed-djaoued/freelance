<script>
	import { onMount } from 'svelte';
	import { id, token } from '$lib/stores/Session.js';
	import makeQuery from '$lib/util/makeQuery.js';
	import { getTalents } from '$lib/util/queries.js';
	import Card from './components/card.svelte';
	import Slider from './components/slider.svelte';
	let data;
	onMount(async () => {
		try {
			data = await makeQuery(
				getTalents,
				{ talentsId: $id },
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
</script>

<div class="full-width">
	<h2 class="text-center md:text-500 my-5 md:my-10">Discover Our Best Talents</h2>
	{#if data}
		<Slider talents={data?.data?.talents}></Slider>
	{/if}
</div>
