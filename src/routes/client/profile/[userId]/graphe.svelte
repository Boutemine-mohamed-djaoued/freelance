<script>
  import chartjs from "chart.js";
  import { onMount } from "svelte";

  export let graphdata;

  let chart;
  let ctx;
  let chartCanvas;

  let type = "earning";
  let typedate = "week";
  let totalearning = 0;

  // Initialize the chart on component mount
  onMount(() => {
    ctx = chartCanvas.getContext("2d");
    chart = new chartjs(ctx, {
      type: "line",
      data: {
        labels: graphdata[type][typedate].chartLabels,
        datasets: [
          {
            label: "Earning",
            backgroundColor: "rgba(134, 74, 249, 0.2)",
            borderColor: "#864AF9",
            data: graphdata[type][typedate].chartValues,
          },
        ],
      },
    });

    // Initialize total earning
    totalearning = graphdata[type][typedate].chartValues.reduce(
      (sum, value) => sum + value,
      0
    );
  });

  // Update the chart and total earning when type or typedate change
  $: if (chart && graphdata[type][typedate]) {
    chart.data.labels = graphdata[type][typedate].chartLabels;
    chart.data.datasets[0].data = graphdata[type][typedate].chartValues;
    chart.update();

    totalearning = graphdata[type][typedate].chartValues.reduce(
      (sum, value) => sum + value,
      0
    );
  }

  // Function to determine background color based on active state
  function getBgColor(currentType, selectedType) {
    return currentType === selectedType ? "#864AF9" : "#FFFFFF";
  }

  function getTextColor(currentType, selectedType) {
    return currentType === selectedType ? "#FFFFFF" : "#8A8A8A";
  }
</script>
<div class="bg-white rounded-xl">
<div class="flex justify-between">
  <div class="flex justify-center">
    <div
      class="py-1 m-2 px-6 rounded-md border cursor-pointer text-250"
      style="background-color: {getBgColor(
        type,
        'earning'
      )}; color: {getTextColor(type, 'earning')};"
      on:click={() => (type = "earning")}
    >
      <p>Earning</p>
    </div>
    <div
      class="py-1 m-2 px-6 rounded-md border cursor-pointer text-250"
      style="background-color: {getBgColor(
        type,
        'proposals'
      )}; color: {getTextColor(type, 'proposals')};"
      on:click={() => (type = "proposals")}
    >
      <p>Proposals</p>
    </div>
  </div>
  <div class="flex justify-center">
    <div
      class="my-auto m-2 px-3 rounded-md border cursor-pointer text-250"
      style="background-color: {getBgColor(
        typedate,
        'week'
      )}; color: {getTextColor(typedate, 'week')};"
      on:click={() => (typedate = "week")}
    >
      <p>Week</p>
    </div>
    <div
      class="my-auto m-2 px-3 rounded-md border cursor-pointer text-250"
      style="background-color: {getBgColor(
        typedate,
        'month'
      )}; color: {getTextColor(typedate, 'month')};"
      on:click={() => (typedate = "month")}
    >
      <p>Month</p>
    </div>
    <div
      class="my-auto m-2 px-3 rounded-md border cursor-pointer text-250"
      style="background-color: {getBgColor(
        typedate,
        'year'
      )}; color: {getTextColor(typedate, 'year')};"
      on:click={() => (typedate = "year")}
    >
      <p>Year</p>
    </div>
  </div>
</div>
<div class="flex justify-between">
  <div class="flex justify-center items-center">
    <p class="text-[#8D00BB] text-400 mx-3">{totalearning}DZD</p>
    <p class="text-300">Total {type} this {typedate}!</p>
  </div>
</div>
<canvas bind:this={chartCanvas} id="myChart"></canvas>
</div>
<style>
  * {
    font-family: "DM Sans", sans-serif;
  }
  .text-250 {
    font-size: 16px;
  }
</style>
