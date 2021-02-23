import './main.css';
import {csv} from 'd3-fetch';
import {scaleLinear, scaleTime} from 'd3-scale';
import {extent} from 'd3-array';
import {area, line} from 'd3-shape';
import {select} from 'd3-selection';
import {axisBottom, axisLeft} from 'd3-axis';

const myMax = (data, key) => Math.max(...data.map(x => Number(x[key])));

const height = 400;
const width = 400;
const margin = {left: 50, top: 50, bottom: 50, right: 50};
const plotWidth = width - margin.left - margin.right;
const plotHeight = height - margin.top - margin.bottom;
const yDim = 'Total by Firearm';

csv('./data/gun-deaths.csv')
  .then(x => x.filter(({Year}) => Number(Year) >= 1990 && Number(Year) <= 2012))
  .then(data => {
    const xDomain = extent(data, d => new Date(d.Year));
    const xScale = scaleTime()
      .domain(xDomain)
      .range([0, plotWidth]);
    const yScale = scaleLinear()
      .domain([0, 1000])
      .range([0, plotWidth]);

    const areaScale = area()
      .x(d => xScale(new Date(d.Year)))
      .y0(yScale(yScale.domain()[0]))
      .y1(d => yScale(d[yDim]));
    const lineScale = line()
      .x(d => xScale(new Date(d.Year)))
      .y(d => yScale(d[yDim]));

    const svg = select('#app')
      .append('svg')
      .attr('height', height)
      .attr('width', width)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    svg
      .append('g')
      .attr('class', 'x-axis')
      .call(
        axisBottom(xScale)
          .tickValues(['1995', '2005', '2011'].map(x => new Date(x)))
          .tickSize(0)
          .tickFormat(row => {
            const yearMap = {1994: '1990s', 2004: '2000s', 2010: '2010s'};
            return yearMap[row.getFullYear()];
          }),
      )
      .attr('transform', `translate(0, ${plotHeight})`);

    svg
      .append('g')
      .attr('class', 'y-axis')
      .call(
        axisLeft(yScale)
          .tickSize(-width)
          .ticks(5),
      );

    svg
      .selectAll('.red-blob')
      .data([data])
      .join('path')
      .attr('d', d => areaScale(d))
      .attr('fill', 'red')
      .attr('opacity', 0.8);
    //   .attr('stroke', 'black');
    svg
      .selectAll('.red-line')
      .data([data])
      .join('path')
      .attr('d', d => lineScale(d))
      .attr('stroke', 'black')
      .attr('stroke-width', 4)
      .attr('fill', 'none');

    svg
      .selectAll('.murder-dots')
      .data(data)
      .join('circle')
      .attr('class', 'murder-dots')
      .attr('cx', d => xScale(new Date(d.Year)))
      .attr('cy', d => yScale(d[yDim]))
      .attr('r', 4)
      .attr('stroke', 'white');

    svg
      .selectAll('.murder-labels')
      .data(data.filter((_, idx) => !idx || idx === data.length - 1))
      .join('text')
      .attr('x', d => xScale(new Date(d.Year)))
      .attr('y', d => yScale(d[yDim]) + 20)
      .attr('text-anchor', 'middle')
      .text(d => d[yDim]);
  });
