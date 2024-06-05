import { writable } from "svelte/store";


// export let job = writable(null);
export let showDetails = writable(false);
export let showFilters = writable(false);


import { getSessionStorageItem, setSessionStorageItem } from '$lib/util/sessionStorage.js';
const storedJob = getSessionStorageItem('freelancerJob', null);
export const job = writable(storedJob);
export let page = writable(0);

job.subscribe((value) => {
  console.log(value);
  setSessionStorageItem('freelancerJob', value);
});