import {json, scaleLinear, extent, select, axisBottom, axisLeft} from 'd3';

function prep(data) {
  return data.reduce((acc, row) => {
    acc[row.Series] = (acc[row.Series] || []).concat(row);
    return acc;
  }, {});
}

// constant
const height = 300;
const width = 300;
const margin = {top: 10, left: 50, right: 10, bottom: 50};
const plotWidth = width - margin.left - margin.right;
const plotHeight = height - margin.top - margin.bottom;

json('./data/anscombe.json').then(unpreppedData => {
  const data = prep(unpreppedData);
  const xScale = scaleLinear()
    .domain(extent(unpreppedData, d => d.X))
    .range([0, plotWidth]);
  const yScale = scaleLinear()
    .domain(extent(unpreppedData, d => d.Y))
    .range([plotHeight, 0]);

  const svg = select('#app')
    .append('svg')
    .attr('height', height * 2)
    .attr('width', width * 2)
    .append('g')
    .attr('transform', 'translate(20,20)');

  const containers = svg
    .selectAll('g.chart-container')
    .data(Object.values(data))
    .join('g')
    .attr('class', 'chart-container')
    .attr('transform', (_, idx) => {
      const xShift = (idx % 2) * width;
      const yShift = Math.floor(idx / 2) * height;
      return `translate(${xShift}, ${yShift})`;
    });
  // letters
  const romanLetters = ['I', 'II', 'III', 'IV'];
  containers
    .append('text')
    .text((d, idx) => romanLetters[idx])
    .attr('font-size', 100)
    .attr('transform', `translate(${plotWidth / 2},${plotHeight / 2})`)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'central')
    .attr('opacity', 0.1);
  // circles
  containers
    .selectAll('circle')
    .data(d => d)
    .join('circle')
    .attr('cx', d => xScale(d.X))
    .attr('cy', d => yScale(d.Y))
    .attr('r', 5)
    .attr('fill', 'steelblue')
    .attr('stroke', 'white');
  // axes
  containers
    .selectAll('g.x-axis')
    .data(d => d)
    .join('g')
    .attr('class', 'x-axis')
    .call(axisBottom(xScale))
    .attr('transform', `translate(0,${plotHeight})`);
  containers
    .selectAll('g.y-axis')
    .data(d => d)
    .join('g')
    .attr('class', 'y-axis')
    .call(axisLeft(yScale));
});
