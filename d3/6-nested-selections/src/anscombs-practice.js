import {scaleLinear, select, extent, axisBottom, axisLeft} from 'd3';

fetch('./data/anscombe.json')
  .then(d => d.json())
  .then(d => {
    smallMultiples(d);
  });

const height = 300;
const width = 300;
const margin = {top: 10, left: 50, right: 10, bottom: 50};
const plotWidth = width - margin.left - margin.right;
const plotHeight = height - margin.top - margin.bottom;
function smallMultiples(data) {
  const groups = data.reduce((acc, row) => {
    acc[row.Series] = (acc[row.Series] || []).concat(row);
    return acc;
  }, {});

  const xScale = scaleLinear()
    .domain(extent(data, d => d.X))
    .range([0, plotWidth]);
  const yScale = scaleLinear()
    .domain(extent(data, d => d.Y))
    .range([plotHeight, 0]);
  const svg = select('#app')
    .append('svg')
    .attr('height', height * 2)
    .attr('width', width * 2)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const containers = svg
    .selectAll('g.container')
    .data(Object.values(groups))
    .join('g')
    .attr('class', 'container')
    .attr('transform', (_, idx) => {
      const xShift = (idx % 2) * width;
      const yShift = Math.floor(idx / 2) * height;
      return `translate(${xShift}, ${yShift})`;
    });

  containers
    .append('text')
    .attr('transform', `translate(${plotWidth / 2}, ${plotHeight / 2})`)
    .text(d => d[0].Series)
    .attr('font-size', 100)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'central')
    .attr('fill-opacity', 0.3);

  containers
    .selectAll('circle')
    .data(d => d)
    .join('circle')
    .attr('cx', d => xScale(d.X))
    .attr('cy', d => yScale(d.Y))
    .attr('fill', 'steelblue')
    .attr('r', 5);
  containers
    .selectAll('g.x-axis')
    .data(d => d)
    .join('g')
    .attr('class', 'x-axis')
    .call(axisBottom(xScale))
    .attr('transform', `translate(0, ${plotHeight})`);
  containers
    .selectAll('g.y-axis')
    .data(d => d)
    .join('g')
    .attr('class', 'y-axis')
    .call(axisLeft(yScale));
}
