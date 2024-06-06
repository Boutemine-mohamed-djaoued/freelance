<script>
  import Infos from "./Infos.svelte";
  import Comments from "./comments.svelte";
  import Graphe from "./graphe.svelte";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import makeQuery from "$lib/util/makeQuery.js";
  import { FreelancerProfileQuery } from "$lib/util/queries.js";
  import { Spinner } from "flowbite-svelte";

  let loading = false;

  const userId = $page.params.userId;
  console.log(userId);
  let data;

  let id;
  let token;

  var user = {
    name: "moncef",
    pfp: "",
    title: "front-end",
    description:
      "Quis eiusmod deserunt cillum laboris magna cupidatat esse labore irure quis cupidatat in. Mollit in laborum tempor Lorem incididunt irure.",
    email: "a.selloum@esi-sba.dz",
    password: "msdf",
    CCP: "2345678",
    Education: "2nd year",
    Birthday: "01/02/2005",
    skills: ["nothing"],
    website: "https://www.google.com",
    activeJobs: 3,
    jobsCompleted: 14,
    moneyMade: 12341.89,
    rating: 5,
    phone: "0667075016",
    wilaya: "Batna",
    reviews: [
      {
        photo: "/register/UserImage.png",
        name: "Djawed",
        rating: 4,
        review:
          "lorem lorem Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam aspernatur a odit hic, sunt voluptatibus quam nam, explicabo perspiciatis soluta facilis id laborum pariatur consequuntur necessitatibus quaerat optio labore minima? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam aspernatur a odit hic, sunt voluptatibus quam nam, explicabo perspiciatis soluta facilis id laborum pariatur consequuntur necessitatibus quaerat optio labore minima?",
        comment: "i don't know really !!",
        time: "2 weeks ago",
      },
      {
        photo: "/register/UserImage.png",
        name: "Abdessamed",
        rating: 5,
        review:
          "lorem lorem lorem ipsum dolor sit amet consectetur, adipisicing elit. magnam aspernatur a odit hic, sunt voluptatibus quam nam, explicabo perspiciatis soluta facilis id laborum pariatur consequuntur necessitatibus quaerat optio labore minima? lorem ipsum dolor sit amet consectetur, adipisicing elit. magnam aspernatur a odit hic, sunt voluptatibus quam nam, explicabo perspiciatis soluta facilis id laborum pariatur consequuntur necessitatibus quaerat optio labore minima?",
        comment: "Nassim fuck yourself",
        time: "2 weeks ago",
      },
      {
        photo: "/register/UserImage.png",
        name: "Djawed",
        rating: 4,
        review:
          "lorem lorem lorem ipsum dolor sit amet consectetur, adipisicing elit. magnam aspernatur a odit hic, sunt voluptatibus quam nam, explicabo perspiciatis soluta facilis id laborum pariatur consequuntur necessitatibus quaerat optio labore minima? lorem ipsum dolor sit amet consectetur, adipisicing elit. magnam aspernatur a odit hic, sunt voluptatibus quam nam, explicabo perspiciatis soluta facilis id laborum pariatur consequuntur necessitatibus quaerat optio labore minima?",
        comment: "i don't know really !!",
        time: "2 weeks ago",
      },
    ],
  };

  onMount(() => {
    id = localStorage.id;
    if (!id) {
      console.log("cannot get id");
    }
    token = localStorage.token;
    if (!token) {
      console.log("cannot get token");
    }
    register();
  });

  async function register() {
    try {
      const res = await makeQuery(FreelancerProfileQuery, {
        freelancerProfileId: id,
      }, {
          "Content-Type": "application/json",
          "Authorization" : token
        }, );
      console.log(res);
      data = res.data.freelancerProfile.freelancer;
      loading = false;
      user.name = data.firstName + " " + data.lastName;
      console.log(user.name);
      user.CCP = data.ccp;
      user.email = data.email;
      user.wilaya = data.willaya;
      user.Birthday = data.dateOfBirth;
      user.password = data.password;
      user.phone = data.phoneNumber;
      user.skills = data.skills;
      // user.reviews = res.data.freelancerProfile.comments;
      user.description = data.description;

      if (res.errors) {
        throw res.errors;
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Reactive statement to update prv_array and pub_arr when user changes
  $: prv_array = [
    { Date_of_birth: user.Birthday },
    { Wilaya: user.wilaya },
    { Current_Rating: user.rating },
    { Phone_number: user.phone },
    { Email: user.email },
  ];

  $: pub_arr = [
    { Date_of_birth: user.Birthday },
    { Wilaya: user.wilaya },
    { Current_Rating: user.rating },
    { Phone_number: user.phone },
  ];

  let graphdata = {
    earning: {
      week: {
        chartValues: [800, 600, 3000, 200, 4800, 0, 400],
        chartLabels: [
          "day 1",
          "day 2",
          "day 3",
          "day 4",
          "day 5",
          "day 6",
          "day 7",
        ],
      },
      month: {
        chartValues: [2800, 6200, 3600, 6000],
        chartLabels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      },
      year: {
        chartValues: [
          28000, 6200, 33600, 45000, 52900, 10000, 78900, 13240, 5000, 15000,
          12000, 25500,
        ],
        chartLabels: [
          "month 1",
          "month 2",
          "month 3",
          "month 4",
          "month 5",
          "month 6",
          "month 7",
          "month 8",
          "month 9",
          "month 10",
          "month 11",
          "month 12",
        ],
      },
    },
    proposals: {
      week: {
        chartValues: [],
        chartLabels: [
          "day 1",
          "day 2",
          "day 3",
          "day 4",
          "day 5",
          "day 6",
          "day 7",
        ],
      },
      month: {
        chartValues: [],
        chartLabels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      },
      year: {
        chartValues: [],
        chartLabels: [
          "month 1",
          "month 2",
          "month 3",
          "month 4",
          "month 5",
          "month 6",
          "month 7",
          "month 8",
          "month 9",
          "month 10",
          "month 11",
          "month 12",
        ],
      },
    },
  };

  let translateY = 0;

  let dateString = "01/02/2005";
  let [day, month, year] = dateString.split("/");
  day = day.replace(/^0+/, "");
  let dateObject = new Date(`${month}/${day}/${year}`);

  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  let monthName = monthNames[dateObject.getMonth()];

  let formattedDate = `${day}${getDaySuffix(
    day
  )} ${monthName} ${dateObject.getFullYear()}`;

  user.Birthday = formattedDate;

  function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
</script>

{#if !loading}
  <div class="lg:grid lg:grid-cols-5 m-8 gap-8 max-lg:flex max-lg:flex-col">
    <div
      class="col-span-2 lg:min-w-[40%] max-lg:mx-auto max-lg:my-8 max-lg:w-full"
    >
      <Infos {user} {pub_arr} {prv_array} {userId} {id} />
    </div>

    <div class="col-span-3">
      <div class="mb-8">
        <Graphe {graphdata} />
      </div>
      <div>
        <Comments {user} />
      </div>
    </div>
  </div>
{:else}
  <div class="text-center flex items-center min-h-[85vh] justify-center">
    <Spinner color="purple" size="16" />
  </div>
{/if}

<style>
  * {
    font-family: "DM Sans", sans-serif;
  }
</style>
