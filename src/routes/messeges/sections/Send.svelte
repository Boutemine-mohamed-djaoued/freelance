<script>
	import Loading from '$lib/components/ui/Loading.svelte';
	import { id2 } from '$lib/stores/Session.js';
	import { chatRoom } from '$lib/stores/messeges.js';
	import { MS, MB } from '$lib/util/consts.js';
	import { onMount } from 'svelte';
	let fileInput;
	let textInput;
	let textMessage;
	let selecedFileName = '';
	let recording = false;
	let formData = new FormData();
	let recorder;
	let chunks = [];
	let counter = 0;
	let counterInterval
	let textAudio;
	let thereIsAudio = false;
	let sending = false;
	const sendMessage = async () => {
		if (sending) return;
		sending = true;
		let message;
		let type;
		if (thereIsAudio) {
			type = 'audio';
			console.log(type);
			message = await getFileLink();
		} else if (fileInput.files.length) {
			formData.append('file', fileInput.files[0]);
			message = await getFileLink();
			if (fileInput.files[0].type.startsWith('image')) {
				type = 'image';
			} else if (fileInput.files[0].type.startsWith('audio')) {
				type = 'audio';
			} else if (fileInput.files[0].type.startsWith('video')) {
				type = 'video';
			} else {
				type = 'file';
			}
		} else {
			if (!textMessage) {
				sending = false;
				return;
			}
			message = textMessage;
			type = 'text';
		}

		try {
			if (!message) {
				sending = false;
				return;
			}
			const response = await fetch(`${MS}/room/${$chatRoom._id}/message`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'mok'
				},
				body: JSON.stringify({
					message: message,
					type: type,
					senderId: id2
				})
			});
			const data = await response.json();
			if (!data.success) {
				throw data.error;
			}
		} catch (error) {
			console.log(error);
			alert('failed to send message');
		}
		if (type === 'text') {
			textMessage = null;
		} else {
			unFreezeInput();
			selecedFileName = '';
			fileInput.value = '';
			thereIsAudio = false;
		}
		message = null;
		type = null;
		sending = false;
	};
	const freezeInupt = () => {
		textInput.disabled = true;
		textInput.placeholder = '';
	};
	const unFreezeInput = () => {
		textInput.disabled = false;
		textInput.placeholder = 'send a message';
	};
	const setUpAudio = () => {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices
				.getUserMedia({
					audio: true
				})
				.then(setUpStream)
				.catch((error) => {
					console.error(error);
				});
		} else {
			console.log('you cant recrod');
		}
	};
	const setUpStream = (stream) => {
		recorder = new MediaRecorder(stream);
		recorder.ondataavailable = (e) => chunks.push(e.data);
		recorder.onstop = (e) => {
			const blob = new Blob(chunks, { type: 'audio/wav' });
			chunks = [];
			const file = new File([blob], 'example.txt', { type: 'audio/wav' });
			formData.append('file', file);
		};
	};
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
			formData = new FormData();
			return link;
		} catch (error) {
			console.error(error);
			alert('failed to upload file');
		}
	};
	const startRecording = () => {
		recording = true;
		counter = 0;
		counterInterval = setInterval(() => {
			counter++;
		}, 1000);
		recorder.start();
	};
	const endRecording = async () => {
		recording = false;
		clearInterval(counterInterval);
		recorder.stop();
		thereIsAudio = true;
		setTimeout(async () => {
			await sendMessage();
		}, 0);
	};
	const cancelRecording = () => {
		recording = false;
		clearInterval(counterInterval);
		recorder.stop();
		setTimeout(() => {
			formData = new FormData();
		}, 0);
	};
	onMount(() => {
		setUpAudio();
		fileInput = document.querySelector('.file-input');
		textInput = document.querySelector('.text-input');
		fileInput.addEventListener('change', () => {
			let filePath = fileInput.value;
			let fakePathIndex = filePath.indexOf('C:\\fakepath\\');
			let additionalWords = filePath.substring(fakePathIndex + 'C:\\fakepath\\'.length);
			selecedFileName = additionalWords.trim();
		});
		fileInput.addEventListener('change', freezeInupt);
		document.addEventListener('keydown', function (event) {
			if (event.key === 'Enter') {
				sendMessage();
			}
		});
	});
</script>

<div class="send absolute -bottom-10 isolate py-3 mb-8 md:mb-7">
	<div class="bg-white rounded-xl flex items-center py-2 md:py-4">
		<label class="mx-2 relative shrink-0 hover:cursor-pointer" for="files">
			<img src="/messeges/file.svg" alt="" />
		</label>
		<input class="file-input w-0" type="file" id="files" />
		<div class="w-full">
			<div class="selected absolute rounded-full p-1 mx-3 underline">{selecedFileName}</div>
			<input class="text-input min-w-0 border-none focus:ring-0 bg-gray-100 rounded-2xl w-full" placeholder="send a message" type="text" bind:value={textMessage} />
		</div>
		<button class:hidden={recording} on:click={() => startRecording()} class="mx-2 shrink-0">
			<img src="/messeges/Voice.svg" alt="" />
		</button>
		<div class:hidden={!recording} class="relative">
			<button on:click={() => cancelRecording()} class="cancel bg-primary-300 bg-opacity-25 rounded-full w-7 p-2">
				<img class="" src="/general/close.png" alt="" />
			</button>
			<button on:click={() => endRecording()} class="relative isolate min-w-5 mx-2 shrink-0">
				{counter}s
				<div class="waving-1"></div>
				<div class="waving-2"></div>
				<div class="waving-3"></div>
			</button>
		</div>
		<div>
			<button on:click={() => sendMessage()} class="mx-2 shrink-0 flex items-center">
				{#if sending}
					<div class="loader"></div>
				{:else}
					<img class="w-7 md:w-6" src="/messeges/Send.svg" alt="" />
				{/if}
			</button>
		</div>
	</div>
</div>

<style>
	.send {
		--margin: 2.5rem;
		margin-left: calc(var(--margin) / 2);
		width: calc(100% - var(--margin));
	}
	.selected {
		top: 50%;
		transform: translate(0, -50%);
	}

	.waving-1,
	.waving-2,
	.waving-3 {
		position: absolute;
		width: 150%;
		aspect-ratio: 1;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: rgba(164, 79, 217, 0.3); /* Adjust color and opacity as needed */
		border-radius: 50%;
		z-index: -1;
	}

	.waving-1 {
		animation: wave 2s infinite;
	}
	.waving-2 {
		animation: wave 2s 0.5s infinite reverse;
	}

	.cancel {
		position: absolute;
		top: -3.5rem;
		left: 50%;
		transform: translate(-50%, 0);
	}
	@keyframes wave {
		0% {
			width: 150%;
			opacity: 1;
		}
		100% {
			width: 350%;
			opacity: 0;
		}
	}

	@media (width < 768px) {
		.send {
			--margin: 0rem;
		}
	}
	@media (width >= 768px) {
		.send::after {
			--offset: 0.5rem;
			content: '';
			position: absolute;
			@apply bg-blue-white;
			width: 100%;
			height: calc(100% + var(--offset) * 2);
			right: 0;
			bottom: 0;
			transform: translateY(var(--offset));
			z-index: -1;
		}
	}
	.loader {
		width: 20px;
		padding: 3px;
		aspect-ratio: 1;
		border-radius: 50%;
		background-color: #8d00bb;
		--_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
		-webkit-mask: var(--_m);
		mask: var(--_m);
		-webkit-mask-composite: source-out;
		mask-composite: subtract;
		animation: l3 1s infinite linear;
	}
	@keyframes l3 {
		to {
			transform: rotate(1turn);
		}
	}
</style>
