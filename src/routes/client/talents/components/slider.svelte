<script>
	import { onMount } from 'svelte';
	import Swiper from 'swiper';
	import { Navigation } from 'swiper/modules';
	import 'swiper/css/bundle';
	import Card from './card.svelte';
	let categorySwipers = [null, null, null, null];
	let categories = ['Web design', 'Voice acting', 'Graphic design', 'Content writing'];
	export let talents;
	onMount(() => {
		if (!talents) return;
		for (let i = 0; i < talents.length; i++) {
			categorySwipers[i] = new Swiper('.swiper-container-' + i, {
				modules: [Navigation],
				direction: 'horizontal',
				loop: true,
				slidesPerView: 1.15,
				spaceBetween: 20,
				breakpoints: {
					768: {
						slidesPerView: 2
					},
					1080: {
						slidesPerView: 3
					},
					1280: {
						slidesPerView: 4
					}
				},
				navigation: {
					nextEl: '.swiper-button-next' + i,
					prevEl: '.swiper-button-prev' + i
				}
			});
		}
		console.log(categorySwipers);
		console.log('hello');
	});
</script>

<section class="full-width isolate overflow-x-clip max-sm:after:hidden max-md:before:hidden min-h-[25rem]">
	{#if talents}
		{#each talents as talent, i}
			<div class="grid-system">
				<h3 class="md:text-400 mb-3">Out Best At {talent.name}</h3>
			</div>
			<div class="relative grid-system full-width">
				<div class="bar"></div>
				<div class="full-width2 relative">
					<div class={`swiper swiper-container-${i} md:w-full`}>
						<div class="swiper-wrapper py-5 max-md:px-5">
							{#if talent.freelancers}
								{#each talent.freelancers as freelancer, i}
									<div class="swiper-slide">
										<Card cardInfo={freelancer} />
									</div>
								{/each}
							{/if}
						</div>
					</div>
					<div class={`top-1/2 -translate-y-1/2 swiper-button-next${i} -left-10 lg:-left-16 absolute max-md:hidden bg-black rounded-full`}>
						<img class="w-10 rotate-180" src="/general/white-arrow.svg" alt="" />
					</div>
					<div class={`top-1/2 -translate-y-1/2 -right-10 lg:-right-16 swiper-button-prev${i} absolute max-md:hidden bg-black rounded-full`}>
						<img class="w-10" src="/general/white-arrow.svg" alt="" />
					</div>
				</div>
			</div>
		{/each}
	{/if}
</section>

<style>
	.full-width2 {
		grid-column: full-width;
	}
	@media (max-width: 640px) {
		.swiper-button-next::after,
		.swiper-button-prev::after {
			content: '';
		}
	}
	@media (min-width: 767px) {
		.full-width2 {
			grid-column: content;
		}
	}
	/* horisontal black bar */
	.bar::after {
		content: '';
		z-index: -1;
		width: 100vw;
		height: 4rem;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		/* @apply md:bg-off-black; */
	}
</style>
