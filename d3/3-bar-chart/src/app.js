import './main.css';
import {json} from 'd3-fetch';
import {scaleLinear, scaleBand} from 'd3-scale';
import {extent} from 'd3-array';
import {select} from 'd3-selection';
import {axisBottom, axisLeft} from 'd3-axis';

json('./data/cars.json').then(myVis);

function unique(data, key) {
  return Array.from(data.reduce((acc, row) => acc.add(row[key]), new Set()));
}

const xDim = 'Origin';
const yDim = 'Weight_in_lbs';
const height = 500;
const width = 500;
const margin = {top: 50, bottom: 50, right: 50, left: 50};
const plotWidth = width - margin.left - margin.right;
const plotHeight = height - margin.top - margin.bottom;

function prepData(data, xKey, yKey) {
  const summedData = data.reduce((acc, row) => {
    const xVal = row[xKey];
    acc[xVal] = (acc[xVal] || 0) + row[yKey];
    return acc;
  }, {});
  return Object.entries(summedData).map(([x, y]) => ({x, y}));
}

function myVis(preData) {
  const data = prepData(preData, xDim, yDim);
  const xDomain = unique(data, 'x');
  const yDomain = extent(data, d => d.y);
  console.log(yDomain);
  const xScale = scaleBand()
    .domain(xDomain)
    .range([0, plotWidth]);
  const yScale = scaleLinear()
    .domain([0, yDomain[1]])
    .range([0, plotHeight]);

  const svg = select('#app')
    .append('svg')
    .attr('height', `${height}px`)
    .attr('width', `${width}px`)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const rectContainer = svg.append('g').attr('class', 'rect-container');
  rectContainer
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', d => xScale(d.x))
    .attr('y', d => plotHeight - yScale(d.y))
    .attr('height', d => yScale(d.y))
    .attr('width', xScale.bandwidth())
    .attr('fill', 'steelblue')
    .attr('stroke', 'white');

  svg
    .append('g')
    .attr('class', 'x-axis')
    .call(axisBottom(xScale))
    .attr('transform', `translate(0, ${plotHeight})`);

  svg
    .append('g')
    .attr('class', 'y-axis')
    .call(axisLeft(yScale.range([plotHeight, 0])))
    .attr('transform', `translate(0)`);
}
