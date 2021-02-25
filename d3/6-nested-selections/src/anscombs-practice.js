import './main.css';
import {scaleLinear} from 'd3-scale';
import {axisBottom, axisLeft} from 'd3-axis';
import {select} from 'd3-selection';
import {extent} from 'd3-array';
// import './anscombs-practice';

fetch('./data/anscombe.json')
  .then(x => x.json())
  .then(myVis);

const height = 300;
const width = 300;
const margin = {top: 10, left: 50, right: 10, bottom: 50};
const plotWidth = width - margin.left - margin.right;
const plotHeight = height - margin.top - margin.bottom;
function myVis(data) {
  console.log(data);
  const xDomain = extent(data, d => d.X);
  const yDomain = extent(data, d => d.Y);
  const xScale = scaleLinear()
    .domain(xDomain)
    .range([0, plotWidth]);
  const yScale = scaleLinear()
    .domain(yDomain)
    .range([plotHeight, 0]);

  const svg = select('#app')
    .append('svg')
    .attr('height', height * 2)
    .attr('width', width * 2)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  //   svg
  //     .selectAll('circle')
  //     .data(data)
  //     .join('circle')
  //     .attr('cx', d => xScale(d.X))
  //     .attr('cy', d => yScale(d.Y))
  //     .attr('fill', 'steelblue')
  //     .attr('r', 5);
  const groups = data.reduce((acc, row) => {
    acc[row.Series] = (acc[row.Series] || []).concat(row);
    return acc;
  }, {});
  console.log(groups);
  const containers = svg
    .selectAll('g.container')
    .data(Object.values(groups))
    .join('g')
    .attr('class', 'container')
    .attr('transform', (d, i) => {
      console.log(d, i);
      return `translate(${(i % 2) * width}, ${Math.floor(i / 2) * height})`;
    });
  containers
    .selectAll('.backgroundLetter')
    .data(d => [d[0]])
    .join('text')
    .attr('class', 'backgroundLetter')
    .attr('x', plotWidth / 2)
    .attr('y', plotHeight / 2)
    .attr('font-size', 100)
    .attr('text-anchor', 'middle')
    .text(d => d.Series)
    .attr('opacity', 0.5);
  containers
    .selectAll('circle')
    .data(d => d)
    .join('circle')
    .attr('cx', d => xScale(d.X))
    .attr('cy', d => yScale(d.Y))
    .attr('fill', 'steelblue')
    .attr('r', 5);
  containers
    .append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${plotHeight})`)
    .call(axisBottom(xScale));
  containers
    .append('g')
    .attr('class', 'y-axis')
    .call(axisLeft(yScale));
}
