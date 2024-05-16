<script>
	import makeQuery from '$lib/util/makeQuery.js';
	import { proposal } from '$lib/stores/proposal.js';
	import { id, token } from '$lib/stores/Session.js';
	import { acceptJob } from '$lib/util/queries.js';
	// let proposal = {
	// 	img: '/defaultProfile.svg',
	// 	name: 'Mike Johnson',
	// 	rating: 4.7,
	// 	allRatings: 328,
	// 	price: 1800,
	// 	bio: 'I am a professional developer with 5 years of experience in Django. I have worked on multiple projects and have a good understanding of the Django framework.',
	// 	description:
	// 		'I am a professional developer with hello my name is me and the best way to see this sentense is the actually readd god job please add more to your poor life and be a good kidu 5 years of experience in Django. I have worked on multiple projects and have a good understanding of the Django framework. I am confident that I can fix the bug in your project. I have a good understanding of the Django framework and can fix the bug in your project. I have a good understanding of the Django  ',
	// 	dueData: '2022-12-12',
	// 	files: ['/file1.pdf', '/file2.img', '/file3.doc', '/file3.img']
	// };
	let jobId = '731153f76c454449a3d30a8c5315aca4';
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
		} catch (err) {
			console.log(err);
		}
	};
	let starts = [1, 2, 3, 4, 5];
</script>

{#if $proposal}
	<main class="w-full p-5 md:p-10 leading-7">
		<div class="flex items-center gap-5">
			<img class="md:w-20" src="/defaultProfile.svg" alt="" />
			<div>
				<h3 class="text-400 mb-1">{$proposal.firstName + " " +  $proposal.lastName}</h3>
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
			<!-- <p class="p-3 bg-gray-100 rounded-lg">{$proposal.description}</p> -->
			<p class="p-3 bg-gray-100 rounded-lg">Lorem ipsum dolor</p>
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
							<img class="w-10" src={`/fileTypes/${file.link.split('.').pop()}.svg`} alt="" />
							<button class="download rounded-md">
								<img src="/general/download.svg" alt="lsjdf" />
							</button>
						</div>
					{/each}
				{:else}
					<p>no attachments</p>
				{/if}
			</div>
			<div class="max-md:flex justify-between mt-5 gap-3">
				<a href="/messeges" class="ml-auto border-2 border-primary-300 p-2 w-28 md:w-40 inline-block text-center rounded-md">chat</a>
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
