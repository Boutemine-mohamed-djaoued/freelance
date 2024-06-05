<script>
	import { showDetails, showFilters } from '$lib/stores/FeedState.js';
	import ApplyToGig from './sections/ApplyToGig.svelte';
	import ContactUs from './sections/ContactUs.svelte';
	import MoreGigDetails from './sections/MoreGigDetails.svelte';
	import Feed from './sections/Feed.svelte';
	import Filters from './sections/Filters.svelte';
	import SearchSection from './sections/SearchSection.svelte';
	import UploadCv from './sections/UploadCV.svelte';
	import fetchData from '$lib/util/data.js';
	import { onMount } from 'svelte';
	onMount(async () => {
		// const data = await fetchData();
		// console.log(data);
	});
</script>

<div class="grid-system">
	<SearchSection></SearchSection>
	<div class="flex pt-5">
		<div class="filters relative z-20 max-md:absolute max-md:h-[calc(100vh-3.5rem)] max-md:w-full overflow-y-auto max-md:top-[3.5rem] left-0 md:min-w-fit lg:min-w-[15rem]" class:hide-filters={!$showFilters}>
			<Filters></Filters>
		</div>
		<div class="flex flex-col justify-between flex-1">
			<Feed></Feed>
		</div>
		<div class="max-xl:hidden w-[18rem] ml-auto">
			<ContactUs></ContactUs>
			<UploadCv></UploadCv>
		</div>
	</div>
</div>
<div class:off-screen-right={!$showDetails} class:in-screen-right={$showDetails} class="details bg-white absolute top-[3.6rem] h-[calc(100vh-3.6rem)] md:top-[5rem] md:h-[calc(100vh-5rem)] z-[999]">
	<div class="md:flex overflow-y-auto h-[calc(100vh-3.6rem)] md:h-[calc(100vh-5rem)] border-t-2">
		<div>
			<MoreGigDetails></MoreGigDetails>
		</div>
		<div class="shrink-0">
			<ApplyToGig></ApplyToGig>
		</div>
	</div>
</div>

<style>
	.details {
		transition: transform 0.7s ease;
	}

	::-webkit-scrollbar {
		width: 5px;
	}
	::-webkit-scrollbar-track {
		background: transparent;
	}

	::-webkit-scrollbar-thumb {
		@apply bg-primary-300;
		border-radius: 20px;
	}
	@media (width < 768px) {
		.details,
		.filters {
			transition: transform 0.5s ease;
		}
		.filters {
			overflow-y: scroll;
		}
		.hide-filters {
			transform: translateX(-100%);
		}
		::-webkit-scrollbar {
			width: 5px;
		}
	}
	.in-screen-right {
		transform: translateX(calc(100vw - 100%));
	}
	.off-screen-right {
		transform: translateX(100vw);
	}
</style>
