<script>
	export let cardInfo;
	import { user, id} from "$lib/stores/Session.js"
	import { goto } from '$app/navigation';
	
</script>

<div class="card bg-white rounded-[2.5rem] relative shadow-lg p-5 pb-[60px] h-fit">
	<div class="flex items-center gap-3">
		<div class="rig relative">
			<img class=" w-14" src="/defaultProfile.svg" alt="" />
		</div>
		<div>
			<h3>{cardInfo.firstName + ' ' + cardInfo.lastName}</h3>
			<p class="text-primary-400">{cardInfo.jobTitle}</p>
		</div>
	</div>
	<p class="my-2 truncate-text-3">{cardInfo.description}</p>
	<div class="decoration"></div>
	<div class="my-buttons justify-center items-center gap-2 hidden">
		<button>Message</button>
		<button on:click={() => {
			goto(`/${$user.role}/profile/${$id}`)
		}}>View Profile</button>
	</div>
</div>

<style>
	button {
		padding: 0.2rem 0.7rem;
		border-radius: 0.8rem;
		border: none;
		@apply bg-primary-400 text-white bg-opacity-95;
	}
	.my-buttons {
		position: absolute;
		width: 100%;
		height: 60px;
		right: 0;
		bottom: 4px;
	}
	.card:hover .my-buttons {
		display: flex;
		animation: showUp 0.5s ease forwards;
	}
	@keyframes showUp {
		0% {
			opacity: 0;
			bottom: -20px;
		}
		100% {
			opacity: 1;
			bottom: 4px;
		}
	}
	.rig:after {
		transition: transform 0.3s ease;
	}
	.card:hover .rig::after {
		transform: rotate(315deg);
	}
	.rig::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		aspect-ratio: 1/1;
		inset: 0;
		border-radius: 50%;
		border-width: 2px 2px 0px 0px;
		border-style: solid;
		@apply border-primary-300;
		transform: rotate(225deg);
	}
	.decoration {
		position: absolute;
		bottom: 0;
		/* @apply bg-primary-300; */
		right: 0;
		width: 100%;
		height: 60px;
		border-bottom-left-radius: 2.5rem;
		border-bottom-right-radius: 2.5rem;
	}
	.decoration::after {
		content: '';
		position: absolute;
		bottom: 8px;
		left: 8px;
		width: calc(100% - 16px);
		height: 52px;
		background-color: white;
		border-bottom-left-radius: 3rem;
		border-bottom-right-radius: 3rem;
	}
</style>
