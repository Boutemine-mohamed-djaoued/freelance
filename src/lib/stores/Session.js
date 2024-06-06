import { writable } from "svelte/store";
import { getSessionStorageItem, setSessionStorageItem } from '$lib/util/sessionStorage.js';
//client


// freelancer

// export let id = writable("9addca92fe9d4930a49186cadc91b6ec");
// export let token = writable("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlhZGRjYTkyZmU5ZDQ5MzBhNDkxODZjYWRjOTFiNmVjIiwidHlwZSI6InVzZXIiLCJiYW5uZWQiOmZhbHNlLCJpYXQiOjE3MTc1NDkyMjUsImV4cCI6MTcyMDE0MTIyNX0.WVF1hhXeKQI7mkuQ8rZuXRLLlszeLN4WVkGnljGocbk")

// moncef
// export let id2 = "be526a9870df40c599af562e38a8324f";

// meliani tarek


const storedSession = getSessionStorageItem('mySession', "default");
export const session = writable(storedSession);

session.subscribe((value) => {
  setSessionStorageItem('mySession', value);
});

const storedUser = getSessionStorageItem('myUser', null);
export const user = writable(storedUser);

user.subscribe((value) => {
  setSessionStorageItem('myUser', value);
});

const storedId = getSessionStorageItem('myId', null);
export const id = writable(storedId);

id.subscribe((value) => {
  setSessionStorageItem('myId', value);
});

let tarek = null;
id.subscribe((value) => {
  if (value) tarek = value;
})
export let id2 = tarek;



const storedToken = getSessionStorageItem('myToken', null);
export const token = writable(storedToken);

token.subscribe((value) => {
  setSessionStorageItem('myToken', value);
});

