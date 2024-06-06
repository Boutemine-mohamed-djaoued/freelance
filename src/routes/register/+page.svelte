<script>
  import { onMount } from "svelte";
  import LeftSide from "../../lib/components/register/LeftSide.svelte";
  import MainBtn from "../../lib/components/ui/MainButton.svelte";
  import { session } from "$lib/stores/Session.js";
  import { fly } from "svelte/transition";
  import { page } from "$app/stores";

  let vh = 0;
  let vw = 0;
  let height = 0;
  let height2 = 0;

  const updateDimensions = () => {
    vh = window.innerHeight;
    vw = window.innerWidth;
    height = Math.max(75, -15 + 0.125 * vh);
    height2 = Math.max(60, -30 + 0.125 * vh);
  };
  let flyParams;
  const handleResize = () => {
    if (window.innerWidth <= 1024) {
      flyParams = { x: 100 };
    } else {
      flyParams = { y: 100 };
    }
  };
  let oauth = 0;
  if ( $page.url.searchParams.get("oauth") != null ){
    oauth = $page.url.searchParams.get("oauth");
  }
  const email = $page.url.searchParams.get("email");
  const picture = $page.url.searchParams.get("picture");
  onMount(() => {
    sessionStorage.setItem("oauth", oauth);
    sessionStorage.email = JSON.stringify(email);
    sessionStorage.picture = JSON.stringify(picture);

    $session = "register";
    updateDimensions();
    handleResize();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  });

  let isMounted = false;

  let selected_img = "";
  function selectImg(img) {
    selected_img = img;
  }
</script>

<div
  class="flex full-width h-[100vh] bg-transparent max-lg:flex-col max-lg:"
  class:page={isMounted ? "mounted" : ""}
>
  <LeftSide number="1"></LeftSide>
  <div class="lg:hidden image h-[40%]"></div>
  <div
    class="register flex flex-col justify-center shrink lg:w-[35%] mx-auto p-3 gap-[8%] max-lg:h-[55%] max-lg:justify-center"
  >
    <h2 class="font-DMsans text-500 font-medium">Register as :</h2>
    <div class="flex gap-5">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <figure
        on:click={() => {
          selectImg("freelancerRegister");
        }}
        class=""
      >
        <!-- svelte-ignore a11y-structure -->
        <center
          ><figcaption class="h-[2rem] text-350/10 font-medium">
            Freelancer
          </figcaption></center
        >
        <div
          class:active={selected_img == "freelancerRegister"}
          class="relative w-fit"
        >
          <img
            src="/register/becomeFreelancer.png"
            alt="become freelancer"
            class="heightImage"
          />
          <!-- <div
            class:focus={selected_img == "freelancerRegister"}
            class="absolute inset-0 bg-pink-200 opacity-0 transition duration-200"
          ></div> -->
        </div>
      </figure>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <figure
        on:click={() => {
          selectImg("clientRegister");
        }}
        class=""
      >
        <!-- svelte-ignore a11y-structure -->
        <center
          ><figcaption class="h-[2rem] text-350/10 font-medium">
            Client
          </figcaption></center
        >
        <div
          class:active={selected_img == "clientRegister"}
          class="relative w-fit"
        >
          <img
            src="/register/becomeClient.png"
            alt="become freelancer"
            class="heightImage -z-10"
          />
          <!-- <div
            class:active={selected_img == "clientRegister"}
            class="absolute inset-0 bg-pink-200 opacity-0 transition duration-200"
          ></div> -->
        </div>
      </figure>
    </div>
    <div class="flex gap-4 items-center">
      <a href="/register/{selected_img}">
        <MainBtn title="Continue" customClass="btn-1" />
        <!-- customBoxShadow="0 0 10px rgba(0, 0, 0, 0.5);" -->
      </a>
      <a href="/" class="text-[#BE2AB1] font-semibold"> Back </a>
    </div>
  </div>
</div>

<style>
  * {
    font-family: "DM Sans", sans-serif;
  }
  .image {
    background-image: url("register/RectangleSmall.png");
    background-size: cover;
    background-position: center bottom;
  }
  @media (min-width: 1536px) {
    .heightImage {
      height: calc(200px + 2.5vw);
      width: auto;
    }
  }
  .active {
    border-color: #864af9;
    border-width: 4px;
    border-radius: 4px;
  }
</style>
