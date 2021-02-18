import './main.css';
import {myExampleUtil} from './utils';
import {select} from 'd3-selection';

function myVis(data, data2) {
  const width = 5000;
  const height = (36 / 24) * width;
  console.log(data, data2, height);
  console.log('Hi!');
  console.log(myExampleUtil(2));
  select('#app')
    .append('h1')
    .text('hi HI hi');
}

Promise.all([
  fetch('./data/another-data.json').then(x => x.json()),
  fetch('./data/example.json').then(x => x.json()),
]).then(results => {
  const [anotherData, example] = results;
  myVis(anotherData, example);
});
