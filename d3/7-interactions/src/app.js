import './main.css';
import {scaleLinear} from 'd3-scale';
import {extent} from 'd3-array';
import {select} from 'd3-selection';
import {interpolateTurbo} from 'd3-scale-chromatic';
import {axisBottom, axisLeft} from 'd3-axis';
import {transition} from 'd3-transition';

fetch('./data/cars.json')
  .then(x => x.json())
  .then(myVis);

const height = 500;
const width = 400;
const margin = {top: 10, left: 50, right: 10, bottom: 50};
const plotWidth = width - margin.left - margin.right;
const plotHeight = height - margin.top - margin.bottom;

function myVis(data) {
  const columns = Object.keys(data[0]);
  let xCol = columns[1];
  let yCol = columns[2];

  const dropdowns = select('#app')
    .append('div')
    .style('display', 'flex')
    .selectAll('.drop-down')
    .data(['xCol', 'yCol'])
    .join('div');

  dropdowns.append('div').text(d => d);

  dropdowns
    .append('select')
    .on('change', (event, row) => {
      if (row === 'xCol') {
        xCol = event.target.value;
      } else {
        yCol = event.target.value;
      }
      renderChart();
    })
    .selectAll('option')
    .data(dim => columns.map(column => ({column, dim})))
    .join('option')
    .text(d => d.column)
    .property('selected', d =>
      d.dim === 'xCol' ? d.column === xCol : d.column === yCol,
    );

  const svgContainer = select('#app')
    .append('div')
    .attr('class', 'chart-container')
    .style('position', 'relative');

  const svg = svgContainer
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const xAxis = svg
    .append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${plotHeight})`);

  const yAxis = svg.append('g').attr('class', 'y-axis');

  const xLabel = svg
    .append('g')
    .attr('class', 'x-axis-label')
    .attr('transform', `translate(${plotWidth / 2}, ${height - 20})`)
    .append('text')
    .attr('text-anchor', 'middle');

  const yLabel = svg
    .append('g')
    .attr('class', 'y-axis-label')
    .attr('transform', `translate(-35, ${plotHeight / 2})`)
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', `rotate(-90)`);

  const tooltip = svgContainer
    .append('div')
    .attr('id', 'tooltip')
    .style('display', 'none');

  function renderChart() {
    const t = transition().duration(300);
    const xScale = scaleLinear()
      .domain(extent(data, d => d[xCol]))
      .range([0, plotWidth]);
    const yScale = scaleLinear()
      .domain(extent(data, d => d[yCol]))
      .range([plotHeight, 0]);

    xAxis.call(axisBottom(xScale));
    yAxis.call(axisLeft(yScale));
    xLabel.text(xCol);
    yLabel.text(yCol);

    svg
      .selectAll('circle')
      .data(data)
      .join(
        enter =>
          enter
            .append('circle')
            .attr('cx', d => xScale(d[xCol]))
            .attr('cy', d => yScale(d[yCol])),
        update =>
          update.call(el =>
            el
              .transition(t)
              .attr('cx', d => xScale(d[xCol]))
              .attr('cy', d => yScale(d[yCol])),
          ),
      )
      .on('mouseenter', (e, d) =>
        tooltip
          .style('display', 'block')
          .style('left', `${e.offsetX}px`)
          .style('top', `${e.offsetY}px`)
          .text(d.Name),
      )
      .on('mouseleave', (e, d) => tooltip.style('display', 'none'))
      .attr('fill', (_, idx) => interpolateTurbo(idx / 406))
      .attr('r', 5);
  }
  renderChart();
}
