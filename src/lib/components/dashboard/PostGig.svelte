<script>
	export let type;
</script>

<div class="bg-white max-md:flex justify-between items-center rounded-xl p-5 md:max-w-[20.5rem]">
	<div class="-ml-4 max-md:hidden">
		<img src="/dashboard/fingerPrint.svg" alt="" />
	</div>
	{#if type == 'client'}
		<h2 class="md:text-400 md:mt-3">Fulfill your desires and create a job today</h2>
		<p class="text-gray-400 max-md:hidden">Discover our best talent and work with em</p>
		<a href="/client/createGig" class="bg-primary-300 min-w-fit text-white font-medium block text-center rounded-lg md:rounded-full p-3 md:mt-3">Post Job</a>
	{:else if type == 'freelancer'}
		<h2 class="md:text-400 md:mt-3">Fulfill your desires and get noticed today</h2>
		<p class="text-gray-400 max-md:hidden">post your facsniating work on our landing page</p>
		<a href="/client/createGig" class="bg-primary-300 min-w-fit text-white font-medium block text-center rounded-lg md:rounded-full p-3 md:mt-3">Post work</a>
	{/if}
</div>
