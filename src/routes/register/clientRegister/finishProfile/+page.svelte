<script>
  import { onMount } from "svelte";
  import LeftSide from "$lib/components/register/LeftSide.svelte";
  import MainBtn from "$lib/components/ui/MainButton.svelte";
  import { session } from "$lib/stores/Session.js";
  import { fly, fade } from "svelte/transition";
  import makeQuery from "$lib/util/makeQuery.js";
  import { createClientQuery } from "$lib/util/queries.js";
	import {MS} from "$lib/util/consts.js"
  import { goto } from "$app/navigation";
  let job;
  let userName;
  let lastName;
  let firstName;
  let email;
  let password;
  let telephone;
  let wilaya;
  let picture;
  let oauth;
  let valid = false;
  let description = "";
  $: valid = description != "" && bio != "";
  let birthday;
  let interests;
  let bio;
  let ccp;
  function saveUserDescription() {
    sessionStorage.setItem("userDescription", JSON.stringify(description));
  }
  function saveUserBio() {
    sessionStorage.setItem("userBio", JSON.stringify(bio));
  }

  function loadFormData() {
    const savedDescription = sessionStorage.getItem("userDescription");
    if (savedDescription) {
      description = JSON.parse(savedDescription);
    }
    const savedBio = sessionStorage.getItem("userBio");
    if (savedBio) {
      bio = JSON.parse(savedBio);
    }
    const savedFirstName = sessionStorage.getItem("firstName");
    if (savedFirstName) {
      firstName = JSON.parse(savedFirstName);
    }
    const savedLastName = sessionStorage.getItem("lastName");
    if (savedLastName) {
      lastName = JSON.parse(savedLastName);
    }
    const savedJob = sessionStorage.getItem("userJob");
    if (savedJob) {
      job = JSON.parse(savedJob);
    }
    const savedEmail = sessionStorage.getItem("email");
    if (savedEmail) {
      email = JSON.parse(savedEmail);
    }
    const savedPass = sessionStorage.getItem("password");
    if (savedPass) {
      password = JSON.parse(savedPass);
    }
    const savedPhone = sessionStorage.getItem("telephone");
    if (savedPhone) {
      telephone = JSON.parse(savedPhone);
    }
    const savedWilaya = sessionStorage.getItem("wilaya");
    if (savedWilaya) {
      wilaya = JSON.parse(savedWilaya);
    }
    const savedPicture = sessionStorage.getItem("picture");
    if (savedPicture) {
      picture = savedPicture;
    }
    const savedBirthday = sessionStorage.getItem("Birthday");
    if (savedBirthday) {
      birthday = JSON.parse(savedBirthday);
    }
    const savedInterests = sessionStorage.getItem("userInterests");
    if (savedInterests) {
      interests = JSON.parse(savedInterests);
    }
    const savedCCP = sessionStorage.getItem("CCP");
    if (savedCCP) {
      ccp = JSON.parse(savedCCP);
    }
    const savedOauth = sessionStorage.getItem("oauth");
    if (savedOauth) {
      oauth = JSON.parse(savedOauth);
    } else {
      oauth = 0;
    }
  }
  $: userName = firstName + " " + lastName;

  // let flyParams;
  // const handleResize = () => {
  //   if (window.innerWidth <= 1024) {
  //     flyParams = { x: 100 };
  //   } else {
  //     flyParams = { y: 100 };
  //   }
  // };
  onMount(() => {
    loadFormData();
    // handleResize();
    $session = "register";
  });
  async function register() {
    try {
      const oauth = sessionStorage.oauth;
      console.log(interests);
      const res = await makeQuery(
        createClientQuery,
        {
          input: {
            ccp: ccp,
            dateOfBirth: birthday,
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            phoneNumber: telephone,
            willaya: wilaya,
            jobTitle: job,
            description: description,
            bio: bio,
            photo: picture,
          },
          interests: interests,
        },
        {
          "Content-Type": "application/json",
        }
      );
      console.log(res);
      const data = res.data.createClient;
      const id = data.id;
      const role = data.role;

      try {
        const chattingResposne = await fetch(`${MS}/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: id,
            username: data.firstName + " " + data.lastName,
            type: data.role,
            pfp: data.photo,
          }),
        });
      } catch (err) {
        console.log(err);
      }
      if (res.errors) {
        throw res.errors;
      }
      goto("/login");
      // store shit
      localStorage.id = id;
      localStorage.role = role;
    } catch (err) {
      console.log(err);
    }
    sessionStorage.clear();
  }

  // async function fetchAndDisplayImage() {
  //   try {
  //     //fetch the image
  //     const response = await fetch(picture);
  //     const blob = await response.blob();
  //     const objectURL = URL.createObjectURL(blob);
  //     picture = objectURL;
  //   } catch (error) {
  //     console.error("Error fetching image:", error);
  //   }
  // }
  // fetchAndDisplayImage();
</script>

<div class="flex full-width h-[100vh] bg-transparent max-lg:flex-col">
  <LeftSide number="5"></LeftSide>
  <div class="lg:hidden image h-[40%]"></div>
  <div class="mx-auto my-auto flex justify-center items-center gap-5 max-lg:w-[60%] max-sm:w-[80%] w-[30%] max-lg:items-start">
    <div class="flex flex-col gap-4 w-full">
      <h1 class="text-500/6 font-normal my-[5%] px-4 w-full">Finish your profile</h1>
      <div class="user_info flex gap-3 items-center w-full">
        <img src={picture} alt="profile_image" class="w-[6vw] min-w-[90px] rounded-full" />
        <div class="">
          <h3 class="font-semibold text-300 2xl:text-400">{userName}</h3>
          <p class="text-[12px] leading-3 text-[#ABABAB]">{job}</p>
        </div>
      </div>
      <textarea name="Description" id="" placeholder="Description" class="w-full 2xl:text-400" bind:value={description} on:input={saveUserDescription}></textarea>
      <textarea
        name="Bio"
        id=""
        placeholder="👋 Hi, I’m @{userName}
👀 I’m interested in ...
🌱 I’m currently learning ...
💞️ I’m looking to collaborate on .."
        class="w-full 2xl:text-400"
        bind:value={bio}
        on:input={saveUserBio}></textarea>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="flex gap-4 items-center w-full">
        {#if valid}
          <a href="" on:click={register}>
            <MainBtn title="Finish" customClass="btn-1" />
          </a>
          {#if oauth == 0}
            <a href="/register/freelancerRegister/uploadPicture" class="text-[#BE2AB1] font-semibold"> Back </a>
          {:else}
            <a href="/register/freelancerRegister/aboutFreelancer " class="text-[#BE2AB1] font-semibold"> Back </a>
          {/if}
        {:else}
          <div>
            <MainBtn title="Finish" customClass="btn-1" />
          </div>
          {#if oauth == 0}
            <a href="/register/freelancerRegister/uploadPicture" class="text-[#BE2AB1] font-semibold"> Back </a>
          {:else}
            <a href="/register/freelancerRegister/aboutFreelancer " class="text-[#BE2AB1] font-semibold"> Back </a>
          {/if}
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  input {
    margin: 2px 0;
    border-radius: 5px;
    border: solid #c499f3 1px;
    color: #747474;
    font-weight: 400;
    min-height: 41px;
    height: 4.7vh;
  }

  textarea {
    margin: 2px 0;
    border-radius: 5px;
    border: solid #c499f3 1px;
    color: #747474;
    font-weight: 400;
    height: calc(12.6vw - 4.5rem);
    min-height: 100px;
  }
  * {
    font-family: "DM Sans", sans-serif;
  }
  .image {
    background-image: url("/register/RectangleSmall.png");
    background-size: cover;
    background-position: center bottom;
  }
</style>
