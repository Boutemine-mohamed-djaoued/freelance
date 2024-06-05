<script>
	import ClientHeader from './ClientHeader.svelte';
	import DefaultHeader from './DefaultHeader.svelte';
  import FreelancerHeader from './FreelancerHeader.svelte';
  let session = "freelancer";
</script>

{#if session === "client"}
  <ClientHeader />
{:else if session === "freelancer"}
  <FreelancerHeader />
{:else}
  <DefaultHeader />
{/if}