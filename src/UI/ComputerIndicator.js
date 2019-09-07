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

  const gameCanvas = document.querySelector('#game').getBoundingClientRect();
  const currentWidth = gameCanvas.width;
  const currentHeigth = gameCanvas.height;

  const scale = currentWidth / 800;

  const x1 = x;
  const y1 = y;
  const x2 = indicatorX - 800;
  const y2 = indicatorY - 600;

  const D = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const xi = x1 + 50 * scale/D * (x2 - x1);
  const yi = y1 + 50 * scale/D * (y2 - y1);

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
        transform: translate(${(xi - x) + currentWidth / 2}px, ${(yi - y) + currentHeigth / 2}px);
      }
    </style>
    <div class='indicator'>C</div>
  `
}
