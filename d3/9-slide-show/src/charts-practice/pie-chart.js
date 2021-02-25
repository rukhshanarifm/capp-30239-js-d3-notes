import {select} from 'd3-selection';
import {pie, arc} from 'd3-shape';
import {schemeTableau10} from 'd3-scale-chromatic';
import {transition} from 'd3-transition';

function prepData(data, sumKey) {
  return Object.entries(
    data.reduce((acc, row) => {
      acc[row.Origin] = (acc[row.Origin] || 0) + row[sumKey];
      return acc;
    }, {}),
  ).map(([country, val]) => ({country, val}));
}

const height = 400;
const width = 400;
const radius = 200;
export default function pieChart(data, sumKey) {
  if (select('#slide-container .pie-chart').empty()) {
    select('#slide-container').remove();
    select('#app')
      .append('div')
      .attr('id', 'slide-container')
      .append('svg')
      .attr('height', height)
      .attr('width', width)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)
      .attr('class', 'pie-chart');
  }
  const svg = select('.pie-chart');

  const countedData = prepData(data, sumKey);
  const pieScale = pie()
    .value(d => d.val)
    .sort((a, b) => a.country.localeCompare(b.country));
  const arcs = pieScale(countedData);
  const arcScale = arc()
    .innerRadius(radius / 2)
    .outerRadius(radius);

  svg
    .selectAll('.arc')
    .data(arcs, d => d.index)
    .join(
      enter => enter.append('path').attr('d', d => arcScale(d)),
      update =>
        update.call(el =>
          el.transition(transition().duration(300)).attr('d', d => arcScale(d)),
        ),
    )
    .attr('class', 'arc')

    .attr('stroke', 'white')
    .attr('fill', (_, idx) => schemeTableau10[idx]);
  svg
    .selectAll('.arc-label')
    .data(arcs, d => d.index)
    .join('text')
    .attr('class', 'arc-label')
    .attr('x', d => arcScale.centroid(d)[0])
    .attr('y', d => arcScale.centroid(d)[1])
    .text(({data: {country}}) => country);
}
