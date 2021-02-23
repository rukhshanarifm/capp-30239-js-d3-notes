import {select} from 'd3-selection';
import {pie, arc} from 'd3-shape';
import {schemeTableau10} from 'd3-scale-chromatic';
console.log(schemeTableau10);
function prepData(data) {
  return Object.entries(
    data.reduce((acc, row) => {
      acc[row.Origin] = (acc[row.Origin] || 0) + 1;
      return acc;
    }, {}),
  );
}

fetch('./data/cars.json')
  .then(d => d.json())
  .then(d => myVis(prepData(d)));

const width = 500;
const height = 500;
const radius = 200;
function myVis(data) {
  //   console.log(data);
  const svg = select('body')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

  const pieFunc = pie().value(d => d[1]);
  const piedData = pieFunc(data);
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
    .attr('fill', (_, idx) => schemeTableau10[idx])
    .attr('d', row => arcFunc(row));
  slices
    .append('text')
    .attr('transform', d => {
      const centroid = arcFunc.centroid(d);
      return `translate(${centroid[0]},${centroid[1]})`;
    })
    .text(d => d.data[0]);
}
