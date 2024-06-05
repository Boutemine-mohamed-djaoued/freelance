import { MB } from '$lib/util/consts.js';
export default async function (query, variables, headers) {
  try {
    const res = await fetch(MB + "/graphql", {
      method: "POST",
      body: JSON.stringify({
        "query": query,
        "variables": variables
      }),
      headers: headers
    });
    const data = await res.json();
    return data
  } catch (error) {
    console.log(error);
  }
}
