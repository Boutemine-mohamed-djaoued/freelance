<script>
  let isChecked;
  import { onMount } from "svelte";
  import makeQuery, { setToken } from "$lib/util/makeQuery.js";
  import { forgetPassword } from "$lib/util/queries.js";

  let email = "";
  let token;
  let id;
  onMount(() => {
    id = localStorage.id;
    if (!id) {
      console.log("cannot get id");
    }
    token = localStorage.token;
    if (!token) {
      console.log("cannot get token");
    }
    setToken(token);
  });

  async function register() {
    console.log(email);
    try {
      const res = await makeQuery(forgetPassword, {
        email: email,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
</script>

<div class="flex items-center mt-7">
  <input type="email" placeholder="Enter your email" bind:value={email} />
  <button class="m-4" on:click={register}>Submit</button>
</div>
<p class:hidden={!isChecked} class="text-red-700 font-semibold text-300 mt-2">
  password recovered
</p>

<style>
</style>
