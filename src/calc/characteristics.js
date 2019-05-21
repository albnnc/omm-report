const linspace = require('./linspace');
const {
  tMin,
  tMax,
  xMin,
  xMax,
  fCharacteristicT0Eq0,
  fCharacteristicX0Eq0
} = require('./config.js');

module.exports = () => {
  return {
    data: [
      ...linspace(xMin, xMax, 9).map(x0 => ({
        x: [xMin, xMax],
        y: [fCharacteristicT0Eq0(x0, xMin), fCharacteristicT0Eq0(x0, xMax)],
        type: 'scatter',
        name: `x0 = ${x0}`,
        xaxis: 'x1',
        yaxis: 'y1'
      })),
      ...linspace(tMin, tMax, 9).map(t0 => ({
        x: [xMin, xMax],
        y: [fCharacteristicX0Eq0(t0, xMin), fCharacteristicX0Eq0(t0, xMax)],
        type: 'scatter',
        name: `t0 = ${t0}`,
        xaxis: 'x2',
        yaxis: 'y2'
      }))
    ],
    layout: {
      xaxis: {
        anchor: 'x1',
        title: 'x'
      },
      yaxis: {
        anchor: 'y1',
        title: 't, t0 = 0'
      },
      xaxis2: {
        anchor: 'x2',
        title: 'x, x0 = 0'
      },
      yaxis2: {
        anchor: 'y2',
        title: 't'
      },
      showlegend: false,
      grid: {
        rows: 1,
        columns: 2,
        pattern: 'independent'
      }
    }
  };
};
