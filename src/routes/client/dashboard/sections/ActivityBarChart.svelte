<script>
	import * as d3 from 'd3';
	import { onMount } from 'svelte';
	export let postedJobs;
	let total = 0;
	if (!postedJobs) {
		postedJobs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	}
	postedJobs = [1, 3, 18, 8, 10, 2, 7, 23, 16, 12, 22, 20];
	postedJobs = postedJobs.map((element) => {
		total += element;
		return element + 0.1 * d3.max(postedJobs);
	});
	onMount(() => {
		let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		let containerWidth = document.querySelector('.chart-container').offsetWidth;
		console.log(containerWidth);
		let svg = d3.select('#chart'),
			margin = { top: 40, right: 0, bottom: 30, left: 0 },
			width = containerWidth - margin.left - margin.right,
			height = +svg.attr('height') - margin.top - margin.bottom,
			g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		let x = d3
			.scaleBand()
			.rangeRound([0, width])
			.padding(containerWidth / 1600)
			.domain(months);

		let y = d3
			.scaleLinear()
			.rangeRound([height, 0])
			.domain([0, d3.max(postedJobs)]);

		g.selectAll('.bar')
			.data(postedJobs)
			.enter()
			.append('rect')
			.attr('class', 'bar')
			.attr('x', (d, i) => x(months[i]))
			.attr('y', (d) => y(d))
			.attr('width', x.bandwidth())
			.attr('height', (d) => height - y(d))
			.attr('fill', '#E9EDF7')
			.style('rx', '7');
		g.append('g')
			.attr('class', 'axis-x')
			.attr('transform', 'translate(0,' + height + ')')
			.call(d3.axisBottom(x));

		let maxPostedJobs = d3.max(postedJobs);

		let indexOfMax = postedJobs.indexOf(maxPostedJobs);
		let yPosition = y(maxPostedJobs) + 40;
		let bars = svg.selectAll('.bar');
		bars.each(function (d, i) {
			if (i === indexOfMax) {
				d3.select(this).attr('fill', '#864AF9');
			}
		});

		svg
			.append('line')
			.attr('x1', 0)
			.attr('y1', yPosition)
			.attr('x2', width)
			.attr('y2', yPosition)
			.style('stroke', '#864AF9') // Custom color for the line
			.style('stroke-dasharray', '5 5'); // Dashed line style

		svg
			.append('text')
			.attr('x', width - 120) // Position text to the right of the line
			.attr('y', yPosition - 10) // Align text with the line
			.text(Math.ceil(maxPostedJobs - 0.1 * d3.max(postedJobs)) + ' posted jobs') // Display the value
			.style('fill', '#864AF9') // Set text color
			.style('font-size', '14px'); // Set font size

		svg.selectAll('.axis-x path, .axis-x line').remove();

		svg.selectAll('.axis-x text').attr('fill', '#A3AED0').style('font-size', '14px');
	});
</script>

<section class="bg-white p-5 rounded-xl">
	<h4 class="text-gray-300">Posted Jobs</h4>
	<h2 class="text-500 text-primary-400">{total} total</h2>
	<div class="chart-container w-full">
		<svg id="chart" class="w-full" height="200"></svg>
	</div>
</section>

<style>
</style>
