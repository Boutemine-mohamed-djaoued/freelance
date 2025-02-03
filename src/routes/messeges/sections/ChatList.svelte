<script>
	import { MS } from '$lib/util/consts.js';
	import { chatRoom, chatState, chats } from '$lib/stores/messeges.js';
	import { onMount } from 'svelte';
	import { socket } from '$lib/stores/socket.js';
	import { id2 } from '$lib/stores/Session.js';
	// let chats = [];
	onMount(async () => {
		await getChats();
	});
	const getChats = async () => {
		try {
			const response = await fetch(MS + '/room/user/' + id2, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'your m'
				}
			});
			$chats = (await response.json()).conversations;
			console.log($chats);
		} catch (err) {
			console.log(err);
		}
	};
	let current;
	let handleClick = async (chat, i) => {
		if (current == i) return;
		current = i;
		chatState.set(true);
		$chatRoom = chat;
		await seeMessage(chat._id);
		await getChats();
	};
	const seeMessage = async (chatId) => {
		try {
			const response = await fetch(MS + `/room/${chatId}/mark-read`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'your m'
				}
			});
			console.log(response);
		} catch (err) {
			console.log(err);
		}
	};
	socket.subscribe((value) => {
		if (value) {
			value.on('new message', () => {
				getChats();
			});
		} else {
			console.log('there is not socket');
		}
	});
</script>

<aside class="md:bg-white md:mt-5 md:overflow-y-auto md:h-[100vh]">
	<div class="pt-3 md:p-5">
		<h2 class="text-400 md:text-600 font-semibold text-center my-3 md:my-5">Messages</h2>
		<div class="flex border-2 rounded-full px-4">
			<img src="/freelancer/header/search.svg" alt="" />
			<input class="border-none bg-[inherit] focus:ring-0 min-w-0" type="text" placeholder="search" />
		</div>
	</div>
	<div class="py-2 md:mb-20">
		{#each $chats as chat, i}
			<p class="hidden">
				{([chat.user] = chat.userIds.filter((user) => user._id !== id2))}
			</p>
			<button on:click={() => handleClick(chat, i)} class="flex items-center w-full my-3 py-1 md:px-5 md:rounded-xl hover:bg-primary-300 hover:bg-opacity-5 max-md:border-b-2" class:active={current == i}>
				<div class:after:!bg-light-green={chat.active} class="profileImg m-2 ml-0 relative md:w-20">
					<img class="rounded-full w-14	 aspect-square" src={ chat.user.pfp ||"/defaultProfile.svg"} alt="" />
				</div>
				<div class="w-full">
					<div class="flex justify-between mt-1">
						<p class="font-semibold">{chat.user.username}</p>
						<p class="text-gray-400">now</p>
					</div>
					<div class="flex justify-between items-center">
						{#if chat.lastMessage}
							<div class="truncate-text-1 text-left w-fit mb-1">
								{#if chat.lastMessage.postedByUser == id2}
									<span>You :</span>
								{/if}
								{#if chat.lastMessage.type == 'text'}
									<span>{chat.lastMessage.message}</span>
								{:else}
									<span>send {chat.lastMessage.type}</span>
								{/if}
							</div>
						{:else}
							<p>No messages yet</p>
						{/if}
						{#if chat.lastMessage && chat.lastMessage.postedByUser !== id2 && chat.notifications}
							<span class="bg-red-500 text-[0.7em] text-white font-semibold rounded-full grid items-center h-full px-1">{chat.notifications}</span>
						{/if}
					</div>
				</div>
			</button>
		{/each}
	</div>
</aside>

<style>
	.profileImg::after {
		content: '';
		position: absolute;
		background-color: rgba(128, 128, 128, 0.536);
		border-radius: 50%;
		width: 10px;
		aspect-ratio: 1;
		top: 3px;
		left: 3px;
	}
	::-webkit-scrollbar {
		width: 0px; /* Remove scrollbar space */
		background: transparent; /* Optional: hide scrollbar gutter */
	}
	.active {
		@apply md:bg-primary-300 md:bg-opacity-10;
	}
</style>
