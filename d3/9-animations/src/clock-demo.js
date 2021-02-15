import {select} from 'd3-selection';
import {scaleLinear} from 'd3-scale';
import {arc} from 'd3-shape';
import {schemeTableau10} from 'd3-scale-chromatic';
import {transition} from 'd3-transition';

const height = 500;
const width = 500;

function myVis() {
  const svg = select('body')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);
  const arcFunc = arc().startAngle(0);
  const radiusScale = scaleLinear()
    .domain([0, 1])
    .range([0, height / 2]);
  const t = transition().duration(500);

  function drawArcs() {
    const time = new Date();
    const seconds = (time.getSeconds() / 60) * Math.PI * 2;
    const minutes = (time.getMinutes() / 60) * Math.PI * 2;
    const hours = ((time.getHours() % 12) / 12) * Math.PI * 2;
    //   innerRadius, outerRadius, startAngle, endAngle

    const data = [
      {id: 'seconds', innerRadius: 0.2, outerRadius: 0.35, endAngle: seconds},
      {id: 'minutes', innerRadius: 0.4, outerRadius: 0.55, endAngle: minutes},
      {id: 'hours', innerRadius: 0.6, outerRadius: 0.75, endAngle: hours},
    ].map(d => {
      return {
        ...d,
        innerRadius: radiusScale(d.innerRadius),
        outerRadius: radiusScale(d.outerRadius),
      };
    });
    svg
      .selectAll('.arc')
      .data(data)
      .join(
        enter => enter.append('path').attr('d', d => arcFunc(d)),
        update =>
          update.call(el => el.transition(t).attr('d', d => arcFunc(d))),
        //   update.attr('d', d => arcFunc(d)),
      )
      .attr('fill', (_, idx) => schemeTableau10[idx])
      .attr('class', 'arc');
    setTimeout(drawArcs, 1000);
  }
  drawArcs();
}

myVis();
