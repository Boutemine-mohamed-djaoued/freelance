import { writable } from 'svelte/store';
export let proposal = writable([]);
export let showProposalList = writable(true);