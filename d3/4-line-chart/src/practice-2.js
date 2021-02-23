import './main.css';
import {
  csv,
  extent,
  scaleLinear,
  scaleTime,
  select,
  area,
  line,
  axisBottom,
  axisLeft,
  max,
} from 'd3';

const height = 350;
const width = 400;
const margin = {top: 10, left: 50, right: 10, bottom: 50};
const plotWidth = width - margin.left - margin.right;
const plotHeight = height - margin.top - margin.bottom;
csv('./data/gun-deaths.csv')
  .then(d =>
    d.filter(row => Number(row.Year) >= 1990 && Number(row.Year) < 2013),
  )
  .then(myVis);

const yDim = 'Total by Firearm';
function myVis(data) {
  const yDomain = extent(data, d => Number(d[yDim]));
  const xDomain = extent(data, d => new Date(d.Year));
  const xScale = scaleTime()
    .domain(xDomain)
    .range([0, plotWidth]);
  const yScale = scaleLinear()
    .domain([0, 1000])
    .range([0, plotHeight]);

  const areaFunc = area()
    .x(d => xScale(new Date(d.Year)))
    .y1(d => yScale(d[yDim]))
    .y0(yScale(yScale.domain()[0]));

  const svg = select('#app')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  svg
    .append('g')
    .call(axisBottom(xScale).ticks(3))
    .attr('transform', `translate(${0}, ${plotHeight})`);

  svg
    .append('g')
    .attr('class', 'y-axis')
    .call(
      axisLeft(yScale)
        .tickSize(-width)
        .ticks(6),
    );
  svg
    .selectAll('.red-area')
    .data([data])
    .join('path')
    .attr('class', 'red-area')
    .attr('d', d => areaFunc(d))
    .attr('fill', 'red')
    .attr('opacity', 0.5);
  // .attr('stroke', 'black');

  // .attr('transform', `translate(${0}, ${plotHeight})`);
}
ain;
