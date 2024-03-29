<script>
	import LandingPage from './sections/LandingPage.svelte';
	import TopTalent from './sections/topTalent/TopTalent.svelte';
	import Categories from './sections/Categories.svelte';
	import WhyUs from './sections/WhyUs.svelte';
	import HearThen from './sections/HearThen.svelte';
	import Footer from '../lib/layout/Footer.svelte';
	import { fly } from 'svelte/transition';
</script>

<div class="full-width grid-system" transition:fly={{ y: 100, duratin: 300 }}>
	<LandingPage></LandingPage>
	<TopTalent></TopTalent>
	<Categories></Categories>
	<WhyUs></WhyUs>
	<HearThen></HearThen>
	<Footer></Footer>
</div>
