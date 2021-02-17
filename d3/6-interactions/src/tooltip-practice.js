import {extent} from 'd3-array';
import {scaleLinear} from 'd3-scale';
import {select} from 'd3-selection';
import {axisBottom, axisLeft} from 'd3-axis';

fetch('./data/cars.json')
  .then(d => d.json())
  .then(data => myVis(data));

const height = 500;
const width = 400;
const margin = {top: 10, left: 50, right: 10, bottom: 50};
const plotWidth = width - margin.left - margin.right;
const plotHeight = height - margin.top - margin.bottom;
const columns = [
  'Miles_per_Gallon',
  'Cylinders',
  'Displacement',
  'Horsepower',
  'Weight_in_lbs',
  'Acceleration',
];
function myVis(data) {
  let xCol = columns[0];
  let yCol = columns[1];
  select('body')
    .append('select')
    .on('change', function() {
      xCol = this.value;
      renderPlot();
    })
    .selectAll('option')
    .data(columns)
    .join('option')
    .text(d => d);
  select('body')
    .append('select')
    .on('change', function() {
      yCol = this.value;
      renderPlot();
    })
    .selectAll('option')
    .data(columns)
    .join('option')
    .text(d => d);

  const svg = select('body')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  const circleContainer = svg.append('g');
  select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('position', 'absolute')
    .style('pointer-events', 'none');
  const axisContainerX = svg
    .append('g')
    .attr('transform', `translate(${0},${plotHeight})`);
  const axisContainerY = svg.append('g');
  renderPlot();

  function renderPlot() {
    // scales
    const xScale = scaleLinear()
      .domain(extent(data, d => d[xCol]))
      .range([0, plotWidth]);
    const yScale = scaleLinear()
      .domain(extent(data, d => d[yCol]))
      .range([plotHeight, 0]);

    // the circles
    circleContainer
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', d => xScale(d[xCol]))
      .attr('cy', d => yScale(d[yCol]))
      .attr('r', 5)
      .attr('fill', 'steelblue')
      .on('mouseenter', function mouseMove(d) {
        const {x, y} = this.getBoundingClientRect();
        select(this).attr('fill', 'red');
        select('.tooltip')
          .style('top', `${y}px`)
          .style('left', `${x}px`)
          .text(d.Name);
      })
      .on('mouseleave', function mouseMove(d) {
        select(this).attr('fill', 'steelblue');
        select('.tooltip')
          .style('top', 0)
          .style('left', 0)
          .text('');
      });
    // axes
    axisContainerX.call(axisBottom(xScale));
    axisContainerY.call(axisLeft(yScale));
  }
}
