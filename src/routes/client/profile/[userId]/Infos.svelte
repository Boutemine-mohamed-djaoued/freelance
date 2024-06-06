<script>
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  export let user;
  export let prv_array;
  export let pub_arr;
  export let userId;
  export let id;

  let stars = [];

  for (let i = 0; i < user.rating; i++) {
    stars.push(i);
  }
</script>

<div class="container">
  <div
    class="flex-rows justify-center items-center relative bg-white rounded-b-lg pb-2"
  >
    <div class="relative rounded-lg">
      <img
        src="\freelancer\profile\Rectangle_Small.png"
        alt=""
        class="w-full"
      />
    </div>
    <div class="image-container relative mb-3 ">
      <img
        src={ user.pfp || "/register\UserImage.png"}
        alt=""
        class="profile-image rounded-full aspect-square image mx-auto -translate-y-[50%]"
      />
      <!-- dimension -->
    </div>
    <p class="text-center text-400 text-[#181D27]">{user.name}</p>
    <p class="text-center text-[#ABABAB]">{user.title}</p>
    <p class="text-center max-w-[45ch] text-300 mx-auto pb-3">
      {user.description}
    </p>
    <div>
      {#if userId == id}
        {#each prv_array as info}
          {#each Object.keys(info) as key}
            <p
              class="bg-[#864AF9] bg-opacity-10 text-[#727272] my-1 mx-5 rounded-md px-2 leading-8"
            >
              {key.replaceAll("_", " ")}
            </p>
            {#if key == "Current_Rating"}
              <div class="flex my-1 mx-5 px-[10px]">
                {#each stars as star}
                  <div class="stars mx-[0.5px]">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.37453 9.04743L6.24047 8.96225L6.10641 9.04743L3.05522 10.9859L3.86951 7.31169L3.90082 7.17039L3.79388 7.07287L1.06909 4.58815L4.64415 4.26888L4.79664 4.25526L4.85382 4.11325L6.24047 0.669343L7.62712 4.11325L7.6843 4.25526L7.83679 4.26888L11.4118 4.58815L8.68706 7.07287L8.58012 7.17039L8.61143 7.31169L9.42572 10.9859L6.37453 9.04743Z"
                        fill="#864AF9"
                        stroke="#864AF9"
                        stroke-width="0.5"
                      />
                    </svg>
                  </div>
                {/each}
              </div>
            {:else}
              <p class="my-1 mx-5 px-[10px] font-medium">{info[key]}</p>
            {/if}
          {/each}
        {/each}
        <!-- <div>
          <a
            href="http://localhost:5174/client/profile/{userId}/editprofile"
          >
            <button
              class="block w-[93%] mt-10 mb-5 h-16 mx-auto bg-[#7360DF] text-white"
              >Edit profile</button
            >
          </a>
        </div> -->
      {:else}
        {#each pub_arr as info}
          {#each Object.keys(info) as key}
            <p
              class="bg-[#864AF9] bg-opacity-10 text-[#727272] my-1 mx-5 rounded-md px-2 leading-8"
            >
              {key.replaceAll("_", " ")}
            </p>
            {#if key == "Current_Rating"}
              <div class="flex my-1 mx-5 px-[10px]">
                {#each stars as star}
                  <div class="stars mx-[0.5px]">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.37453 9.04743L6.24047 8.96225L6.10641 9.04743L3.05522 10.9859L3.86951 7.31169L3.90082 7.17039L3.79388 7.07287L1.06909 4.58815L4.64415 4.26888L4.79664 4.25526L4.85382 4.11325L6.24047 0.669343L7.62712 4.11325L7.6843 4.25526L7.83679 4.26888L11.4118 4.58815L8.68706 7.07287L8.58012 7.17039L8.61143 7.31169L9.42572 10.9859L6.37453 9.04743Z"
                        fill="#864AF9"
                        stroke="#864AF9"
                        stroke-width="0.5"
                      />
                    </svg>
                  </div>
                {/each}
              </div>
            {:else}
              <p class="my-1 mx-5 px-[10px] font-medium">{info[key]}</p>
            {/if}
          {/each}
        {/each}
        <div>
          <button
            class="block w-[93%] mt-10 mb-5 h-16 mx-auto bg-[#7360DF] text-white"
            >Contact</button
          >
        </div>
      {/if}
    </div>
    <!-- <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.37453 9.04743L6.24047 8.96225L6.10641 9.04743L3.05522 10.9859L3.86951 7.31169L3.90082 7.17039L3.79388 7.07287L1.06909 4.58815L4.64415 4.26888L4.79664 4.25526L4.85382 4.11325L6.24047 0.669343L7.62712 4.11325L7.6843 4.25526L7.83679 4.26888L11.4118 4.58815L8.68706 7.07287L8.58012 7.17039L8.61143 7.31169L9.42572 10.9859L6.37453 9.04743Z" fill="#864AF9" stroke="#864AF9" stroke-width="0.5"/>
    </svg> -->
  </div>
</div>

<style>
  :root {
    --height: clamp(100px ,calc(8.8vw + 20px), 140px);
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
