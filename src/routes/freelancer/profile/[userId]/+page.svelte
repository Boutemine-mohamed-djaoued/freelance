<script>
  import { page } from "$app/stores";
  const userId = $page.params.userId;
  var user = {
    name: "Selloum Moncef",
    pfp: "",
    title: "front-end",
    description:
      "Quis eiusmod deserunt cillum laboris magna cupidatat esse labore irure quis cupidatat in. Mollit in laborum tempor Lorem incididunt irure.",
    email: "a.selloum@esi-sba.dz",
    password: "msdf",
    CCP: "2345678",
    Education: "2nd year",
    Birthday: "01/02",
    Skills: "nothing",
    Website: "https://www.google.com",
    ActiveJobs: 3,
    JobsCompleted: 14,
    moneyMade: 12341.89,
  };

  let prv_inf_array = [
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
      key: "Education",
      value: user.Education,
    },
    {
      key: "Birthday",
      value: user.Birthday,
    },
    {
      key: "Skills",
      value: ["skill1", "skill2", "skill3"],
    },
    {
      key: "Website",
      value: user.Website,
    },
  ];

    let pub_inf_array=[
      {
      key: "Email",
      value: user.email,
    },
    {
      key: "Education",
      value: user.Education,
    },
    {
      key: "Birthday",
      value: user.Birthday,
    },
    {
      key: "Skills",
      value: ["skill1", "skill2", "skill3"],
    },
    {
      key: "Website",
      value: user.Website,
    },
    ]

  let jobs_array = [
    {
      job_title: "job 1",
      status: "Active",
    },
    {
      job_title: "job 2",
      status: "Finished",
    },
    {
      job_title: "Create something i don't know",
      status: "Active",
    },
    {
      job_title: "job 4",
      status: "Active",
    },
    {
      job_title: "job 5",
      status: "Active",
    },
  ];

  let changePassValue = function(){
    let pass = document.querySelector("#Password");
    pass.textContent = prv_inf_array[1].value;
  }
  let changeCCPValue = function(){
    let CCP = document.querySelector("#CCP");
    CCP.textContent = prv_inf_array[2].value;
  }
</script>

<div class="mx-[8%]">
  {#if userId == "moncef"}
  <div class="relative rounded-lg">
    <img src="\freelancer\profile\image.png" alt="" class="" />
  </div>
  <div
    class="flex-rows justify-center items-center relative bg-white rounded-b-lg pb-2"
  >
    <div class="image-container relative mb-3">
      <img
        src="/register\UserImage.png"
        alt=""
        class="image -translate-y-[50%] mx-auto"
      />
      <!-- dimension -->
    </div>
    <p class="text-center text-400 text-[#181D27]">{user.name}</p>
    <p class="text-center text-[#ABABAB]">{user.title}</p>
    <p class="text-center max-w-[45ch] text-300 mx-auto pb-3">{user.description}</p>
  </div>
  <div class="grid grid-cols-3 gap-3 my-5">
    <div class="col-start-1 flex-col gap-1 bg-white p-2 pl-3 rounded-lg">
      <h2 class="text-500">{user.ActiveJobs}</h2>
      <p class="text-[#8A8A8A] text-250">Active jobs</p>
    </div>
    <div class="col-start-2 flex-col gap-1 bg-white p-2 pl-3 rounded-lg">
      <h2 class="text-500">{user.moneyMade}</h2>
      <p class="text-[#8A8A8A] text-250">Money made</p>
    </div>
    <div class="col-start-3 flex-col gap-1 bg-white p-2 pl-3 rounded-lg">
      <h2 class="text-500">{user.JobsCompleted}</h2>
      <p class="text-[#8A8A8A] text-250">Jobs Completed</p>
    </div>
  </div>
  <div class="bg-white p-4 rounded-lg">
    <h1 class=" text-500 ml-2">Personal Informations</h1>
    {#each prv_inf_array as inf}
      <div class="flex justify-between m-10 text-350">
        <h1 class="first-letter:text-[#8A8A8A]">> {inf.key}</h1>
        {#if !(inf.key.includes("CCP") || inf.key.includes("Password") || inf.key.includes("Website"))}
          <p class="text-[#757575] text-300" >{inf.value}</p>
        {:else if inf.key.includes("Password")}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
          <p id="Password" class="text-[#757575] text-300" on:click={() => {
            changePassValue();
          }} >********************</p>
        
        {:else if inf.key.includes("CCP")}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
          <p id="CCP" class="text-[#757575] text-300" on:click={() => {
            changeCCPValue();
          }} >********************</p>
        {:else if inf.key.includes("Website")}
          <a target="_blank" href={inf.value} class="text-[#757575] text-300 font-normal">{inf.value}</a>
        {/if}
      </div>
    {/each}
  </div>
  <div class="bg-white p-4 rounded-lg my-4">
    <h1 class=" text-500 ml-2">Jobs</h1>
    {#each jobs_array as job}
      <div class="flex justify-between m-10 text-350">
        <h1 class="first-letter:text-[#8A8A8A]">> {job.job_title}</h1>
        {#if job.status == "Active"}
        <p class="text-[#332941] text-250 font-semibold border border-[#864AF9] rounded-2xl  p-1 px-2 ">{job.status}</p>
        {:else if job.status == "Finished"}
        <p class="text-[#332941] text-250 font-semibold border border-[#332941] rounded-2xl  p-1 px-2 ">{job.status}</p>
        {/if}
      </div>
    {/each}
  </div>

  {:else}
  <div class="relative rounded-lg">
    <img src="\freelancer\profile\image.png" alt="" class="" />
  </div>
  <div
    class="flex-rows justify-center items-center relative bg-white rounded-b-lg pb-2"
  >
    <div class="image-container relative mb-3">
      <img
        src="/register\UserImage.png"
        alt=""
        class="image -translate-y-[50%] mx-auto"
      />
      <!-- dimension -->
    </div>
    <p class="text-center text-400 text-[#181D27]">{user.name}</p>
    <p class="text-center text-[#ABABAB]">{user.title}</p>
    <p class="text-center max-w-[45ch] text-300 mx-auto pb-3">{user.description}</p>
  </div>
  <div class="grid grid-cols-3 gap-3 my-5">
    <div class="col-start-1 flex-col gap-1 bg-white p-2 pl-3 rounded-lg">
      <h2 class="text-500">{user.ActiveJobs}</h2>
      <p class="text-[#8A8A8A] text-250">Active jobs</p>
    </div>
    <div class="col-start-2 flex-col gap-1 bg-white p-2 pl-3 rounded-lg">
      <h2 class="text-500">{user.moneyMade}</h2>
      <p class="text-[#8A8A8A] text-250">Money made</p>
    </div>
    <div class="col-start-3 flex-col gap-1 bg-white p-2 pl-3 rounded-lg">
      <h2 class="text-500">{user.JobsCompleted}</h2>
      <p class="text-[#8A8A8A] text-250">Jobs Completed</p>
    </div>
  </div>
  <div class="bg-white p-4 rounded-lg">
    <h1 class=" text-500 ml-2">Personal Informations</h1>
    {#each pub_inf_array as inf}
      <div class="flex justify-between m-10 text-350">
        <h1 class="first-letter:text-[#8A8A8A]">> {inf.key}</h1>
          <p class="text-[#757575] text-300">{inf.value}</p>
      </div>
    {/each}
  </div>
  <!-- <div class="bg-white p-4 rounded-lg my-4">
    <h1 class=" text-500 ml-2">Jobs</h1>
    {#each jobs_array as job}
      <div class="flex justify-between m-10 text-350">
        <h1 class="first-letter:text-[#8A8A8A]">> {job.job_title}</h1>
        {#if job.status == "Active"}
        <p class="text-[#332941] text-250 font-semibold border border-[#864AF9] rounded-2xl  p-1 px-2 ">{job.status}</p>
        {:else if job.status == "Finished"}
        <p class="text-[#332941] text-250 font-semibold border border-[#332941] rounded-2xl  p-1 px-2 ">{job.status}</p>
        {/if}
      </div>
    {/each}
  </div> -->
  {/if}


</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap");
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
</style>
