import {
  csv,
  extent,
  scaleLinear,
  select,
  area,
  line,
  axisBottom,
  max,
} from 'd3';

// https://vizhub.com/sjengle/5a7cf326924944d8971a5f8b93a8166d?edit=files&file=data.csv
const height = 500;
const width = 400;
const margin = {top: 10, left: 50, right: 10, bottom: 50};
const plotWidth = width - margin.left - margin.right;
const plotHeight = height - margin.top - margin.bottom;
csv('./data/gun-deaths.csv')
  .then(d =>
    d.filter(row => Number(row.Year) >= 1990 && Number(row.Year) < 2013),
  )
  .then(data => {
    const xScale = scaleLinear()
      .domain(extent(data, d => Number(d.Year)))
      .range([0, plotWidth]);
    const yScale = scaleLinear()
      .domain([0, max(data, d => Number(d['Total by Firearm']))])
      .range([0, plotHeight]);

    const svg = select('#app')
      .append('svg')
      .attr('height', height)
      .attr('width', width)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const areaFunc = area()
      .x(d => xScale(Number(d.Year)))
      .y1(d => yScale(Number(d['Total by Firearm'])))
      .y0(yScale(yScale.domain()[0]));
    svg
      .append('path')
      .attr('d', areaFunc(data))
      .attr('fill', '#d01f22');

    const lineFunc = line()
      .x(d => xScale(Number(d.Year)))
      .y(d => yScale(Number(d['Total by Firearm'])));
    svg
      .append('path')
      .attr('d', lineFunc(data))
      .attr('stroke', 'black')
      .attr('fill', 'none');

    svg
      .append('g')
      .attr('class', 'x-axis')
      .call(axisBottom(xScale));
    svg
      .append('g')
      .attr('class', 'x-axis')
      .call(axisBottom(xScale));
    svg
      .append('g')
      .attr('class', 'dots')
      .selectAll('.murder-dot')
      .data(data)
      .join('circle')
      .attr('class', 'murder-dot')
      .attr('cx', d => xScale(Number(d.Year)))
      .attr('cy', d => yScale(Number(d['Total by Firearm'])))
      .attr('stroke', 'white')
      .attr('fill', 'black')
      .attr('r', 5);
  });
