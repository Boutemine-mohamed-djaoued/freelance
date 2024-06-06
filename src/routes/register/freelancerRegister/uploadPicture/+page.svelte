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

	// import 'cropperjs/dist/cropper.css';
	// import Cropper from 'cropperjs';
	let cropper;
	// onMount(() => {
	//   const image = document.getElementById('image');
	//   cropper = new Cropper(image, {
	//     aspectRatio: 10 / 9,
	//     crop(event) {
	//       console.log(event.detail.x);
	//       console.log(event.detail.y);
	//       console.log(event.detail.width);
	//       console.log(event.detail.height);
	//       console.log(event.detail.rotate);
	//       console.log(event.detail.scaleX);
	//       console.log(event.detail.scaleY);
	//     }
	//   });
	// });
	// function cropImage() {
	//   const croppedCanvas = cropper.getCroppedCanvas();
	//   const croppedImageDataUrl = croppedCanvas.toDataURL();

	//   // Create a temporary link element to trigger the download
	//   const link = document.createElement('a');
	//   link.href = croppedImageDataUrl;
	//   link.download = 'cropped_image.png';
	//   document.body.appendChild(link);
	//   link.click();
	//   document.body.removeChild(link);
	// }
	function change(e) {
		fileSelect(e);
		// cropImage();
	}
	function fileSelect(e) {
		const url = URL.createObjectURL(e.target.files[0]);
		selectedFile = url;
	}
</script>

<div class="flex full-width h-[100vh] bg-transparent max-lg:flex-col max-lg:">
	<LeftSide number="4"></LeftSide>
	<div class="lg:hidden image h-[40%]"></div>
	<div class="mx-auto my-auto flex justify-center items-center gap-5 overflow-hidden">
		<div class="circle lg:h-[min(50vw,100vh)] lg:w-[min(50vw,100vh)] max-lg:h-[min(100vw,60vh)] max-lg:w-[min(100vw,60vh)]">
			<h1 class="font-medium absolute top-[20%] max-sm:top-[15%] text-400 2xl:text-600 2xl:top-[27%] xl:text-500 lg:text-400">Upload your profile picture</h1>
			<div class="circle-inner relative">
				<div class="flex gap-4 items-center absolute bottom-[8%] max-sm:bottom-0 max-lg:bottom-[12%] xl:bottom-[15%] 2xl:bottom-[20%]">
					{#if selectedFile}
						<a href="/register/freelancerRegister/finishProfile">
							<MainBtn title="Continue" customClass="btn-1" type="submit" />
						</a>
						<a href="/register/freelancerRegister/aboutFreelancer" class="text-[#BE2AB1] font-semibold"> Back </a>
					{:else}
						<MainBtn title="Continue" customClass="btn-1" type="submit" />
						<a href="/register/freelancerRegister/aboutFreelancer" class="text-[#BE2AB1] font-semibold"> Back </a>
					{/if}
				</div>
				<div class="circle-inner-inner">
					<label for="userImage" class="w-fit h-fit">
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<img src={selectedFile || '/register/UserImage.png'} alt="user-image" id="image" class="rounded-full cursor-pointer w-[170px] h-[170px] bg-white" />
					</label>
					<input type="file" name="user-image" id="userImage" accept=".png, .jpg, .jpeg" capture class="hidden moncef" required on:change={change} bind:this={fileInput} />
				</div>
			</div>
			<!-- <div class="flex gap-4 items-center absolute bottom-[15%]">
        {#if selectedFile}
          <a href="/register/freelancerRegister/finishProfile">
            <MainBtn title="Continue" customClass="btn-1" type="submit" />
          </a>
          <a
            href="/register/freelancerRegister/aboutFreelancer"
            class="text-[#BE2AB1] font-semibold"
          >
            Back
          </a>
        {:else}
          <MainBtn title="Continue" customClass="btn-1" type="submit" />
          <a
            href="/register/freelancerRegister/aboutFreelancer"
            class="text-[#BE2AB1] font-semibold"
          >
            Back
          </a>
        {/if}
      </div> -->
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
	}

	.circle-inner-inner {
		width: 60%;
		height: 60%;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		animation: colorTransition3 1s infinite;
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
	/* @keyframes colorTransition4 {
    0% {
      background-color: #e74c3c;
    }
    50% {
      background-color: #f39c12;
    }
    100% {
      background-color: #3498db;
    }
  } */
</style>
