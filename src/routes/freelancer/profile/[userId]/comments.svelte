<script>
  export let user;

</script>

<div class="p-6 bg-white ">
  {#each user.reviews as rev}
    <div class="border border-[#8A8A8A] p-2 bg-white mb-6 rounded-lg">
      <div class="flex justify-between">
        <div
          class="user_info flex ml-5 gap-3 items-center justify-start w-full"
        >
          <img
            src={rev.photo}
            alt="profile_image"
            class="w-[6vw] max-w-[60px] rounded-full"
          />
          <div class="">
            <h3 class="font-semibold text-300 2xl:text-400">{rev.name}</h3>
            <div class="flex">
              {#each Array(rev.rating) as rating}
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
          </div>
        </div>
        <div class="w-fit flex items-center">
          <p class="block w-[13ch] text-300 text-[#8A8A8A]">{rev.time}</p>
        </div>
      </div>
      <div class="mx-auto p-6">
        <p class="font-medium whitespace-normal max-w-[100ch] px-auto mx-auto ">
          {rev.review}
        </p>
        <div class="bg-[#B1B1B1] mt-8 bg-opacity-10 py-4 px-6 font-medium rounded-lg">
          <p>
            {rev.comment}
          </p>
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
</style>
