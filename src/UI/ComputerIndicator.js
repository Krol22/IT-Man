const { html } = require('./innerself');
const { SCALE } = require('../const');

module.exports = function ComputerIndicator(state) {
  if (!window.gameCamera) {
    return html``;
  }

  const { displayIndicator, indicatorX, indicatorY } = state;
  const {x, y} = window.gameCamera;

  if (!displayIndicator) {
    return html``;
  }

  const x1 = x;
  const y1 = y;
  const x2 = indicatorX - 800 + 32;
  const y2 = indicatorY - 600 + 32;

  const D = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const xi = x1 + 50/D * (x2 - x1);
  const yi = y1 + 50/D * (y2 - y1);

  return html`
    <style>
      .indicator {
        z-index: 5;
        display: inline-block;
        width: 5px;
        height: 5px;
        font-size: 20px;
        font-weight: 700;
        color: #dd00aa;
        position: absolute;
        transform: translate(${(xi - x) + 400}px, ${(yi - y) + 400}px);
      }
    </style>
    <div class='indicator'>C</div>
  `
}
