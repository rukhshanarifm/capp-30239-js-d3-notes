import './main.css';
import {select} from 'd3-selection';
import {pie, arc} from 'd3-shape';
import {schemeTableau10} from 'd3-scale-chromatic';
fetch('./data/cars.json')
  .then(x => x.json())
  .then(data => myVis(data));

function prepData(data, countKey) {
  return Object.entries(
    data.reduce((acc, row) => {
      acc[row[countKey]] = (acc[row[countKey]] || 0) + 1;
      return acc;
    }, {}),
  ).map(([country, count]) => ({country, count}));
}

const width = 500;
const height = 500;
const radius = 200;
function myVis(data) {
  const svg = select('#app')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);
  console.log();

  const pieScale = pie().value(d => d.count);
  const arcs = pieScale(prepData(data, 'Origin'));

  const arcScale = arc()
    .innerRadius(radius / 2)
    .outerRadius(radius);

  //   svg
  //     .selectAll('.arc')
  //     .data(arcs)
  //     .join('path')
  //      .attr('class', 'arc')
  //     .attr('d', d => arcScale(d))
  //     .attr('stroke', 'white')
  //     .attr('fill', (d, idx) => schemeTableau10[idx]);
  const arcHolders = svg
    .selectAll('.arc-holder')
    .data(arcs)
    .join('g')
    .attr('class', 'arc-holder');
  // .attr('d', d => arcScale(d))
  // .attr('stroke', 'white')
  // .attr('fill', (d, idx) => schemeTableau10[idx]);
  arcHolders
    .append('path')
    .attr('d', d => arcScale(d))
    .attr('stroke', 'white')
    .attr('fill', (d, idx) => schemeTableau10[idx]);
  arcHolders
    .append('text')
    .attr('x', d => arcScale.centroid(d)[0])
    .attr('y', d => arcScale.centroid(d)[1])
    .text(({data: {country}}) => country);
}
