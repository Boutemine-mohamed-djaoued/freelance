import { writable } from "svelte/store";
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
  attachments: []
});

gigData.subscribe((value) => {
  console.log(value);
})
// let localGigData;
// let myGigData;
// if (typeof sessionStorage !== 'undefined') {
//   myGigData = JSON.parse(sessionStorage.getItem('gigData'));
// }
// if (myGigData !== undefined) {
//   localGigData = writable(myGigData)
// } else {
//   localGigData = writable({
//     description: null,
//     title: null,
//     tags: [],
//     price: 0,
//     deadline: "1 month",
//     expertize_level: "Intermediate",
//     job_size: "Medium",
//     payment_structure: null,
//     attachements: []
//   });
// }
// export let gigData = localGigData;
// gigData.subscribe((value) => {
//   if (typeof sessionStorage !== 'undefined') {
//     console.log("storing");
//     console.log(value);
//     sessionStorage.setItem("gigData", JSON.stringify(value));
//   }
// })