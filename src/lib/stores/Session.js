import { writable } from "svelte/store";

export let session = writable("freelancer");
export let user = writable({
  firstName: "mohamed" ,
  lastName: "djawad",
  picture : "/defaultProfile.svg"
});
//client

export let id = writable("7d075583b56e4ba29c18d4b33b10c9fe");
export let token = writable("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdkMDc1NTgzYjU2ZTRiYTI5YzE4ZDRiMzNiMTBjOWZlIiwidHlwZSI6InVzZXIiLCJiYW5uZWQiOmZhbHNlLCJpYXQiOjE3MTc1NDk0MzgsImV4cCI6MTcyMDE0MTQzOH0.jOSNRdczGQ9-Jsa2ZzOduCktLERi7RXtj5pa4RieGVs");

// freelancer

// export let id = writable("9addca92fe9d4930a49186cadc91b6ec");
// export let token = writable("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlhZGRjYTkyZmU5ZDQ5MzBhNDkxODZjYWRjOTFiNmVjIiwidHlwZSI6InVzZXIiLCJiYW5uZWQiOmZhbHNlLCJpYXQiOjE3MTc1NDkyMjUsImV4cCI6MTcyMDE0MTIyNX0.WVF1hhXeKQI7mkuQ8rZuXRLLlszeLN4WVkGnljGocbk")

// moncef
// export let id2 = "be526a9870df40c599af562e38a8324f";

// meliani tarek

export let id2 = "2bc8ec9eca5a49fd9536e465d2e88ff8";