
import { writable } from 'svelte/store';
import { getSessionStorageItem, setSessionStorageItem } from '$lib/util/sessionStorage.js';
export let showProposalList = writable(true);

const storedProposal = getSessionStorageItem('myProposal', []);
export const proposal = writable(storedProposal);

proposal.subscribe((value) => {
  setSessionStorageItem('myProposal', value);
});