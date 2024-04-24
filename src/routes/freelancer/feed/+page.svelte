<script>
	import { showDetails, showFilters } from '$lib/stores/FeedState.js';
	import ApplyToGig from './sections/ApplyToGig.svelte';
	import ContactUs from './sections/ContactUs.svelte';
	import MoreGigDetails from './sections/MoreGigDetails.svelte';
	import Feed from './sections/Feed.svelte';
	import Filters from './sections/Filters.svelte';
	import SearchSection from './sections/SearchSection.svelte';
	import UploadCv from './sections/UploadCV.svelte';
	import NavigateGigs from './sections/NavigateGigs.svelte';
</script>

<div class="grid-system">
	<SearchSection></SearchSection>
	<div class="flex pt-5">
		<div class="filters relative z-20 max-md:absolute max-md:h-[calc(100vh-3.5rem)] max-md:w-full overflow-y-auto max-md:top-[3.5rem] left-0 md:min-w-fit lg:min-w-[15rem]" class:hide-filters={!$showFilters}>
			<Filters></Filters>
		</div>
		<div>
			<Feed></Feed>
			<NavigateGigs></NavigateGigs>
		</div>
		<div class="max-xl:hidden w-[18rem]">
			<ContactUs></ContactUs>
			<UploadCv></UploadCv>
		</div>
	</div>
</div>
<div class:off-screen-right={$showDetails === 0} class:in-screen-right={$showDetails === 1} class:in-screen-left={$showDetails === 2} class="details bg-white absolute top-[5rem] h-[calc(100vh-5rem)] z-[99999] full-width">
	<div class="md:flex overflow-y-auto h-[calc(100vh-5rem)] border-t-2">
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
		transition: transform 1s ease;
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
	}
	.in-screen-right {
		transform: translateX(calc(100vw - 100%));
	}
	.off-screen-right {
		transform: translateX(100vw);
	}
	.in-screen-left {
		transform: translateX(0);
	}
</style>
