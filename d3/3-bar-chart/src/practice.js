import './main.css';
import {scaleLinear, scaleBand} from 'd3-scale';
import {extent} from 'd3-array';
import {axisBottom, axisTop, axisLeft, axisRight} from 'd3-axis';
import {select} from 'd3-selection';

fetch('./data/cars.json')
  .then(x => x.json())
  .then(data => {
    myVis(data);
  });

function getUniques(data, key) {
  return Array.from(data.reduce((acc, row) => acc.add(row[key]), new Set()));
}

const HEIGHT = 400;
const WIDTH = 400;
const margin = {left: 50, right: 50, top: 50, bottom: 50};
const plotWidth = WIDTH - margin.left - margin.right;
const plotHeight = HEIGHT - margin.top - margin.bottom;

function prepData(data, xKey, yKey) {
  const groups = data.reduce((acc, row) => {
    acc[row[xKey]] = (acc[row[xKey]] || 0) + row[yKey];
    return acc;
  }, {});
  return Object.entries(groups).map(([x, y]) => ({x, y}));
}
function myVis(preData) {
  const data = prepData(preData, 'Origin', 'Weight_in_lbs');
  console.log(data);
  const xDomain = getUniques(data, 'x');
  const [yDomainMin, yDomainMax] = extent(data, x => Number(x.y));
  const xScale = scaleBand()
    .domain(xDomain)
    .range([0, plotWidth]);
  const yScale = scaleLinear()
    .domain([yDomainMax, 0])
    .range([plotHeight, 0]);

  const svg = select('#app')
    .append('svg')
    .attr('height', HEIGHT)
    .attr('width', WIDTH)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  svg
    // data bind
    .selectAll('rect')
    .data(data)
    // join
    .join('rect')
    // specify properties
    .attr('x', d => xScale(d.x) + xScale.bandwidth() / 2)
    .attr('y', d => plotHeight - yScale(d.y))
    .attr('height', d => yScale(d.y))
    .attr('width', xScale.bandwidth())
    .attr('fill', 'steelblue')
    .attr('stroke', 'white');

  svg
    .append('g')
    .call(axisBottom(xScale))
    .attr('transform', `translate(${margin.left}, ${plotHeight})`);
  svg
    .append('g')
    .call(axisLeft(yScale.range([0, plotHeight])))
    .attr('transform', `translate(${margin.left})`);
}
