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
    const hours = ((time.getHours() % 12) / 60) * Math.PI * 2;
    const data = [
      {endAngle: seconds, innerRadius: 0.2, outerRadius: 0.35, id: 'seconds'},
      {endAngle: minutes, innerRadius: 0.4, outerRadius: 0.65, id: 'minutes'},
      {endAngle: hours, innerRadius: 0.7, outerRadius: 0.95, id: 'hours'},
    ].map(d => {
      return {
        ...d,
        innerRadius: radiusScale(d.innerRadius),
        outerRadius: radiusScale(d.outerRadius),
      };
    });
    svg
      .selectAll('.arc')
      .data(data, d => d.id)
      .join(
        enter =>
          enter
            .append('path')
            .attr('d', arcFunc)
            .attr('class', 'arc')
            .attr('fill', (_, idx) => schemeTableau10[idx]),
        update => update.call(x => x.transition(t).attr('d', arcFunc)),
      );
  }
  setInterval(drawArcs, 1000);
  drawArcs();
}

myVis();
