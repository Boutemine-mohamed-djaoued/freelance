<script>
	import { chatRoom, chatState, messages } from '$lib/stores/messeges.js';
	import Loading from '$lib/components/ui/Loading.svelte';
	import { onMount } from 'svelte';
	import Send from './Send.svelte';
	import { socket } from '$lib/stores/socket.js';
	import { MS, MB } from '$lib/util/consts.js';
	import { id2 } from '$lib/stores/Session.js';
	import timeTeller from '$lib/util/timeTeller.js';
	let container;
	let pages = 0;
	let thereAreMoreMessages = true;

	const getMesseges = async (page, limit) => {
		const response = await fetch(`${MS}/room/${$chatRoom._id}?page=${page}&limit=${limit}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'your m'
			}
		});
		if ($messages?.length > 0) {
			let newMessages = (await response.json()).conversation;
			if (newMessages.length == 0) {
				thereAreMoreMessages = false;
				return;
			}
			$messages = [...newMessages, ...$messages];
		} else {
			messages.set((await response.json()).conversation);
			thereAreMoreMessages = true;
			setTimeout(() => {
				if (container) {
					container.scrollTop = container.scrollHeight;
					console.log('there are a lot of container ???');
				} else {
					console.log('there is not container ???');
				}
			}, 0);
		}
		console.log($messages);
	};

	socket.subscribe((value) => {
		if (value) {
			value.on('new message', (message) => {
				if ($messages) $messages = [...$messages, message.message];
				console.log($messages);
				setTimeout(() => {
					if (container) container.scrollTop = container.scrollHeight;
				}, 0);
			});
		} else {
			console.log('there is not socket');
		}
	});
	chatRoom.subscribe((value) => {
		if (value) {
			$socket.emit('subscribe', {
				room: value._id,
				otherUserId: value.user._id
			});
			$messages = null;
			getMesseges(0, 30);
		}
	});

	const seeTime = (e, i) => {
		if (e.target.parentNode.classList.contains('time')) {
			// If a paragraph already exists, remove it
			const existingTime = e.target.parentNode.parentNode.querySelector('.time-span');
			if (existingTime) {
				existingTime.remove();
			}
			e.target.parentNode.classList.remove('time');
			return;
		}
		const p = document.createElement('p');
		p.textContent = timeTeller($messages[i].createdAt);
		if ($messages[i].postedByUser._id == id2) p.classList.add('text-right');
		else {
			p.classList.add('ml-10');
			p.classList.add('md:ml-16');
		}
		p.classList.add('text-gray-400', 'time-span');
		e.target.parentNode.parentNode.insertBefore(p, e.target.parentNode);
		e.target.parentNode.classList.add('time');
	};
	const GoToChatList = () => {
		chatState.set(false);
	};
	async function downloadFile(url, filename) {
		const link = document.createElement('a');
		let data = await fetch(url);
		let res = await data.blob();
		const aElement = document.createElement('a');
		aElement.setAttribute('download', filename);
		const href = URL.createObjectURL(res);
		aElement.href = href;
		aElement.setAttribute('target', '_blank');
		aElement.click();
		URL.revokeObjectURL(href);
	}
	const getMoreMessages = () => {
		pages++;
		getMesseges(pages, 30);
	};
</script>

{#if $chatRoom}
	<main class="flex flex-col relative isolate">
		<div class="py-5 md:p-5 md:m-5 md:bg-white rounded-lg h-full">
			<div class="flex justify-between items-center border-b-2 pb-2">
				<div class="flex">
					<button on:click={() => GoToChatList()} class="mr-2 md:hidden">
						<img src="/messeges/back.svg" alt="" />
					</button>
					<img class="max-md:w-10" src="/defaultProfile.svg" alt="" />
					<div class="mx-3 flex flex-col justify-center">
						<p class="font-semibold">{$chatRoom.user.username}</p>
						<p class="text-gray-400">
							<span class:bg-light-green={$chatRoom.user.active} class="w-2 h-2 bg-gray-200 inline-block rounded-full"></span>
							{#if $chatRoom.user.active}
								<span>online</span>
							{:else}
								<span>offline</span>
							{/if}
						</p>
					</div>
				</div>
				<p class="text-400 md:text-400 font-medium">
					<!-- {user.gig} -->
					website design
				</p>
			</div>
			<div bind:this={container} class="box flex flex-col mb-3 pt-3 md:pb-20 overflow-y-scroll">
				{#if $messages}
					{#if thereAreMoreMessages}
						<button class="bg-primary-300 text-white p-2 rounded-lg w-fit mx-auto" on:click={() => getMoreMessages()}>more messages</button>
					{:else}
						<p class="w-fit mx-auto rounded-full border-2 px-5 my-2">There are no more messages</p>
					{/if}
					{#each $messages as message, i}
						<div class="flex">
							<div class="pr-2 w-14 max-md:w-10 shrink-0">
								{#if message.postedByUser._id != id2 && $messages[i + 1]?.postedByUser._id == id2}
									<img src="/defaultProfile.svg" alt="" />
								{/if}
							</div>
							<button on:click={(e) => seeTime(e, i)} class:ml-auto={message.postedByUser._id == id2} class:mr-auto={message.postedByUser._id != id2}>
								{#if message.type == 'text'}
									<p class="my-1 md:my-2 p-2 md:p-3 text-left max-w-[30ch] md:max-w-[75ch]" class:my-text={message.postedByUser._id == id2} class:his-text={message.postedByUser._id != id2}>
										{message.message}
									</p>
								{:else if message.type == 'image'}
									<img class="max-w-[15rem] md:max-w-[30rem] rounded-xl my-2 border-2" class:my-img={message.postedByUser._id == id2} class:his-img={message.postedByUser._id != id2} src={`${message.message}`} alt="" />
								{:else if message.type == 'file'}
									<div class="flex gap-2 items-center bg-primary-300 bg-opacity-15 p-2 rounded-lg">
										<p>{message.message.split('%20%20')[1].split('?')[0]}</p>
										<button on:click={() => downloadFile(message.message, message.message.split('%20%20')[1].split('?')[0])} class="w-8 h-8 bg-primary-300 p-1 rounded-lg">
											<img src="/general/download.svg" alt="" />
										</button>
									</div>
								{:else if message.type == 'video'}
									<video class="my-2 rounded-lg max-w-[15rem] md:max-w-[30rem]" src={message.message} controls kind="captions"> </video>
								{:else if message.type == 'audio'}
									<audio class="my-1 max-md:max-w-[15rem]" src={`${message.message}`} controls class:my-audio={message.postedByUser._id == id2} class:his-audio={message.postedByUser._id != id2}></audio>
								{/if}
							</button>
						</div>
					{/each}
				{:else}
					<div class="mt-10 mx-auto">
						<Loading></Loading>
					</div>
				{/if}
			</div>
		</div>
		<Send></Send>
	</main>
{:else}
	<div class="mt-[40vh]">
		<p class="mx-auto w-fit bg-white py-1 px-5 border-2 rounded-full">Select a chat and start messaging</p>
	</div>
{/if}

<style>
	main {
		height: calc(100dvh - 5.1rem);
	}
	.box {
		height: calc(100dvh - 5.1rem - 8.5rem);
	}
	::-webkit-scrollbar {
		width: 0px;
		background: transparent;
	}
	@media (width <= 768px) {
		* {
			font-size: 0.98em;
		}
		main {
			height: calc(100dvh - 4rem);
		}
	}
	.my-text {
		@apply bg-primary-300 bg-opacity-5 rounded-s-2xl rounded-ee-2xl;
	}
	.his-text {
		@apply bg-gray-100 bg-opacity-70  rounded-bl-2xl rounded-e-2xl;
	}
	.my-audio {
		border-radius: 0.75rem 0 0.75rem 0.75rem;
	}
	.his-audio {
		border-radius: 0 0.75rem 0.75rem;
	}
	/* audio */
	audio {
		padding: 5px;
		@apply bg-primary-300 bg-opacity-5;
	}

	/* Style the audio controls */
	audio::-webkit-media-controls-panel {
		@apply bg-primary-300 bg-opacity-5;
	}

	/* Style the play/pause button */
	audio::-webkit-media-controls-play-button {
		@apply bg-primary-300 bg-opacity-10;
		border-radius: 50%;
		padding: 10px;
	}
	audio::webkit-media-controls-timeline {
		/* width: 100px; */
		background-color: green;
		color: red;
		width: 5rem;
	}
	/* Style the volume control */
	audio::-webkit-media-controls-volume-slider {
		/* width: 100px; */
	}
	audio::-webkit-media-controls-timeline {
		-webkit-filter: hue-rotate(143deg) saturate(10);
	}
</style>
