import { writable } from 'svelte/store';
export let finishJob = writable(false);
export let job = writable(null);