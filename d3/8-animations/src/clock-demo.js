import {arc} from 'd3-shape';
import {select} from 'd3-selection';
import {scaleLinear} from 'd3-scale';
import {schemeTableau10} from 'd3-scale-chromatic';
import {transition} from 'd3-transition';

function getUpdatedData(radiusScale) {
  const now = new Date();
  return [
    {
      id: 'second',
      value: now.getSeconds(),
      divisor: 60,
      innerRadius: 0.2,
      outerRadius: 0.35,
    },
    {
      id: 'minutes',
      value: now.getMinutes(),
      divisor: 60,
      innerRadius: 0.4,
      outerRadius: 0.55,
    },
    {
      id: 'hours',
      value: now.getHours(),
      divisor: 24,
      innerRadius: 0.6,
      outerRadius: 0.75,
    },
  ].map(x => {
    return {
      ...x,
      endAngle: Math.PI * 2 * (x.value / x.divisor),
      innerRadius: radiusScale(x.innerRadius),
      outerRadius: radiusScale(x.outerRadius),
      startAngle: 0,
    };
  });
}

const height = 500;
const width = 500;
function myVis() {
  const svg = select('#app')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

  const arcScale = arc().startAngle(0);
  const radiusScale = scaleLinear()
    .domain([0, 1])
    .range([0, height / 2]);
  function renderArcs() {
    const t = transition().duration(300);
    const data = getUpdatedData(radiusScale);
    svg
      .selectAll('.arc')
      .data(data)
      .join(
        enter => enter.append('path').attr('d', d => arcScale(d)),
        update =>
          update.call(el => el.transition(t).attr('d', d => arcScale(d))),
        exit => exit.remove(),
      )
      .attr('class', 'arc')
      .attr('fill', (_, idx) => schemeTableau10[idx]);
    setTimeout(renderArcs, 1000);
  }
  renderArcs();
}

myVis();
