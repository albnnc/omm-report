import renderMathInElement from 'katex/dist/contrib/auto-render';
import Plotly from 'plotly.js-gl3d-dist';

import 'katex/dist/katex.min.css';
import './fonts.css';
import './index.css';

const initPlot = (divId, { data, layout }) => {
  Plotly.newPlot(divId, data, layout, {
    displaylogo: false,
    responsive: true
  });
};

document.addEventListener('DOMContentLoaded', function() {
  renderMathInElement(document.body, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false }
    ]
  });

  initPlot('solution', SOLUTION);
  initPlot('characteristics', CHARACTERISTICS);
});
