import { writable } from "svelte/store";
import { getSessionStorageItem, setSessionStorageItem } from '$lib/util/sessionStorage.js';
export let currentStep = writable(0);
export let isThisStepValid = writable(new Array(5).fill(true));
export let catchError = writable(false);
export let gigData = writable({
  description: null,
  title: null,
  tags: [],
  price: 0,
  deadline: null,
  expertize_level: "Intermediate",
  job_size: "Medium",
  payment_structure: "By_Project",
  attachments: [],
});

// export let createGigData = writable({
//   currentStep: 0,
//   isThisStepValid: new Array(5).fill(true),
//   catchError: false,
//   gigData: {
//     description: null,
//     title: null,
//     tags: [],
//     price: 0,
//     deadline: null,
//     expertize_level: "Intermediate",
//     job_size: "Medium",
//     payment_structure: "By_Project",
//     attachments: []
//   }
// })

const storedGigData = getSessionStorageItem('myGigData', {
  currentStep: 0,
  isThisStepValid: new Array(5).fill(true),
  catchError: false,
  gigData: {
    description: null,
    title: null,
    tags: [],
    price: 0,
    deadline: null,
    expertize_level: "Intermediate",
    job_size: "Medium",
    payment_structure: "By_Project",
    attachments: []
  }
});
export const createGigData = writable(storedGigData);
createGigData.subscribe((value) => {
  setSessionStorageItem('myGigData', value);
});