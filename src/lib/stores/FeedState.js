import { writable } from "svelte/store";


export let job = writable(null);
export let showDetails = writable(false);
export let showFilters = writable(false);