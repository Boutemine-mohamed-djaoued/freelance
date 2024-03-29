<script>
	import { onMount } from 'svelte';
	import SwiperContent from './SwiperContent.svelte';
	import Swiper from 'swiper/bundle';
	import 'swiper/css/bundle';
	import { Navigation } from 'swiper/modules';
	let topTalents = [
		{
			profileImg: 'home/topTalent/profileImg2.png',
			name: 'Michael Scofield',
			bio: "Web Developer 🚀 | Turning ideas into interactive websites 💻 | Coding wizard with HTML, CSS, and JavaScript ⚡ | Crafting digital experiences that stand out! 🎨 | Let's build something amazing together!",
			pr1: '/home/topTalent/pr1.png',
			pr2: '/home/topTalent/pr2.png',
			pr3: '/home/topTalent/pr33.png',
			pr4: '/home/topTalent/pr4.png'
		},
		{
			profileImg: 'home/topTalent/profileImg3.jpg',
			name: 'Alex Swift',
			bio: 'UI/UX virtuoso renowned for weaving digital wonders. With a meticulous blend of precision, creative flair, and an unwavering commitment to user delight, Alex navigates the design realm, shaping immersive and intuitive experiences. His expertise extends beyond aesthetics, delving into the very essence of user interaction. In collaboration with cross-functional teams, Alex not only envisions but materializes concepts that resonate with users, setting a benchmark for exceptional design. Welcome to the world of Alex Swift, where innovation meets elegance in the ever-evolving landscape of UI/UX design. 🌐✨',
			pr1: '/home/topTalent/pr3.1.png',
			pr2: '/home/topTalent/pr1.1.png',
			pr3: '/home/topTalent/pr2.1.png',
			pr4: '/home/topTalent/pr4.1.png'
		}
	];
	let swipers = [];
	onMount(() => {
		for (let i = 1; i <= 6; i++) {
			swipers[i] = new Swiper(`.swiper-container-${i}`, {
				modules: [Navigation],
				effect: 'fade',
				crossFade: 'true',
				direction: 'horizontal',
				spaceBetween: 40,
				allowTouchMove: false,
				speed: 1000,
				loop: true,
				navigation: {
					nextEl: '.swiper-button-next-talent',
					prevEl: '.swiper-button-prev-talent'
				}
			});
			// Handle keyboard events for the next and pre button

			var nextButton = document.querySelector('.swiper-button-next-talent');
			var prevButton = document.querySelector('.swiper-button-prev-talent');

			prevButton.addEventListener('keydown', function (event) {
				if (event.key === 'Enter') {
					swipers[i].slidePrev();
				}
			});

			nextButton.addEventListener('keydown', function (event) {
				if (event.key === 'Enter') {
					swipers[i].slideNext();
				}
			});
		}
	});
</script>

<section class="wrapper py-5 md:py-10 bg-gray-100 relative isolate overflow-x-clip">
	<h2 class="text-600 md:text-700 font-bold mb-2 md:mb-4">
		Top <span class="text-primary-300">Talent</span>&nbsp; :
	</h2>
	<div class="md:grid grid-layout max-lg:flex justify-center relative mx-10 max-md:gap-3 max-md:mx-4 md:gap-3 xl:gap-5">
		<div class="swiper swiper-container-1 w-full max-lg:flex-1 max-md:aspect-square col-span-1 row-span-2">
			<SwiperContent {topTalents} attribute="profileImg" type="image"></SwiperContent>
		</div>
		<div class="swiper swiper-container-2 max-md:flex-1 col-span-1 row-start-3 row-span-2">
			<SwiperContent {topTalents} attribute="not necessary" type="text"></SwiperContent>
		</div>
		<div class="swiper swiper-container-3 col-start-2 col-span-2 row-span-1">
			<SwiperContent {topTalents} attribute="pr1" type="image"></SwiperContent>
		</div>
		<div class="swiper swiper-container-4 col-start-2 row-start-2 row-span-2">
			<SwiperContent {topTalents} attribute="pr2" type="image"></SwiperContent>
		</div>
		<div class="swiper swiper-container-5 col-star-2 row-start-4">
			<SwiperContent {topTalents} attribute="pr3" type="image"></SwiperContent>
		</div>
		<div class="swiper swiper-container-6 col-start-3 row-start-2 row-span-3">
			<SwiperContent {topTalents} attribute="pr4" type="image"></SwiperContent>
		</div>
		<div class="work max-md:hidden my-auto font-bold text-white text-500 xl:text-600 text-nowrap col-span-1 row-span-4">
			<div class="w-fit rotate-90 bg-black py-3 md:px-20 xl:px-28 relative md:right-24 xl:right-36">
				My <span class="text-primary-300">work</span>
			</div>
		</div>
		<button class="swiper-button-prev-talent absolute translate-y-[-50%] top-[50%] -left-[1.75rem] md:-left-[4rem]">
			<img class="max-md:w-5 rotate-180" src="/home/topTalent/arrow.svg" alt="" />
		</button>
		<button class="swiper-button-next-talent absolute translate-y-[-50%] top-[50%] -right-[1.75rem] md:-right-[3.5rem] rotate-180">
			<img class="max-md:w-5 rotate-180" src="/home/topTalent/arrow.svg" alt="" />
		</button>
	</div>
	<button class="mx-auto mt-5 md:my-5 text-center w-[min(45vw,50rem)] text-300 sm:text-500 xl:text-600 font-bold py-2 lg:py-3 text-white bg-off-black">
		Contact <span class="text-primary-300">Michael</span> !
	</button>
</section>

<style>
	.grid-layout > div:nth-child(n + 3) {
		@apply max-md:hidden;
	}
	.grid-layout > div {
		@apply w-full rounded-2xl;
	}
	.grid-layout .swiper-slide {
		@apply bg-no-repeat bg-cover bg-center bg-gray-200;
	}
	section::after {
		content: '';
		z-index: -1;
		width: 100vw;
		height: clamp(4rem, 10vw, 9rem);
		position: absolute;
		left: 0;
		top: 45%;
		transform: translateY(-6.2vw);
		@apply bg-off-black;
	}
	section::before {
		content: '';
		z-index: -1;
		height: 100vh;
		width: clamp(5rem, 10vw, 9rem);
		position: absolute;
		left: 50%;
		top: -100vh;
		transform: translateX(-50%);
		@apply bg-gray-100 md:hidden;
	}
	.work > div {
		box-shadow: 0 0 15px 10px #ffffff45;
	}
	@media (min-width: 768px) {
		.grid-layout {
			aspect-ratio: 3/1;
			grid-template-columns: 26% 39% 22% 7%;
			grid-template-rows: 59% 12% 20% 47%;
		}
		section::after {
			top: 40%;
			transform: translateY(0);
		}
	}
</style>
