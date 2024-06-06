<script>
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { derived } from "svelte/store";
  import makeQuery, { setToken } from "$lib/util/makeQuery.js";
  import { verifyResetToken } from "$lib/util/queries.js";

  // Derived store to reactively get the URL parameters
  const urlParams = derived(page, ($page) => {
    return new URLSearchParams($page.url.search);
  });

  let id;
  let token;
  let password;

  // Reactive statement to update id and token when urlParams changes
  $: {
    id = $urlParams.get("id");
    token = $urlParams.get("token");
  }

  // Ensure values are logged on mount
  onMount(() => {
        // console.log("ID on mount:", id);
        // console.log("Token on mount:", token);
  });

  async function register() {
    console.log(id);
    console.log(token);
    console.log(password);
    try {
      const res = await makeQuery(verifyResetToken, {
        verifyResetTokenId: id,
        pass: password,
        token: token,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
</script>

<div class="recover password">
    <input type="password" placeholder="Enter your new password" bind:value={password}>
    <button on:click={register} >Submit</button>
</div>
