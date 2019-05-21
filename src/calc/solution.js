const math = require('mathjs');
const linspace = require('./linspace');
const {
  tMin,
  tMax,
  xMin,
  xMax,
  fCoeff,
  fUnderDiff,
  fBorderTEq0,
  fBorderXEq0
} = require('./config');

module.exports = () => {
  const minEpsilon = 0.0000001;
  const mMax = 100; // t
  const nMax = 100; // x

  const hT = (tMax - tMin) / (mMax - 1);
  const hX = (xMax - xMin) / (nMax - 1);

  const u = math.ones(mMax, nMax).toArray();

  for (let n = 0; n < nMax; ++n) {
    u[0][n] = fBorderTEq0(hX * n);
  }

  for (let m = 0; m < nMax; ++m) {
    u[m][0] = fBorderXEq0(hT * m);
  }

  const f = (m, n) =>
    (u[m + 1][n] - u[m][n] + u[m + 1][n + 1] - u[m][n + 1]) / (2 * hT) -
    (fUnderDiff(u[m][n + 1]) -
      fUnderDiff(u[m][n]) +
      fUnderDiff(u[m + 1][n + 1]) -
      fUnderDiff(u[m + 1][n])) /
      (2 * hX);

  const fDerivative = (m, n) =>
    1 / (2 * hT) - (1 / (2 * hX)) * fCoeff(u[m + 1][n + 1]);

  let currentEpsilon = minEpsilon + 1;
  while (currentEpsilon > minEpsilon) {
    currentEpsilon = 0;
    for (let m = 0; m < mMax - 1; ++m) {
      for (let n = 0; n < nMax - 1; ++n) {
        const delta = f(m, n) / fDerivative(m, n);
        u[m + 1][n + 1] = u[m + 1][n + 1] - delta;
        currentEpsilon = Math.max(currentEpsilon, Math.abs(delta));
      }
    }
  }

  return {
    data: [
      {
        x: linspace(xMin, xMax, nMax),
        y: linspace(tMin, tMax, mMax),
        z: u,
        type: 'surface'
      }
    ],
    layout: {
      scene: {
        xaxis: { title: 'x' },
        yaxis: { title: 't' },
        zaxis: { title: 'u' }
      }
    }
  };
};
