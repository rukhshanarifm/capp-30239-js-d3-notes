import './main.css';
import {scaleLinear, scaleBand} from 'd3-scale';
import {extent} from 'd3-array';
import {select} from 'd3-selection';
import {axisBottom, axisLeft} from 'd3-axis';

fetch('./data/cars.json')
  .then(d => d.json())
  .then(d => myVis(d));

// constants
const height = 500;
const width = 500;
const margin = {left: 100, top: 10, bottom: 50, right: 10};
const plotWidth = width - margin.left - margin.right;
const plotHeight = height - margin.top - margin.bottom;

function uniques(data, key) {
  return Array.from(data.reduce((acc, row) => acc.add(row[key]), new Set()));
}

function prepareData(data) {
  const aggregatedData = data.reduce((acc, row) => {
    acc[row.Origin] = (acc[row.Origin] || 0) + Number(row.Weight_in_lbs);

    return acc;
  }, {});
  return Object.entries(aggregatedData).map(([country, sum]) => {
    return {country, sum};
  });
}

function myVis(data) {
  const preppedData = prepareData(data);
  const xScale = scaleBand()
    .domain(uniques(data, 'Origin'))
    .range([0, plotWidth]);
  const yScale = scaleLinear()
    .domain([extent(preppedData, d => d.sum)[1], 0])
    .range([plotHeight, 0]);

  const svg = select('#app')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  svg
    // data bind
    .selectAll('rect')
    .data(preppedData)
    // join
    .join('rect')
    // specify properties
    .attr('x', d => xScale(d.country))
    .attr('y', d => plotHeight - yScale(d.sum))
    .attr('height', d => yScale(d.sum))
    .attr('width', xScale.bandwidth())
    .attr('fill', 'steelblue')
    .attr('stroke', 'white');

  svg
    .append('g')
    .call(axisBottom(xScale))
    .attr('transform', `translate(${0},${plotHeight})`);
  svg.append('g').call(axisLeft(yScale.range([0, plotHeight])));
  // .attr('transform', `translate(${plotWidth})`);
}
