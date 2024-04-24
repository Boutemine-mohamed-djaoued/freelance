<script>
	export let gig;
</script>

<button on:click class="card text-left items-center rounded-md gap-3 md:gap-x-5 bg-white p-3 md:p-5 my-3 md:my-5 w-full">
	<div class="shrink-0 w-16 lg:w-20 aspect-square rounded-md bg-gray-200">
		<img src="" alt="" />
	</div>
	<div class="">
		<div class="flex items-center">
			<p>{gig.name}</p>
			<span class="text-[0.8em] mx-2 bg-primary-300 bg-opacity-20 px-2 rounded-sm text-primary-300">New</span>
		</div>
		<h2 class="text-400 font-semibold my-1 md:my-2 text-ellipsis">
			{gig.topic}
		</h2>
	</div>
	<div class="col-start-1 lg:col-start-2 col-end-3">
		<div class="flex max-md:gap-2 justify-around text-gray-500">
			<div class="flex flex-1 max-md:hidden">
				<img class="w-5 mr-1" src="/general/MapPinLine.svg" alt="" />
				<p class="shrink-0">{gig.location}</p>
			</div>
			<div class="flex flex-1">
				<img class="w-5 mr-1" src="/general/Clock.svg" alt="" />
				<p class="shrink-0">{gig.paimentMethod}</p>
			</div>
			<div class="flex flex-1">
				<img class="w-5 mr-1" src="/general/CurrencyDollar.svg" alt="" />
				<p class="shrink-0">{gig.price}</p>
			</div>
			<div class="flex flex-1">
				<img class="w-5 mr-1" src="/general/CalendarBlank.svg" alt="" />
				<p class="shrink-0">{gig.time}</p>
			</div>
		</div>
		<p class="text-gray-500 my-4">{gig.description}</p>
	</div>
</button>

<style>
	.card {
		display: grid;
		grid-template-columns: min-content auto;
		grid-template-rows: auto auto;
	}
</style>
