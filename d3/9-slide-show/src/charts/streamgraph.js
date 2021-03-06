export default {
  config: {view: {continuousWidth: 400, continuousHeight: 300}},
  data: {
    url:
      'https://cdn.jsdelivr.net/npm/vega-datasets@v1.29.0/data/unemployment-across-industries.json',
  },
  mark: 'area',
  encoding: {
    color: {
      type: 'nominal',
      field: 'series',
      scale: {scheme: 'category20b'},
    },
    x: {
      type: 'temporal',
      axis: {domain: false, format: '%Y', tickSize: 0},
      field: 'date',
      timeUnit: 'yearmonth',
    },
    y: {
      type: 'quantitative',
      aggregate: 'sum',
      axis: null,
      field: 'count',
      stack: 'center',
    },
  },
  selection: {
    selector055: {
      type: 'interval',
      bind: 'scales',
      encodings: ['x', 'y'],
    },
  },
  $schema: 'https://vega.github.io/schema/vega-lite/v4.8.1.json',
};
