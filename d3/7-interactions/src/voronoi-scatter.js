// import {extent} from 'd3-array';
// import {scaleLinear} from 'd3-scale';
// import {select} from 'd3-selection';
// import {axisBottom, axisLeft} from 'd3-axis';
// import {Delaunay} from 'd3-delaunay';
// import {line} from 'd3-shape';

// fetch('./data/cars.json')
//   .then(d => d.json())
//   .then(data => myVis(data));

// const height = 500;
// const width = 400;
// const margin = {top: 10, left: 50, right: 10, bottom: 50};
// const plotWidth = width - margin.left - margin.right;
// const plotHeight = height - margin.top - margin.bottom;
// function myVis(data) {
//   const points = data.map(row => [row.Displacement, row.Weight_in_lbs]);
//   const delaunay = Delaunay.from(points);
//   const xExtent = extent(data, d => d.Displacement);
//   const yExtent = extent(data, d => d.Weight_in_lbs);
//   //   const voronoi = delaunay.voronoi([
//   //     yExtent[0],
//   //     xExtent[0],
//   //     yExtent[1],
//   //     xExtent[1],
//   //   ]);
//   const voronoi = delaunay.voronoi([0, 0, 1, 1]);
//   const voronoiCells = [...voronoi.cellPolygons()];
//   console.log(voronoiCells);
//   const xScale = scaleLinear()
//     .domain(xExtent)
//     .range([0, plotWidth]);
//   const yScale = scaleLinear()
//     .domain(yExtent)
//     .range([plotHeight, 0]);
//   const svg = select('body')
//     .append('svg')
//     .attr('height', height)
//     .attr('width', width)
//     .append('g')
//     .attr('transform', `translate(${margin.left},${margin.top})`);

//   // the circles
//   svg
//     .append('g')
//     .selectAll('circle')
//     .data(data)
//     .join('circle')
//     .attr('cx', d => xScale(d.Displacement))
//     .attr('cy', d => yScale(d.Weight_in_lbs))
//     .attr('r', 5)
//     .attr('fill', 'steelblue')
//     .on('mouseenter', function mouseMove(d) {
//       const {x, y} = this.getBoundingClientRect();
//       select(this).attr('fill', 'red');
//       select('.tooltip')
//         .style('top', `${y}px`)
//         .style('left', `${x}px`)
//         .text(d.Name);
//     })
//     .on('mouseleave', function mouseMove(d) {
//       select(this).attr('fill', 'steelblue');
//       select('.tooltip')
//         .style('top', 0)
//         .style('left', 0)
//         .text('');
//     });
//   const pathGen = line().x(d => {
//     console.log(d);
//     return 0;
//   });
//   console.log(voronoiCells);
//   svg
//     .append('g')
//     .selectAll('path')
//     .data(voronoiCells)
//     .join('path')
//     .attr('stroke', 'black')
//     .attr('stroke-width', 'black')
//     .attr('fill-opacity', 0)
//     .attr('fill', 'white')
//     .attr('d', d => {
//       console.log(d);
//       return '';
//     });

//   // axes
//   const xAxis = axisBottom(xScale);
//   svg
//     .append('g')
//     .call(xAxis)
//     .attr('transform', `translate(${0},${plotHeight})`);
//   const yAxis = axisLeft(yScale);
//   svg.append('g').call(yAxis);
//   select('body')
//     .append('div')
//     .attr('class', 'tooltip')
//     .style('position', 'absolute')
//     .style('pointer-events', 'none');
// }
