<script>
	import ClientHeader from './ClientHeader.svelte';
	import DefaultHeader from './DefaultHeader.svelte';
	import FreelancerHeader from './FreelancerHeader.svelte';
	import { session } from '$lib/stores/Session.js';
</script>

{#if $session === 'freelancer'}
	<FreelancerHeader></FreelancerHeader>
{:else if $session === 'client'}
	<ClientHeader></ClientHeader>
{:else if $session === 'register'}
	<div></div>
{:else}
	<DefaultHeader></DefaultHeader>
{/if}
