import './main.css';
import {select} from 'd3-selection';
import {arc} from 'd3-shape';
import {scaleLinear} from 'd3-scale';
import {schemeTableau10} from 'd3-scale-chromatic';
import {transition} from 'd3-transition';

function getData(radiusScale) {
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
      value: now.getHours() % 12,
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
    };
  });
}

const height = 500;
const width = 500;
function myVis() {
  const radiusScale = scaleLinear()
    .domain([0, 1])
    .range([0, width / 2]);
  const arcScale = arc().startAngle(0);

  const svg = select('#app')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);
  let offset = 0;
  function renderArc() {
    offset = (offset + 1) % 10;
    const t = transition().duration(300);
    const data = getData(radiusScale);
    svg
      .selectAll('.arc')
      .data(data)
      .join(
        enter =>
          enter
            .append('path')
            .attr('d', d => arcScale(d))
            .attr('fill', (_, idx) => schemeTableau10[idx + offset]),
        update =>
          update.call(el =>
            el
              .transition(t)
              .attr('d', d => arcScale(d))
              .attr('fill', (_, idx) => schemeTableau10[idx + offset]),
          ),
      )
      .attr('class', 'arc');
    setTimeout(renderArc, 1000);
  }
  renderArc();
}

myVis();
