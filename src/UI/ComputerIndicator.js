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

  const posX = x * SCALE;
  const posY = y * SCALE;

  console.log(x.toFixed(2), y.toFixed(2));

  return html`
    <style>
      .indicator {
        z-index: 5;
        display: inline-block;
        position: absolute;
        border: 1px solid red;
        transform: translate(${posX}px, ${posY}px);
      }
    </style>
    <div class='indicator'>!</div>
  `
}
