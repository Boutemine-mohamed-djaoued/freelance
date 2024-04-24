import { writable } from "svelte/store";


export let showDetails = writable(0);
// 0 off secreen
// 1 on the right
// 2 on the left 
export let showFilters = writable(false);