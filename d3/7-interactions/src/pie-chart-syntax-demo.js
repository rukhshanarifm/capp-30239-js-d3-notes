import {schemeCategory10} from 'd3-scale-chromatic';
import {select} from 'd3-selection';
import {pie, arc} from 'd3-shape';

const width = 300;
const height = 300;
const radius = 100;
const data = [
  {label: 'one', value: 20},
  {label: 'two', value: 50},
  {label: 'three', value: 30},
];

const vis = select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', `translate(${radius},${radius})`);

const arcFunc = arc()
  .outerRadius(radius)
  .innerRadius(0);
// arc().outerRadius(radius).innerRadius(X).startAngel(X).endAngle(X);
const pieFunc = pie().value(d => d.value);
const piedData = pieFunc(data);
const arcs = vis
  .selectAll('g.slice')
  .data(piedData)
  .join('g')
  .attr('class', 'slice');

arcs
  .append('path')
  .attr('fill', (d, i) => schemeCategory10[i])
  .attr('d', arcFunc);

arcs
  .append('text')
  .attr('transform', d => {
    d.innerRadius = 0;
    d.outerRadius = radius;
    return `translate(${arcFunc.centroid(d)})`;
  })
  .attr('text-anchor', 'middle')
  .text((d, i) => data[i].label);
