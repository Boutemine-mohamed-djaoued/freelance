<script>
	export let title;
	import {showProposalList} from '$lib/stores/proposal.js';
</script>

{#if title}
	<div class="md:flex items-center mt-10">
		<a class:max-md:hidden={!$showProposalList} href="/client/dashboard" class="font-semibold max-md:text-[0.8em] flex gap-2">
			<img src="/general/back.svg" alt="" />
			Dashboard
		</a>
		<button class:hidden={$showProposalList} on:click={()=> showProposalList.set(true)} class="md:hidden font-semibold max-md:text-[0.8em] flex gap-2 items-center">
			<img src="/general/back.svg" alt="" />
			other propossals
		</button>
		<h1 class="mx-auto md:pr-10 text-500 max-md:text-center">{title}</h1>
	</div>
{/if}
