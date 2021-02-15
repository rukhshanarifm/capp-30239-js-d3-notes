import {csv, extent, scaleLinear, select, line, area} from 'd3';

// https://vizhub.com/sjengle/5a7cf326924944d8971a5f8b93a8166d?edit=files&file=data.csv
const height = 500;
const width = 400;
const margin = {top: 10, left: 50, right: 10, bottom: 50};
const plotWidth = width - margin.left - margin.right;
const plotHeight = height - margin.top - margin.bottom;
csv('./data/gun-deaths.csv')
  .then(d => d.filter(x => Number(x.Year) >= 1990 && Number(x.Year) < 2013))
  .then(data => {
    const xAcc = d => Number(d.Year);
    const yAcc = d => Number(d['Total by Firearm']);
    const xDomain = extent(data, xAcc);
    const yDomain = [0, extent(data, yAcc)[1]];
    const xScale = scaleLinear()
      .domain(xDomain)
      .range([0, plotWidth]);
    const yScale = scaleLinear()
      .domain(yDomain)
      .range([0, plotHeight]);
    const svg = select('#app')
      .append('svg')
      .attr('height', height)
      .attr('width', width)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const lineFunc = line()
      .x(d => xScale(xAcc(d)))
      .y(d => yScale(yAcc(d)));

    svg
      .append('path')
      .attr('d', lineFunc(data))
      .attr('stroke', 'black')
      .attr('fill-opacity', 0);

    const areaFunc = area()
      .x(d => xScale(xAcc(d)))
      .y1(d => yScale(yAcc(d)))
      .y0(d => yScale(yScale.domain()[0]));

    svg
      .append('path')
      .attr('d', areaFunc(data))
      .attr('fill', '#d01f22');

    svg
      .append('g')
      .attr('class', 'dot-holder')
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', d => xScale(xAcc(d)))
      .attr('cy', d => yScale(yAcc(d)))
      .attr('r', 5)
      .attr('fill', 'black')
      .attr('stroke', 'white');
  });
