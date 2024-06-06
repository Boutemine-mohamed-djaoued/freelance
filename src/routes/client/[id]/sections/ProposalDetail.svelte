<script>
	import getFileType from '$lib/util/getFileType.js';
	import { goto } from '$app/navigation';
	import makeQuery from '$lib/util/makeQuery.js';
	import { proposal } from '$lib/stores/proposal.js';
	import { id, token } from '$lib/stores/Session.js';
	import { MS } from '$lib/util/consts';
	import { acceptJob } from '$lib/util/queries.js';
	export let jobId;
	const acceptRequest = async () => {
		try {
			let data = await makeQuery(
				acceptJob,
				{ job: jobId, client: $id, freelancer: $proposal._id },
				{
					'Content-Type': 'application/json',
					authorization: $token
				}
			);
			console.log(data);
			alert('Request Accepted');
			goto('/client/dashboard');
		} catch (err) {
			console.log(err);
		}
	};
	const initChat = async (otherUserId) => {
		try {
			console.log($id);
			console.log(otherUserId);
			const res = await fetch(`${MS}/room/initiate`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'hello'
				},
				body: JSON.stringify({
					userIds: [$id, otherUserId]
				})
			});
			console.log(res);
			goto('/messeges');
		} catch (err) {
			console.log(err);
		}
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
	let starts = [1, 2, 3, 4, 5];
</script>

{#if $proposal}
	<main class="w-full p-5 md:p-10 leading-7">
		<div class="flex items-center gap-5">
			<img class="md:w-20 aspect-square rounded-full" src={$proposal.photo || "/defaultProfile.svg"} alt="" />
			<div>
				<h3 class="text-400 mb-1">{$proposal.firstName + ' ' + $proposal.lastName}</h3>
				<div class="flex gap-1">
					<p class="text-primary-300 font-semibold">{$proposal.score}</p>
					<div class="flex">
						{#each starts as star}
							<img src="/general/primary-star.svg" alt="" />
						{/each}
					</div>
					<p class="text-gray-400">({$proposal.sum})</p>
				</div>
			</div>
		</div>
		<div class="my-5">
			<h3 class="mb-2">Bio</h3>
			<p class="p-3 bg-gray-100 rounded-lg">{$proposal.bio}</p>
		</div>
		<div class="my-5">
			<h3 class="mb-2">Description</h3>
			<p class="p-3 bg-gray-100 rounded-lg">{$proposal.description}</p>
		</div>
		<div class="my-5 flex gap-5">
			<div class="flex-1">
				<h3 class="mb-2">Due Date</h3>
				<p class="p-3 bg-gray-100 rounded-lg">{$proposal.deadline?.slice(0, 10)}</p>
			</div>
			<div class="flex-1">
				<h3 class="mb-2">Price</h3>
				<p class="p-3 bg-gray-100 rounded-lg">{$proposal.price}</p>
			</div>
			<!-- <div class="flex-1">
				<h3 class="mb-2">somethimg</h3>
				<p class="p-3 bg-gray-100 rounded-lg">good</p>
			</div> -->
		</div>
		<h3 class="mb-2">Attached files</h3>
		<div class="md:flex justify-between">
			<div class="flex gap-2 ps-3">
				{#if $proposal?.attachments?.length}
					{#each $proposal.attachments as file}
						<div class="relative file">
							<img class="w-10" src={`/fileTypes/${getFileType(file.kind)}.svg`} alt="" />
							<button on:click={() => downloadFile(file.link, file.kind)} class="download rounded-md">
								<img src="/general/download.svg" alt="lsjdf" />
							</button>
						</div>
					{/each}
				{:else}
					<p>no attachments</p>
				{/if}
			</div>
			<div class="max-md:flex justify-between mt-5 gap-3">
				<button on:click={() => initChat($proposal._id)} class="ml-auto border-2 border-primary-300 p-2 w-28 md:w-40 inline-block text-center rounded-md">Chat</button>
				<button on:click={() => acceptRequest()} class="bg-primary-300 text-white p-2 w-28 md:w-40 rounded-lg border-2 border-primary-300">Accept</button>
			</div>
		</div>
	</main>
{/if}

<style>
	.file:hover .download {
		display: flex;
	}

	.download {
		display: none;
		justify-content: center;
		align-items: center;
		width: 100%;
		aspect-ratio: 1;
		background-color: rgba(0, 0, 0, 0.616);
		position: absolute;
		/* top: 50%; */
		/* left: 50%; */
		/* transform: translate(-50%, -50%); */
		inset: 0;
	}
</style>
