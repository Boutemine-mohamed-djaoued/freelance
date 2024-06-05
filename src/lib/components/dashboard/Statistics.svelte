<script>
	export let money;
	export let postedJobs;
	export let activeJobs;
	export let completedJobs;
	export let proposals;
	export let type;
</script>

<section class="flex gap-5 md:gap-10">
	<div class="!bg-primary-300 text-white justify-between">
		<div>
			<p>{ type == "client" ? "Money Spent" : "Money Made"}</p>
			<p class="text-nowrap">{money} DA</p>
		</div>
		<div>
			<img class="max-lg:hidden" src="/dashboard/line.svg" alt="" />
		</div>
	</div>
	<div class="max-md:!hidden justify-between">
		{#if type === 'client'}
			<div>
				<p>Jobs Posted</p>
				<p>{postedJobs}</p>
			</div>
		{:else if type === 'freelancer'}
			<div>
				<p>Proposals</p>
				<p>{proposals || 0}</p>
			</div>
		{/if}
		<div>
			<img class="max-lg:hidden" src="/dashboard/bigChart.svg" alt="" />
		</div>
	</div>
	<div>
		<div class="max-lg:hidden">
			<img src="/dashboard/chart.svg" alt="" />
		</div>
		<div class="">
			<p>Active Jobs</p>
			<p>{activeJobs}</p>
		</div>
	</div>
	<div class="max-lg:!hidden">
		<div>
			<img src="/dashboard/check.svg" alt="" />
		</div>
		<div>
			<p>Jobs Completed</p>
			<p>{completedJobs}</p>
		</div>
	</div>
</section>

<style>
	section > div {
		@apply flex items-center flex-1 p-3 md:p-5 bg-white rounded-xl;
	}
	section div p:nth-child(2) {
		@apply text-500 font-medium;
	}
	section div:nth-child(n + 2) p:first-child {
		@apply text-gray-400;
	}
	section > div:nth-child(n + 3) div:first-child {
		@apply bg-gray-100 p-4 mr-5 rounded-full;
	}
</style>
