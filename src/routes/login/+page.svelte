<script>
  import { onMount } from "svelte";
  import LeftSide from "$lib/components/register/LeftSide.svelte";
  import { session , id, token, user } from "$lib/stores/Session.js";
  import MainBtn from "$lib/components/ui/MainButton.svelte";
  import makeQuery from "$lib/util/makeQuery.js";
  import { loginQuery } from "$lib/util/queries.js";
  import { goto } from "$app/navigation";
  import { fade } from "svelte/transition";


  onMount(() => {
    $session = "register";
  });
  let email = "";
  let password = "";

  async function submit(e) {
    e.preventDefault(); // doesn't refresh the page
    try {
      const res = await makeQuery(loginQuery,{
        email: email,
        password: password,
      },{"Content-Type" : 'application/json'});
      console.log(res);
      const data = res.data;
      if (data.login == null) {
      } else {
        // console.log(data.login.token);
        // console.log(data.login.user.id);
        console.log("this is token: " + data.login.token);
        console.log("this is user" +  data.login.user.id);
        localStorage.token = data.login.token;
        localStorage.id = data.login.user.id;
        $id = data.login.user.id;
        $token = data.login.token;
        $user = data.login.user;
        console.log($user);
        if ( data.login.user.role == 'freelancer'){
          $session = "freelancer";
          goto(`/freelancer/feed`);
        }else{
          $session = "client";
          console.log(data.login.user.role);
          goto(`/client/talents`);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  let isHovered = false;

  function handleHover() {
    isHovered = !isHovered;
    console.log(isHovered);
  }
</script>

<div class="flex full-width h-[100vh] bg-transparent max-lg:flex-col">
  <LeftSide number="0"></LeftSide>
  <div class="lg:hidden image h-[400%]"></div>
  <div class="flex flex-col justify-center min-h-[100vh] lg:w-[50%] mx-auto">
    <form on:submit={submit} class="mx-auto w-[90%] lg:w-[55%]">
      <h2 class="text-500 m-3 ml-0">Login</h2>
      <input type="email" placeholder="Email Address" bind:value={email} />
      <input type="password" placeholder="Password" bind:value={password} />
      <div class="flex justify-start gap-8 mt-8 items-center">
        <MainBtn title="Login" customClass="btn-1 h-fit" type="submit" />

        <a href="http://localhost:8000/google" >
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div
            class="login-with-google rounded-2xl"
            on:mouseenter={handleHover}
            on:mouseleave={handleHover}
          >
            <i class="fa fa-google">
              <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="inline"
            >
              <rect width="32" height="32" fill="url(#pattern0_2060_1221)" />
              <defs>
                <pattern
                  id="pattern0_2060_1221"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use xlink:href="#image0_2060_1221" transform="scale(0.03125)" />
                </pattern>
                <image
                  id="image0_2060_1221"
                  width="32"
                  height="32"
                  xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA7AAAAOwBeShxvQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAARRSURBVFiFvZddbFN1GMZ///85XTfolqwDtpWBmywGMj5MNr4kIBeGwQAvDJgQTIw6Y0JiTLxDQqiGmJhwRUS90kj0ghli2JQpQe00ENBBJEgkk+/gWPcpC2vXtef/esE2R3fangHzuWr/z3ue5znn9H3fVOERsmHpTHzDW4G1CMtRVADFV+6l8rUiaSmGbcU1n1JHC5z4x0WRzl4vuiqn8caFldhmD8IOYGY633EvOekajWKGxTmfsRrnRP76/aECyKZqP5YOI7wN5GWqcwswUTzg022J1LyNVZHIsOcAsnFhJZZpBpZkVPcQYAx+rQYLLV1fcvLKmXTOnmS+5alliGkFynMqe0TCSBGYVqA4ndMPmDcsegLhsZqPwa855XY+/gpke00eQ8nfUCzNoRUFjoH6FUxXT8KsMiKVSVGrEo550km7KYBCn24Lnby63k3sv1cQT+3NYR4F9Q5D5YdVJJKacP7t2Ie+TdVFI0n5cMgxOx1zP0g2cxh9AnKJ+Vyd0cLhkEVc10yqEtWGJdtUS4en3u7fsGBxLCVf2oqLZT9ceylb7ViAT4A3EIRI8DTfzVqAUDZa8zNDI/UqcsO1jR4VStqZQQFRIDB+OqJjHClr549AFY6pVa1XeqbD/H6AS7wIHHFlh61XVa3z2XSZA2iEZzNw3YjzxXSaA9go6lwZoVnVkXPMzd19uyRl68MoSqdiLOAg6pANzHOt0Jz1IpTy26vFmIapmI9DSbHGZTyOotObijNp8EwBpdkuzrmqHwP8GhhwpQyh/yHAgAZuZSBXeBSJPUKAThvhHIqVkyjF89LOrlydECX0YymdjQZmufFKtB8l+3BZUqI4n3UQDWO9VlDjfOrpXjJgzt47u1ByyJUU9bL7KIbY10Nl7W/2LKm6q+zaew2tDzWKZ4VvhbSxL+D+dBLJRH6pVnXEgLGJJ5dHAqeW3lo32Bhdti5u9Lw8xxyt/Gl9/lTNZ4e7A9rYTRnMQfHVwAfBu+Pr+K7xHXule5ndFitZ7FL+iy8p26IvnOj2Yj56503AmgwlxtHU9IVDl8d7PdhS/x6wN4tuN7Cnv7z3c+rOuf8wm9YHggn7oH31o3pMIGMbK8XB6Luht2DisGnanhcsGDwLPJ0lBAp6BI4BZ0WkSwaTy0FViSMrGXGqMWhtV1z33TxQleH6y5amtjMcij0YAChp2TJXSJ4BKrKFmAinM+7qkte3L6rii9IXVK/RZk1vuKJj7OCB3uzb+s3foq0GPO+BDBBIlh5I7/suo6mfaD4pAMDA5uMXjbaeAbL+pcqZITk02wSbr41+vaC1Wt0bDp1Pr3NdRv9sPn6zP160UoT3gZGHDZEqbCoTxf7ZemBFV7j8hltNzo1X3PLcfI21W2AnUJjOu/4GNKJ81p/a73u9f8eJ09n0Pa/ciqbtBbH8wa2iWKtgOUgFEHTuDBegtKO0xPGp6yh9MpDw7b/d+H2/F91/AR2/laOxS1LoAAAAAElFTkSuQmCC"
                />
              </defs>
            </svg>
            </i>

            {#if isHovered}
              <!-- Conditionally render the text -->
              <span class="text font-semibold" transition:fade> sign in with Google </span>
              <!-- Apply fade transition -->
            {/if}
          </div>
          </a>
      </div>
      <div class="mt-6"><a href="./login/recoverpassword" class="font-semibold text-[#BE2AB1] mt-6">forgot password ?</a></div>
    </form>
  </div>
</div>

<style>
  * {
    font-family: "DM Sans", sans-serif;
  }
  .image {
    background-image: url("/register/RectangleSmall.png");
    background-size: cover;
    background-position: center bottom;
  }
  input {
    margin: 10px 0;
    border-radius: 5px;
    border: solid #c499f3 1px;
    color: #747474;
    font-weight: 400;
    width: 100%;
    height: max(41px, 4.7vh);
  }
  .login-with-google {
    width: 50px; /* Initial width */
    overflow: hidden; /* Hide overflow */
    background-color: #fff; /* Google blue color */
    color: #000;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 6px;
    cursor: pointer;
    transition:  width 0.6s ease-in-out, opacity 1s ease-in-out;
    border: solid #c499f3 1px;
    white-space: nowrap;

    height: 50px;
  }

  .login-with-google:hover {
    width: 20ch; /* Width on hover */
    opacity: 1;
  }

  .text {
    margin-left: 10px; /* Initially hidden */
  }
</style>
