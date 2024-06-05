<script>
	let four = [1, 2, 3, 4];
	let bars = [6, 10, 8, 7, 12, 6, 10, 11, 10, 12, 10, 9, 8, 10, 7];
</script>

<div class="grid-system my-5 md:my-10">
	<div class="main-grid max-md:flex flex-col gap-5 md:gap-10">
		<div class="col-start-1 col-span-3 max-md:order-1">
			<section class="flex gap-5 md:gap-10">
				{#each four as i}
					<div class:max-md:hidden={i >= 3} class="flex w-full bg-white px-4 py-6 rounded-xl items-center">
						<div class="w-full">
							<div class="w-[80%] element mb-5"></div>
							<div class="w-[60%] element"></div>
						</div>
						<div class="w-12 h-12 max-md:hidden animate shrink-0 rounded-full bg-gray-400"></div>
					</div>
				{/each}
			</section>
		</div>
		<div class="col-span-2 max-md:order-3">
			<section class="p-5 rounded-xl bg-white">
				<div class="mb-5 flex justify-between">
					<div class="w-32 element"></div>
					<div class="w-44 element"></div>
				</div>
				{#each four as i}
					<div class="flex justify-between bg-gray-100 p-3 rounded-xl my-2">
						<div>
							<div class="w-40 mb-2 element"></div>
							<div class="w-20 element"></div>
						</div>
						<div>
							<div class="w-28 mb-2 element"></div>
							<div class="w-20 element"></div>
						</div>
					</div>
				{/each}
			</section>
		</div>
		<div class="max-md:order-2">
			<div class="bg-white gap-5 max-md:flex flex-row-reverse justify-between items-center rounded-xl p-3 md:p-5 md:w-[20.5rem] md:h-full">
				<div>
					<div class="w-20 h-12 md:h-20 animate md:mb-5 bg-gray-400 rounded-lg md:rounded-full"></div>
				</div>
				<div class="flex-1">
					<div class="max-md:w-full element mb-2 md:my-2"></div>
					<div class="w-20 element md:my-2"></div>
          <div class="max-md:hidden">
            <div class="element mt-5 mb-2"></div>
            <div class="w-28 element"></div>
            <div class="w-40 element mt-5 mb-2"></div>
            <div class="mt-8 bg-gray-400 h-12 rounded-full animate"></div>
          </div>
				</div>
			</div>
		</div>
		<div class="max-md:order-3">
			<div class="rounded-xl bg-white h-[14rem] md:h-[18rem] md:w-[30rem] flex">
				<div class="flex-1 flex items-center pl-5">
					<div class="w-full relative aspect-square animate bg-gray-400 rounded-full">
						<div class="white"></div>
					</div>
				</div>
				<div class="flex-1 flex flex-col justify-evenly p-5">
					<div class="element"></div>
					<div class="element"></div>
					<div class="element"></div>
					<div class="element"></div>
					<div class="element"></div>
				</div>
			</div>
		</div>
		<div class="col-start-2 col-span-2 flex flex-col max-md:hidden p-5 bg-white rounded-lg">
			<div class="w-40 my-2 element"></div>
			<div class="w-28 element"></div>
			<div class="flex justify-around mt-auto mx-auto gap-5 items-end">
				{#each bars as bar}
					<div style="height : {bar}rem" class="animate-top w-8 bg-gray-400 rounded-lg"></div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	@media (width >= 768px) {
		.main-grid {
			display: grid;
			grid-template-rows: auto auto auto;
			grid-template-columns: auto 1fr auto;
		}
	}
	.element {
		@apply h-4 rounded-lg animate;
	}
	.animate {
		animation: loading 1s linear infinite;
		background-size: 400%;
		background-image: linear-gradient(to right, #f0f0f0 0%, #f0f0f0 30%, #d9d9d9 45%, #d9d9d9 50%, #f0f0f0 60%, #f0f0f0 100%);
	}

	.animate-top {
		animation: loading-top 1s linear infinite;
		background-size: 400% 400%;
		background-image: linear-gradient(to top, #f0f0f0 0%, #f0f0f0 30%, #d9d9d9 45%, #d9d9d9 50%, #f0f0f0 60%, #f0f0f0 100%);
	}

	@keyframes loading {
		0% {
			background-position: 100% 0;
		}
		100% {
			background-position: 0 0;
		}
	}

	@keyframes loading-top {
		0% {
			background-position: 0 0%;
		}
		100% {
			background-position: 0 100%;
		}
	}
	.white::after {
		--offset: 25%;
		position: absolute;
		content: '';
		width: calc(100% - var(--offset));
		height: calc(100% - var(--offset));
		@apply bg-white;
		top: calc(var(--offset) / 2);
		left: calc(var(--offset) / 2);
		border-radius: 50%;
	}
</style>
