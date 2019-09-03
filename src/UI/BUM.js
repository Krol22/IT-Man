const { html } = require('./innerself');
const { SCALE } = require('../const');

module.exports = function BackingUpModal(state) {
  const { displayBUModal, buTime, bumX, bumY } = state;
  if (!displayBUModal) {
    return html``;
  }

  return html`
    <style>
      .buModal {
        top: ${50 + bumY - window.gameCamera.y * SCALE}px;
        left: ${-10 + bumX - window.gameCamera.x * SCALE}px;
      }
    </style>
    <div class="buModal">
      <span class="title">BACKING UP</span>
      <div class="perc">${buTime}%</div>
    </div>
  `
};
