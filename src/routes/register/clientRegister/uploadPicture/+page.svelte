<script>
	import { onMount } from 'svelte';
	import LeftSide from '$lib/components/register/LeftSide.svelte';
	import MainBtn from '$lib/components/ui/MainButton.svelte';
	import { fly, fade } from 'svelte/transition';
	import { MB } from '$lib/util/consts';

	let link;
	let fileInput;

	let formData = new FormData();
	onMount(() => {
		fileInput.addEventListener('change', async () => {
			formData.append('file', fileInput.files[0]);
			console.log('loading... zntit');
			link = await getFileLink();

			console.log(link);
		});
	});
	const getFileLink = async () => {
		try {
			const response = await fetch(`${MB}/upload`, {
				method: 'POST',
				'content-type': 'multipart/form',
				headers: {
					Authorization: 'mok'
				},
				body: formData
			});
			let link = (await response.json()).filepath;
			console.log(link);
			sessionStorage.picture = link;
			formData = new FormData();
			return link;
		} catch (error) {
			console.error(error);
			alert('failed to upload file');
		}
	};
	let selectedFile = null;

	// let flyParams;
	// const handleResize = () => {
	//     if (window.innerWidth <= 1024) {
	//       flyParam s = { x: 100 };
	//     } else {
	//       flyParams = { y: 100 };
	//     }
	//   }
	onMount(() => {
		// handleResize();
	});
	function fileSelect(e) {
		const url = URL.createObjectURL(e.target.files[0]);
		sessionStorage.picture = JSON.stringify(url);
		selectedFile = url;
	}
</script>

<div class="flex full-width h-[100vh] bg-transparent max-lg:flex-col max-lg:">
	<LeftSide number="4"></LeftSide>
	<div class="lg:hidden image h-[40%]"></div>
	<div class="mx-auto my-auto flex justify-center items-center gap-5 overflow-hidden">
		<div class="circle lg:h-[min(50vw,100vh)] lg:w-[min(50vw,100vh)] h-[100vw] w-[100vw]">
			<h1 class="font-medium absolute top-[20%] text-400 2xl:text-600">Upload your profile picture</h1>
			<div class="circle-inner relative">
				<div class="flex gap-4 items-center absolute bottom-[8%]">
					{#if selectedFile}
						<a href="/register/clientRegister/finishProfile">
							<MainBtn title="Continue" customClass="btn-1" type="submit" />
						</a>
						<a href="/register/clientRegister/aboutClient" class="text-[#BE2AB1] font-semibold"> Back </a>
					{:else}
						<MainBtn title="Continue" customClass="btn-1" type="" />
						<a href="/register/clientRegister/aboutClient" class="text-[#BE2AB1] font-semibold"> Back </a>
					{/if}
				</div>
				<div class="circle-inner-inner">
					<label for="userImage" class="w-fit h-fit">
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<img src={selectedFile || '/register/UserImage.png'} alt="user-image" class="rounded-full cursor-pointer w-[170px] h-[170px] bg-white" />
					</label>
					<input type="file" name="user-image" id="userImage" accept=".png, .jpg, .jpeg" capture class="hidden" required on:change={fileSelect} bind:this={fileInput} />
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	* {
		font-family: 'DM Sans', sans-serif;
	}
	.image {
		background-image: url('/register/RectangleSmall.png');
		background-size: cover;
		background-position: center bottom;
	}
	.circle {
		border-radius: 50%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		animation: colorTransition 1s infinite;
	}

	.circle-inner {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		animation: colorTransition2 1s infinite;
    background-color: #8d00bb05;
	}

	.circle-inner-inner {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		animation: colorTransition3 1s infinite;
    background-color: #8d00bb05;
	}

	/* .circle-inner-inner-inner {
      width: 80%;
      height: 80%;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 4;
      animation: colorTransition4 5s infinite alternate;
      background-color: #8d00bb05;
    } */

	@keyframes colorTransition {
		0% {
			background-color: #8d00bb03;
		}
		50% {
			background-color: #8d00bb0d;
		}
		100% {
			background-color: #8d00bb05;
		}
	}
	@keyframes colorTransition2 {
		0% {
			background-color: #8d00bb05;
		}
		50% {
			background-color: #8d00bb03;
		}
		100% {
			background-color: #8d00bb0d;
		}
	}
	@keyframes colorTransition3 {
		0% {
			background-color: #8d00bb0d;
		}
		50% {
			background-color: #8d00bb05;
		}
		100% {
			background-color: #8d00bb03;
		}
	}
</style>
