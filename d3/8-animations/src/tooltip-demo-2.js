import {scaleLinear} from 'd3-scale';
import {axisBottom, axisLeft} from 'd3-axis';
import {select} from 'd3-selection';
import {extent} from 'd3-array';
import {transition} from 'd3-transition';
import {interpolateTurbo} from 'd3-scale-chromatic';
fetch('./data/cars.json')
  .then(d => d.json())
  .then(d => myVis(d));

const height = 500;
const width = 400;
const margin = {top: 10, left: 50, right: 10, bottom: 50};
const plotWidth = width - margin.left - margin.right;
const plotHeight = height - margin.top - margin.bottom;

const DATA_COLUMNS = [
  'Miles_per_Gallon',
  'Cylinders',
  'Displacement',
  'Horsepower',
  'Weight_in_lbs',
  'Acceleration',
];

function myVis(data) {
  // DROPDOWNS
  let xCol = DATA_COLUMNS[0];
  let yCol = DATA_COLUMNS[1];
  const xDrop = select('body')
    .append('select')
    .on('change', function changer() {
      xCol = this.value;
      renderPlot();
    });
  xDrop
    .selectAll('option')
    .data(DATA_COLUMNS)
    .join('option')
    .text(d => d);
  const yDrop = select('body')
    .append('select')
    .on('change', function changer() {
      yCol = this.value;
      renderPlot();
    });
  yDrop
    .selectAll('option')
    .data(DATA_COLUMNS)
    .join('option')
    .text(d => d);
  // pre-render stuff
  const svg = select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  select('body')
    .append('div')
    .attr('id', 'tooltip')
    .style('position', 'absolute')
    .style('pointer-events', 'none');
  const xAxis = svg
    .append('g')
    .attr('transform', `translate(0, ${plotHeight})`);
  const yAxis = svg.append('g');
  const t = transition().duration(500);
  const idxScale = scaleLinear()
    .domain([0, data.length])
    .range([0, 1]);
  const color = d => interpolateTurbo(idxScale(d));

  renderPlot();

  function renderPlot() {
    // SCALES
    const xScale = scaleLinear()
      .domain(extent(data, d => d[xCol]))
      .range([0, plotWidth]);
    const yScale = scaleLinear()
      .domain(extent(data, d => d[yCol]))
      .range([plotHeight, 0]);

    svg
      .selectAll('circle')
      .data(data, d => d.Name)
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

      .attr('fill', (_, idx) => color(idx))
      .attr('stroke', 'white')
      .attr('r', 5)
      .on('mouseenter', function mouseEnter(d) {
        const {x, y} = this.getBoundingClientRect();
        select(this).attr('fill', 'rebeccapurple');
        select('#tooltip')
          .style('top', `${y}px`)
          .style('left', `${x}px`)
          .text(d.Name);
      })
      .on('mouseleave', function mouseEnter(d) {
        select(this).attr('fill', 'steelblue');
        select('#tooltip').text('');
      });
    xAxis.call(axisBottom(xScale));
    yAxis.call(axisLeft(yScale));
  }
}
