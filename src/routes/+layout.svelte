<script>
	import { finishJob } from '$lib/stores/dashboard.js';
	import { MS } from '$lib/util/consts.js';
	import MainHeader from '$lib/layout/mainHeader.svelte';
	import { showDetails, showFilters } from './../lib/stores/FeedState.js';
	import { io } from 'socket.io-client';
	import '../app.css';
	import { onMount } from 'svelte';
	import { socket } from '$lib/stores/socket.js';
	import {id2} from '$lib/stores/Session.js';
	onMount(() => {
		// only should work when the user have an account
		// let id = '2bc8ec9eca5a49fd9536e465d2e88ff8';
		socket.set(io(MS));
		$socket.emit('init', id2);
		return () => {
			socket.get().disconnect();
		};
	});
</script>

<div class:no-scroll={$finishJob || $showDetails || $showFilters} class="freelancer  relative grid-system overflow-clip">
	<MainHeader></MainHeader>
	<slot />
</div>

<style>
	.no-scroll {
		height: 100vh;
		overflow: clip;
	}
</style>
