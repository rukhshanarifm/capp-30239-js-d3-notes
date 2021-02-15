import './main.css';
import {scaleLinear, scaleBand} from 'd3-scale';
import {extent} from 'd3-array';
import {axisBottom, axisTop, axisLeft, axisRight} from 'd3-axis';
import {select} from 'd3-selection';

const yVal = 'Displacement';
const xVal = 'Origin';

fetch('./data/cars.json')
  .then(d => d.json())
  .then(data => myBars(data));

//   constants
const height = 500;
const width = 500;
const margin = {top: 10, bottom: 50, right: 10, left: 50};
const plotHeight = height - margin.top - margin.bottom;
const plotWidth = width - margin.left - margin.right;

function uniques(data) {
  return Array.from(
    data.reduce((acc, row) => {
      return acc.add(row[xVal]);
    }, new Set()),
  );
}

function aggregateData(data) {
  const aggregatedData = data.reduce((acc, row) => {
    acc[row[xVal]] = (acc[row[xVal]] || 0) + Number(row[yVal]);
    return acc;
  }, {});
  return Object.entries(aggregatedData).map(row => {
    return {country: row[0], sum: row[1]};
  });
}

function myBars(data) {
  const aggData = aggregateData(data);
  // scales
  const origins = uniques(data);
  const xScale = scaleBand()
    .domain(origins)
    .range([0, plotWidth]);
  const naiveDomain = extent(aggData, d => d.sum);
  console.log(naiveDomain);
  const yScale = scaleLinear()
    .domain([0, naiveDomain[1]])
    .range([plotHeight, 0]);

  // selection
  const svg = select('#app')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  console.log(yScale.domain());
  svg
    .selectAll('rect')
    .data(aggData)
    .join('rect')
    .attr('x', d => xScale(d.country))
    .attr('y', d => {
      console.log(d, yScale(d.sum));
      return yScale(d.sum);
    })
    .attr('height', d => {
      return plotHeight - yScale(d.sum);
    })
    .attr('width', xScale.bandwidth())
    .attr('fill', 'steelblue')
    .attr('stroke', 'white');

  // axes
  const xAxis = axisBottom(xScale);
  svg
    .append('g')
    .call(xAxis)
    .attr('transform', `translate(0, ${plotHeight})`);
  const yAxis = axisLeft(yScale.range([plotHeight, 0]));
  svg.append('g').call(yAxis);
}
