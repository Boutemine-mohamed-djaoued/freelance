
import { writable } from 'svelte/store';
export let showProposalList = writable(true);
import { getSessionStorageItem, setSessionStorageItem } from '$lib/util/sessionStorage.js';

const storedProposal = getSessionStorageItem('myProposal', []);
export const proposal = writable(storedProposal);

proposal.subscribe((value) => {
  setSessionStorageItem('myProposal', value);
});