<script>
	import * as d3 from 'd3';
	import { onMount } from 'svelte';

	export let reviews;
	onMount(() => {
		const data = reviews.nums;
		let width = 130;
		let height = 130;
		if (window.innerWidth < 768) {
			width = 130;
			height = 130;
		} else {
			width = 200;
			height = 200;
		}
		const radius = Math.min(width, height) / 2;

		const svg = d3
			.select('#donut-chart')
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.append('g')
			.attr('transform', `translate(${width / 2}, ${height / 2})`);

		const colorScale = d3.scaleSequential().domain([5, 1]).interpolator(d3.interpolateRgb('rgba(59 ,52, 134,1)', 'rgba(59 ,52 ,134,0.5)'));

		const pie = d3.pie().value((d) => d);

		const arc = d3
			.arc()
			.innerRadius(radius * 0.7)
			.outerRadius(radius);

		const arcs = svg.selectAll('arc').data(pie(data)).enter().append('g').attr('class', 'arc');

		arcs
			.append('path')
			.attr('d', arc)
			.attr('fill', (d, i) => colorScale(i + 1));
	});
</script>

<div id="donut-chart"></div>
