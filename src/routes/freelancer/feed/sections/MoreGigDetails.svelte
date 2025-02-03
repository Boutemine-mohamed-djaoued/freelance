<script>
  import getFileType from "$lib/util/getFileType.js";
  import { showDetails, job } from "$lib/stores/FeedState";
  let gigIcons;
  async function downloadFile(url, filename) {
    const link = document.createElement("a");
    let data = await fetch(url);
    let res = await data.blob();
    const aElement = document.createElement("a");
    aElement.setAttribute("download", filename);
    const href = URL.createObjectURL(res);
    aElement.href = href;
    aElement.setAttribute("target", "_blank");
    aElement.click();
    URL.revokeObjectURL(href);
  }

  job.subscribe((value) => {
    if (value) {
      gigIcons = [
        {
          icon: "/general/MapPinLine.svg",
          text: value.expertize_level,
        },
        {
          icon: "/general/Clock.svg",
          text: value.payment_structure,
        },
        {
          icon: "/general/CurrencyDollar.svg",
          text: value.price,
        },
        {
          icon: "/general/CalendarBlank.svg",
          text: value.deadline.slice(0, 10),
        },
      ];
    }
  });
</script>

{#if $job}
  <section class:max-md:hidden={$showDetails === 2} class="p-7 pt-4 md:p-10 md:max-w-[40rem]">
    <button class="back-button" on:click={() => showDetails.set(0)}>
      <img class="w-5 md:w-8" src="/general/back.svg" alt="" />
    </button>
    <h3 class="text-center md:text-400">{$job.title}</h3>
    <div class="tags flex my-5 md:my-10 justify-around text-gray-500">
      {#each gigIcons as icon}
        <div class="">
          <img class="w-6 md:w-8 mb-3 mx-auto" src={icon.icon} alt="" />
          <p class="shrink-0 max-md:text-[0.9em]">{icon.text}</p>
        </div>
      {/each}
    </div>
    <div>
      <p class="description text-gray-500 text-justify">{$job.description}</p>
    </div>
    <h3 class="files mt-10 text-400">Files Uploaded:</h3>
    <div class="my-5">
      {#if $job.attachments}
        {#each $job.attachments as file}
          <div class="flex my-3 justify-between text-gray-500">
            <div class="flex items-center gap-2">
              <div class="relative">
                <img class="w-12" src={`/fileTypes/${getFileType(file.kind)}.svg`} alt="" />
                <button on:click={() => downloadFile(file.link, file.kind)} class="my-button">
                  <img src="/general/download.svg" alt="" />
                </button>
              </div>
              <p>{file.link.slice(0, 10)}</p>
            </div>
          </div>
        {/each}
      {:else}
        <p>no attachements</p>
      {/if}
    </div>
    <div class="flex justify-between text-center my-7 gap-3 md:gap-10">
      <div>
        <span class="font-medium">Job Size</span>
        <p class="my-2 text-gray-500">{$job.job_size}</p>
      </div>
      <div>
        <span class="font-medium">Payement Structure</span>
        <p class="my-2 text-gray-500">{$job.payment_structure}</p>
      </div>
      <div>
        <spa class="font-medium">Payement Method</spa>
        <p class="my-2 text-gray-500">CCP</p>
      </div>
    </div>
    <h3 class="text-400">Skills & technologies:</h3>
    <div class="flex flex-wrap gap-x-3 gap-y-3 mt-3">
      {#each $job.tags as skill}
        <p class="bg-gray-200 text-[0.85em] py-1 px-5 rounded-lg">{skill}</p>
      {/each}
    </div>
  </section>
{/if}

<style>
  .my-button {
    position: absolute;
    background-color: rgba(51, 51, 51, 0.6);
    inset: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    border-radius: 0.5rem;
    opacity: 0;
  }
  .my-button:hover {
    opacity: 1;
  }
</style>
