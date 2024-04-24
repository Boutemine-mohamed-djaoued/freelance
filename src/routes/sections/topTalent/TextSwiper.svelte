<script>
	export let topTalent;
</script>

<div class="swiper-slide bg-white rounded-xl">
	<div class="inline-size bg-white rounded-xl p-2 md:p-4 bg-opacity-90">
		<h3 class="font-bold text-[8cqi] text-center">
			{topTalent.name}
		</h3>
		<p class="text-[8cqi] 2xl:text-400 truncate-text-7">{topTalent.bio}</p>
	</div>
</div>

<style>
	.inline-size {
		container-type: inline-size;
	}
</style>
