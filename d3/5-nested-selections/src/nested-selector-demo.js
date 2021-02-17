import * as d3 from 'd3';

const matrix = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
];

const body = d3.select('body');
const table = body.append('table');
const tr = table
  .append('tbody')
  .selectAll('tr')
  .data(matrix)
  .join('tr');

tr.selectAll('td')
  .data(d => d)
  .join('td')
  .text(d => d);

//   this is good but let's add a head!
