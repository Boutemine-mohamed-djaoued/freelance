import { writable } from 'svelte/store';
export let finishJob = writable(false);
export let doneJob = writable(false);
export let review = writable(false);
export let report = writable(false);
// export let job = writable(null);
import { getSessionStorageItem, setSessionStorageItem } from '$lib/util/sessionStorage.js';
const storedJob = getSessionStorageItem('myJob', null);
export const job = writable(storedJob);

job.subscribe((value) => {
  console.log(value);
  setSessionStorageItem('myJob', value);
});