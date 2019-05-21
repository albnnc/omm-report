module.exports = {
  tMin: 0,
  tMax: 1,
  xMin: 0,
  xMax: -1,

  // du/dt - fCoeff * du/dx = 0
  fCoeff: u => 1 / (1 + u ** 2),

  // du/dt - d(fUnderDiff)/dx = 0
  fUnderDiff: u => Math.atan(u),

  // u(x, 0)
  fBorderTEq0: x => -x,

  // u(0, t)
  fBorderXEq0: t => 0,

  fCharacteristicT0Eq0: (x, x0) => (1 + x0 ** 2) * (x0 - x),
  fCharacteristicX0Eq0: (x, t0) => -x + t0
};
