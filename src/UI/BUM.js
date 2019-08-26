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
        top: ${175 + bumY - window.gameCamera.y * SCALE}px;
        left: ${100 + bumX - window.gameCamera.x * SCALE}px;
      }
    </style>
    <div class="buModal">
      <h3 class="title">BACKING UP</h3>
      <div class="perc">${buTime}%</div>
    </div>
  `
};
