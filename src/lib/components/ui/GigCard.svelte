<script>
  export let gig;
	import {job} from "$lib/stores/FeedState.js";
  let photos = [
    "https://firebasestorage.googleapis.com/v0/b/freelydz.appspot.com/o/uploads%2F1717601937121%20%20photo_2024-06-05_16-33-13.jpg?alt=media&token=4e38aa45-48c0-4228-8254-79160f03d2a7",
    "https://firebasestorage.googleapis.com/v0/b/freelydz.appspot.com/o/uploads%2F1717601940043%20%20photo_2024-06-05_16-33-18.jpg?alt=media&token=1efd038c-565a-4736-8add-7830e8398f7a",
    "https://firebasestorage.googleapis.com/v0/b/freelydz.appspot.com/o/uploads%2F1717601947978%20%20photo_2024-06-05_16-33-25.jpg?alt=media&token=b6d9eb79-1dca-40ab-a07f-36a05349a25d",
    "https://firebasestorage.googleapis.com/v0/b/freelydz.appspot.com/o/uploads%2F1717601960060%20%20photo_2024-06-05_16-33-30.jpg?alt=media&token=ca1b0e8b-929f-4f48-b674-c95427abfbb2",
    "https://firebasestorage.googleapis.com/v0/b/freelydz.appspot.com/o/uploads%2F1717601989757%20%20photo_2024-06-05_16-33-37.jpg?alt=media&token=8212b37b-e132-4bcd-8c10-9f3249760d93",
    "https://firebasestorage.googleapis.com/v0/b/freelydz.appspot.com/o/uploads%2F1717601998563%20%20photo_2024-06-05_16-33-41.jpg?alt=media&token=f3489392-619b-4080-91ba-05a733ec9696",
    "https://firebasestorage.googleapis.com/v0/b/freelydz.appspot.com/o/uploads%2F1717601934664%20%20photo_2024-06-05_16-32-55.jpg?alt=media&token=ef9ca78a-5f19-4141-872d-4935416f9cac",
  ];
  if (!gig.clientInfo.photo) {
    // gig.clientInfo.photo = photos[Math.floor(Math.random() * photos.length)];
		// $job.photo = gig.clientInfo.photo ;
		// console.log($job);
  }
  console.log(gig);
</script>

<button on:click class="card text-left items-center rounded-md gap-3 md:gap-x-5 bg-white p-3 md:p-5 my-3 md:my-5 w-full">
  <div class="shrink-0 w-16 lg:w-20 aspect-square rounded-full bg-gray-200">
    <img class="rounded-full w-full h-full" src={gig.clientInfo.photo || "/defaultProfile.svg"} alt="" />
  </div>
  <div class="">
    <div class="flex items-center">
      <p>{gig.clientInfo.firstName} {gig.clientInfo.lastName}</p>
      {#if (new Date().getTime() - new Date(gig.createdAt).getTime()) / (60 * 60 * 24 * 1000) < 3}
        <span class="text-[0.8em] mx-2 bg-primary-300 bg-opacity-20 px-2 rounded-sm text-primary-300">New</span>
      {/if}
    </div>
    <h2 class="text-400 font-semibold my-1 md:my-2 text-ellipsis">
      {gig.title}
    </h2>
  </div>
  <div class="col-start-1 lg:col-start-2 col-end-3">
    <div class="flex max-md:gap-2 justify-between text-gray-500">
      <div class="flex 2xl:flex-1 max-md:hidden">
        <img class="w-5 mr-1 opacity-70" src="/general/case.svg" alt="" />
        <p class="shrink-0">{gig.expertize_level}</p>
      </div>
      <div class="flex 2xl:flex-1">
        <img class="w-5 mr-1" src="/general/Clock.svg" alt="" />
        <p class="shrink-0">{gig.payment_structure}</p>
      </div>
      <div class="flex 2xl:flex-1">
        <img class="w-5 mr-1" src="/general/CurrencyDollar.svg" alt="" />
        <p class="shrink-0">{gig.price}</p>
      </div>
      <div class="flex 2xl:flex-1">
        <img class="w-5 mr-1" src="/general/CalendarBlank.svg" alt="" />
        <p class="shrink-0">{gig.deadline.slice(0, 10)}</p>
      </div>
    </div>
    <p class="text-gray-500 my-4">{gig.description}</p>
  </div>
</button>

<style>
  .card {
    display: grid;
    grid-template-columns: min-content auto;
    grid-template-rows: auto auto;
  }
</style>
