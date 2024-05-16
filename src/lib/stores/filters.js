import { writable } from "svelte/store";

export let filters = writable({
  size: null,
  structure: null,
  rate: null,
  experience: null,
  date: null,
})