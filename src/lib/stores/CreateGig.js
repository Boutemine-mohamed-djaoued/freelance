import { writable } from "svelte/store";
export let currentStep = writable(0);
export let isThisStepValid = writable(new Array(5).fill(true));
export let catchError = writable(false);
export let gigData = writable({
  title: "",
  description: "",
  experience: "",
  jobSize: "",
  price: "",
  deliveryTime: "",
  tags: "",
  requirements: "",
  image: "",
});