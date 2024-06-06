<script>
  import { onMount } from "svelte";
  import makeQuery from "$lib/util/makeQuery.js";
  import { updateClientCCP, updateClientBirthday, updateClientHead } from "$lib/util/queries.js";
  export let message = "Default message";
  export let firstName;
  export let lastName;
  export let bio;
  export let description;
  export let job;

  let oldpass = "";
  let newpass = "";
  let confirmNewPass = "";
  let errormatching = false;
  let errorCcp = false;
  let errorEmail = false;
  let id;
  let ccp;  
  let email;
  let birthday;
  function validateEmail() {
    if (emailPattern.test(email)) {
      errorEmail = false;
    } else {
      errorEmail = true;
    }
  }
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  onMount(() => {
    id = localStorage.id;
    if (!id) {
      alert("cannot get id");
    }
  });
  async function resetPassword(e) {
    // e.preventDefault();
    // console.log(id);
    // console.log(newpass);
    // console.log(oldpass);
    // console.log(confirmNewPass);

    // if (newpass != confirmNewPass || newpass == "") {
    //   errormatching = true;
    //   return false;
    // }
    // try {
    //   const res = await makeQuery(ClientResetPasswordQuery, {
    //     resetClientPasswordId: id,
    //     newpass: newpass,
    //     oldpass: oldpass,
    //   });
    //   console.log(res);
    // } catch (err) {
    //   console.log(err);
    // }

    // client reset password
  }
  async function resetCCP(e) {
    e.preventDefault();
    if (ccp.length != 20) {
      errorCcp = true;
      return false;
    }
    try {
      const res = await makeQuery(updateClientCCP, {
        updateClientId: id,
        input: {
          ccp: ccp,
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  async function resetBirthday(e) {
    e.preventDefault();
    console.log(id);
    console.log(birthday);
    try {
      const res = await makeQuery(updateClientBirthday, {
        updateClientId: id,
        input: {
          dateOfBirth: birthday,
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  async function resetHead(e) {
    e.preventDefault();
    try {
      const res = await makeQuery(updateClientHead, {
        updateClientId: id,
        input: {
          bio: bio,
          description:description,
          firstName: firstName,
          lastName: lastName,
          jobTitle: job,
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
</script>

<!-- <h2>🎉 {message} 🍾</h2>
<h1> moncef is the best</h1> -->
{#if message == "password"}
  <div class="changePassword flex-row items-center w-fit">
    <input
      type="password"
      placeholder="write old password"
      class="rounded-lg"
      bind:value={oldpass}
    />
    <input
      type="password"
      placeholder="write new password"
      class="rounded-lg"
      bind:value={newpass}
    />
    <input
      type="password"
      placeholder="rewrite new password"
      class="rounded-lg"
      bind:value={confirmNewPass}
    />
    {#if errormatching}
      <p class="text-red-600">Passwords do not match!</p>
    {/if}
    <button
      class="bg-[#7360DF] py-2 px-3 mx-auto rounded-2xl"
      on:click={resetPassword}>change Password</button
    >
  </div>
{:else if message == "ccp"}
  <div class="resetCCP">
    <input
      type="text"
      name=""
      id=""
      placeholder="Place new CCP"
      bind:value={ccp}
    />
    {#if errorCcp}
      <p class="text-red-600">Invalid CCP!</p>
    {/if}
    <button on:click={resetCCP}>Submit</button>
  </div>
{:else if message == "birthday"}
  <div class="resetBirthday">
    <input
      type="date"
      name=""
      id=""
      placeholder="Place your date of Birth"
      bind:value={birthday}
    />
    <button on:click={resetBirthday}>Submit</button>
  </div>
{:else if message == "head"}
  <div class="resetHead">
    <div class="flex items-center">
      <p>Enter your first name :</p>
      <input
        type="text"
        name=""
        id=""
        placeholder="First Name"
        bind:value={firstName}
      />
    </div>
    <div class="flex items-center">
      <p>Enter your last name :</p>
      <input
        type="text"
        name=""
        id=""
        placeholder="Last Name"
        bind:value={lastName}
      />
    </div>
    <div class="flex items-center">
      <p>Enter your Job :</p>
      <input type="text" name="" id="" placeholder="Job" bind:value={job} />
    </div>
    <div class="flex items-center">
      <p>Enter your Bio :</p>
      <textarea name="" id="" placeholder="Enter you bio here!" bind:value={bio}
      ></textarea>
    </div>
    <div class="flex items-center">
      <p>Enter your Description :</p>
      <textarea
        name=""
        id=""
        placeholder="Enter your description here"
        bind:value={description}
      ></textarea>
    </div>
    <div class="flex justify-center">
      <button class="bg-[#7360DF] px-3 py-2 rounded-xl mt-4" on:click={resetHead}>Submit</button>
    </div>
  </div>
{/if}

<style>
  h2 {
    font-size: 2rem;
    text-align: center;
  }
  * {
    display: block;
    margin: 10px;
  }
</style>
