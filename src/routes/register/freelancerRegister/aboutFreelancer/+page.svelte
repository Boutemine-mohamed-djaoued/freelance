<script>
  import { onMount } from "svelte";
  import LeftSide from "$lib/components/register/LeftSide.svelte";
  import MainBtn from "$lib/components/ui/MainButton.svelte";
  import { jobStore } from "$lib/stores/register.js";
  import { fly, fade } from "svelte/transition";
  import Tags from "svelte-tags-input";

  let job;
  let tags = [];
  let birthday;
  let CCP;
  let validCPP = true;

  $: valid =
    job !== "" && tags.length > 0 && birthday !== "" && CCP.length == 20;

  function saveUserSkills() {
    sessionStorage.setItem("userSkills", JSON.stringify(tags));
  }
  function saveUserJob() {
    sessionStorage.setItem("userJob", JSON.stringify(job));
  }
  function saveUserBirthday() {
    sessionStorage.setItem("Birthday", JSON.stringify(birthday));
  }
  function saveUserCCP() {
    sessionStorage.setItem("CCP", JSON.stringify(CCP));
  }

  function loadFormData() {
    const savedJob = sessionStorage.getItem("userJob");
    if (savedJob) {
      job = JSON.parse(savedJob);
    }
    const savedBirthday = sessionStorage.getItem("Birthday");
    if (savedBirthday) {
      birthday = JSON.parse(savedBirthday);
    }
    const savedCCP = sessionStorage.getItem("CCP");
    if (savedCCP) {
      CCP = JSON.parse(savedCCP);
    }
    const savedSkills = sessionStorage.getItem("userSkills");
    if (savedSkills) {
      tags = JSON.parse(savedSkills);
    }
  }
  let oauth;
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
    oauth = sessionStorage.oauth;
  });
  
  function checkCPP() {
    if (CCP.length != 20) {
      validCPP = false;
      console.log("length");
    } else {
      if (!isNaN(CCP)) {
        validCPP = true;
        console.log(true);
      } else {
        validCPP = false;
        console.log("not number");
      }
    }
  }

  function JobFunctions() {
    saveUserJob();
    saveUserSkills();
    saveUserBirthday();
    checkCPP();
    saveUserCCP();
  }

  const skills = [
    "IOS",
    "Android",
    "React Native",
    "Flutter",
    "HTML",
    "CSS",
    "React",
    "Express",
    "NodeJS",
    "Angular",
    "Vue",
    "SvelteKit",
    "Photoshop",
    "Illustrator",
    "Figma",
    "Sketch",
    "Content Writing",
    "Blog Writing",
    "Copy Writing",
    "Editing",
    "Financial Auditing",
    "Compliance",
    "IT Auditing",
    "Forensic Auditing",
"PHP"
  ];

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent Enter key's default behavior
    }
  }
</script>

<!-- <link rel="stylesheet" href="./test/svelte-tags-input-css.css"> -->

<div class="flex full-width h-[100vh] bg-transparent max-lg:flex-col">
  <LeftSide number="3"></LeftSide>
  <div class="lg:hidden image h-[40%]"></div>
  <div
    class="mx-auto max-lg:w-[60%] max-sm:w-[80%] w-[35%] my-auto flex flex-col gap-5"
  >
    <h1 class="text-500 font-medium">Tell us more about you!</h1>
    <form action="" method="get" class="flex flex-col gap-4">
      <div class="data">
        <input
          type="date"
          name="Birthday"
          id=""
          placeholder="Birthday"
          class="w-full"
          required
          bind:value={birthday}
          on:input{jobFunctions}
        />
        <input
          type="text"
          name="job-title"
          id=""
          placeholder="Job title"
          class="w-full"
          required
          bind:value={job}
          on:input={JobFunctions}
        />
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="my-custom-class" on:keydown={handleKeyDown}>
          <Tags
            bind:tags
            addKeys={[9]}
            maxTags={10}
            allowPaste={true}
            allowDrop={true}
            splitWith={"/"}
            onlyUnique={true}
            removeKeys={[27]}
            placeholder={"Skills"}
            autoComplete={skills}
            name={"custom-name"}
            id={"custom-id"}
            allowBlur={true}
            disable={false}
            minChars={1}
            onlyAutocomplete
            required
          />
        </div>
        <input
          type="text"
          name="CCP"
          id=""
          placeholder="CCP code"
          class="w-full"
          required
          bind:value={CCP}
          on:input={saveUserCCP}
        />
        {#if !validCPP}
          <p class="text-red-600 text-250 ml-4">CCP code not valid</p>
        {/if}
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="flex gap-4 items-center" on:mouseenter={JobFunctions}>
        {#if valid}
          <a
            href={oauth == 1
              ? "/register/freelancerRegister/finishProfile"
              : "/register/freelancerRegister/uploadPicture"}
          >
            <MainBtn title="Continue" customClass="btn-1" />
          </a>
          <a href="/register/freelancerRegister" class="text-[#BE2AB1] font-semibold"> Back </a>
        {:else}
          <div on:click={JobFunctions}>
            <MainBtn title="Continue" customClass="btn-1" />
          </div>
          <a
            href="/register/freelancerRegister"
            class="text-[#BE2AB1] font-semibold"
          >
            Back
          </a>
        {/if}
      </div>
    </form>
  </div>
</div>

<style>
  input {
    margin: 8px 0;
    border-radius: 5px;
    border: solid #c499f3 1px;
    color: #747474;
    font-weight: 400;
    min-height: 41px;
    height: 4.7vh;
  }
  * {
    font-family: "DM Sans", sans-serif;
  }
  .image {
    background-image: url("/register/RectangleSmall.png");
    background-size: cover;
    background-position: center bottom;
  }

  .my-custom-class :global(.svelte-tags-input-tag) {
    background: #be2ab1 !important;
  }
  /* 
  .my-custom-class :global(.svelte-tags-input-layout:focus){
    border: solid 1px #BE2AB1 !important;
  }

  .my-custom-class:focus, .my-custom-class:hover {
    border: solid 1px #BE2AB1 !important;
  } */

  /* .my-custom-class :global(.svelte-tags-input-layout.focus) {
	background:yellow !important; 
  border: solid #c499f3 1px !important;
  

}
.my-custom-class :global(.svelte-tags-input-tag.focus), .my-custom-class :global(.svelte-tags-input:focus) {
	background:blue;
  border: none !important ; 

}
.svelte-11hsw7b{
  border: solid #c499f3 1px !important;

}
 */
</style>
