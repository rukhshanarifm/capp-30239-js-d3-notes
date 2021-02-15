import {select} from 'd3-selection';
import {pie, arc} from 'd3-shape';
import {schemeAccent} from 'd3-scale-chromatic';

function prepData(data) {
  return Object.entries(
    data.reduce((acc, row) => {
      acc[row.Origin] = (acc[row.Origin] || 0) + 1;
      return acc;
    }, {}),
  );
}

fetch('./data/cars.json')
  .then(data => data.json())
  .then(unpreppedData => myPie(prepData(unpreppedData)));

const width = 500;
const height = 500;
const radius = Math.min(width, height) * 0.4;
function myPie(data) {
  const svg = select('body')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

  const piedFunc = pie().value(d => d[1]);
  const piedData = piedFunc(data);
  const arcFunc = arc()
    .innerRadius(0)
    .outerRadius(radius);
  const slices = svg
    .selectAll('g')
    .data(piedData)
    .join('g');
  slices
    .append('path')
    .attr('stroke', 'white')
    .attr('fill', (_, idx) => schemeAccent[idx])
    .attr('d', arcFunc);
  slices
    .append('text')
    .attr('transform', d => {
      const centroid = arcFunc.centroid(d);
      return `translate(${centroid[0]},${centroid[1]})`;
    })
    .text(d => d.data[0]);
  // after your done with this do the hover highlight demo
}
