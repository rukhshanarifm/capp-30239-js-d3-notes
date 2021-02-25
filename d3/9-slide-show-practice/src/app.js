import {select} from 'd3-selection';
import './main.css';
import vegaEmbed from 'vega-embed';
import Scatterplot1 from './charts/scatterplot-1';
import Chart2 from './charts/chart-2';
import Pie from './charts/pie-chart';

fetch('./data/cars.json')
  .then(response => response.json())
  .then(data => myVis(data));

function renderVega(chart) {
  select('#slide-container *').remove();
  vegaEmbed('#slide-container', chart, {
    theme: 'vox',
    actions: false,
  });
}

const slides = [
  {
    title: 'example 1',
    slideContent: () => renderVega(Scatterplot1),
    content:
      'lorem ipsum screemum lorem ipsum screemum lorem ipsum screemum lorem ipsum screemum lorem ipsum screemum lorem ipsum screemum',
  },
  {
    title: 'example 2',
    slideContent: () => renderVega(Chart2),
    content:
      'lorem ipsum screemum lorem ipsum screemum lorem ipsum screemum lorem ipsum screemum lorem ipsum screemum lorem ipsum screemum',
  },
  {
    title: 'example 3a - pie chart stage 1',
    slideContent: data => {
      Pie(data, 'Acceleration');
    },
    content:
      'wow holy shit im gonna pull in that pie chart i made 5 lectures ago and do stuff to it',
  },
  {
    title: 'example 3b - pie chart stage 2',
    slideContent: data => {
      Pie(data, 'Weight_in_lbs');
    },
    content: 'got dang did i do it yea huh',
  },
];

function myVis(data) {
  // state stuff
  let currentSlideIdx = 0;
  const updateSlide = newVal => {
    currentSlideIdx = newVal;
    renderSlide();
  };
  // set up container and incrementer
  const prevButton = select('#annotation-container #prev').on('click', () =>
    updateSlide(currentSlideIdx ? currentSlideIdx - 1 : slides.length - 1),
  );
  const nextButton = select('#annotation-container #next').on('click', () =>
    updateSlide((currentSlideIdx + 1) % slides.length),
  );

  // progress bar rendering
  function renderProgress(stepNumber, numSteps) {
    select('#progress')
      .selectAll('div')
      .data([...new Array(numSteps)].map((_, idx) => idx))
      .join('div')
      .attr('class', 'progress-dot')
      .style('background-color', d => (d > stepNumber ? 'gray' : 'black'))
      .on('click', (_, d) => updateSlide(d));
  }

  // slide rendering
  function renderSlide() {
    renderProgress(currentSlideIdx, slides.length);
    console.log('render', currentSlideIdx);
    const currentSlide = slides[currentSlideIdx];

    select('#annotation-container h1').text(currentSlide.title);
    select('#annotation-container p').text(currentSlide.content);
    currentSlide.slideContent(data);
  }
  renderSlide();
}
