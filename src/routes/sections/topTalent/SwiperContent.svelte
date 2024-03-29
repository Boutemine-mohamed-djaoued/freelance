<script>
	import ImageSlide from './ImageSlide.svelte';
	import TextSwiper from './TextSwiper.svelte';
	export let topTalents;
	export let attribute;
	export let type;
</script>

<div class="swiper-wrapper max-md:aspect-square">
	{#if topTalents}
		{#each topTalents as topTalent}
			{#if type === 'image'}
				<ImageSlide url={topTalent[attribute]}></ImageSlide>
			{:else if type === 'text'}
				<TextSwiper {topTalent}></TextSwiper>
			{/if}
		{/each}
	{/if}
</div>

<style>
</style>
