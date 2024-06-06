<script>
	import ClientHeader from './ClientHeader.svelte';
	import DefaultHeader from './DefaultHeader.svelte';
	import FreelancerHeader from './FreelancerHeader.svelte';
	import { session } from '$lib/stores/Session.js';
</script>

{#if $session === 'client'}
	<ClientHeader />
	<!-- <FreelancerHeader /> -->
{:else if $session === 'freelancer'}
	<FreelancerHeader />
{:else if $session === 'register'}
	<p></p>
{:else}
	<DefaultHeader />
{/if}
