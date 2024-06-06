<script>
  import { fly } from "svelte/transition";

  import { bind } from "./Modal.svelte";

  import Popup from "./Popup.svelte";

  import { modal } from "./stores.js";

  let opening = false;
  let opened = false;
  let closing = false;
  let closed = false;

  const showPopup = () => {
    modal.set(Popup);
  };

  const showPopupWithProps = (
    message,
    firstName = user.firstName,
    lastName = user.lastName,
    bio = user.bio,
    description = user.description,
    job = user.job
  ) => {
    modal.set(
      bind(Popup, {
        message: message,
        firstName: firstName,
        lastName: lastName,
        bio: bio,
        description: description,
        job: job,
      })
    );
  };

  import { page } from "$app/stores";
  import makeQuery from "$lib/util/makeQuery.js";

  import { ClientProfileQuery } from "$lib/util/queries.js";
  import { onMount } from "svelte";
  import { Spinner } from "flowbite-svelte";
  import { getContext } from "svelte";

  let loading = false;
  const userId = $page.params.userId;
  console.log(userId);
  var user = {
    name: "Selloum Moncef",
    pfp: "/registerUserImage.png",
    title: "front-end",
    description:
      "Quis eiusmod deserunt cillum laboris magna cupidatat esse labore irure quis cupidatat in. Mollit in laborum tempor Lorem incididunt irure.",
    email: "a.selloum@esi-sba.dz",
    password: "msdf",
    CCP: "2345678",
    Birthday: "01/02/2005",
    interests: "nothing",
    bio: "bio",
    wilaya: "Djelfa",
    phone: "0123456789",
  };

  $: prv_inf_array = [
    {
      key: "Email",
      value: user.email,
    },
    {
      key: "Password",
      value: user.password,
    },
    {
      key: "CCP",
      value: user.CCP,
    },
    {
      key: "Birthday",
      value: user.Birthday,
    },
    {
      key: "Interests",
      value: user.interests,
    },
  ];

  let changePassValue = function () {
    // let pass = document.querySelector("#Password");
    // pass.textContent = prv_inf_array[1].value;
  };
  let changeCCPValue = function () {
    // let CCP = document.querySelector("#CCP");
    // CCP.textContent = prv_inf_array[2].value;
  };
  let focus = false;
  function handleFocus() {
    focus = true;
  }
  function handleBlur() {
    focus = false;
  }

  // let freelancerProfileID = "69349fc993a6413a870e6a028d7d4dc1";
  let id;
  onMount(async function getData() {
    try {
      let token = localStorage.token;
      id = localStorage.id;
      console.log(id);
      // setToken(token);
      const res = await makeQuery(ClientProfileQuery, {
          clientProfileId: id,
        }, {
          "Content-Type": "application/json",
          "Authorization" : token
        }, );

      let data = res.data.clientProfile.client;
    console.log(res);
      loading = false;
      console.log(data);
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.name = data.firstName + " " + data.lastName;
      console.log(user.name);
      user.CCP = data.ccp;
      user.email = data.email;
      user.wilaya = data.willaya;
      user.Birthday = data.dateOfBirth;
      user.password = data.password;
      user.phone = data.phoneNumber;
      user.interests = data.interests;
      user.reviews = res.data.clientProfile.comments;
      user.description = data.description;
      user.bio = data.bio;
      user.job = data.jobTitle;
      user.pfp = data.photo;
    } catch (err) {
      // alert("Error get profile");
    }
  });
</script>

{#if !loading}
  <div class="mx-[8%]">
    <div
      class="flex-rows justify-center items-center relative bg-white rounded-b-lg pb-2"
    >
      <div class="relative rounded-lg">
        <img src="\freelancer\profile\image.png" alt="" class="" />
      </div>
      <div class="image-container relative mb-3">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <img
          src={user.pfp}
          alt=""
          class="image -translate-y-[50%] mx-auto cursor-pointer"
          on:click={() => {
            showPopupWithProps("head");
          }}
        />
        <!-- dimension -->
      </div>
      <p class="text-center text-400 text-[#181D27]">
        {user.name}
      </p>
      <p class="text-center text-[#ABABAB]">{user.job}</p>
      <p class="text-center max-w-[45ch] text-300 mx-auto pb-3">
        {user.description}
      </p>
    </div>

    <div class="bg-white p-4 rounded-lg mt-4">
      <h1 class=" text-500 ml-2">Personal Informations</h1>
      {#each prv_inf_array as inf}
        <div class="flex justify-between m-10 text-350">
          <h1 class="first-letter:text-[rgb(138,138,138)]">> {inf.key}</h1>
          {#if inf.key.includes("Interests")}
            <p class="text-[#757575] text-300">{inf.value}</p>
          {:else if inf.key.includes("Password")}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <p
              id="Password"
              class="text-[#757575] text-300"
              on:click={() => {
                changePassValue();
                showPopupWithProps("password");
              }}
            >
              ********************
            </p>
          {:else if inf.key.includes("CCP")}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <p
              id="CCP"
              class="text-[#757575] text-300"
              on:click={() => {
                changeCCPValue();
                showPopupWithProps("ccp");
              }}
            >
              {user.CCP}
            </p>
          {:else if inf.key.includes("Email")}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <p
              id="email"
              class="text-[#757575] text-300"
              on:click={() => {
                changeCCPValue();
                showPopupWithProps("email");
              }}
            >
              {user.email}
            </p>
          {:else if inf.key.includes("Birthday")}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <p
              id="birthday"
              class="text-[#757575] text-300"
              on:click={() => {
                showPopupWithProps("birthday");
              }}
            >
              {user.Birthday}
            </p>
          {/if}
        </div>
      {/each}
    </div>
  </div>
{:else}
  <div class="text-center flex items-center min-h-[85vh] justify-center">
    <Spinner color="purple" size="16" />
  </div>
{/if}

<!-- @import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"); -->
<style>
  :root {
    --height: min(calc(8.8vw + 20px), 140px);
  }
  .image {
    height: var(--height);
  }
  .image-container {
    height: calc(var(--height) / 2);
  }
  * {
    font-family: "DM Sans", sans-serif;
  }
  section {
    padding-top: 0.5em;
  }
</style>
