const { html } = require('./innerself');
const { SCALE } = require('../const');

module.exports = function BackingUpModal(state) {
  const { displayBUModal, buTime } = state;
  if (!displayBUModal) {
    return html``;
  }

  const value = Math.floor((100 / 40) * buTime);

  const top = window.gameCanvas ? `${window.gameCanvas.getBoundingClientRect().height.toFixed(0) / 2 - 90}px` : '50%';

  return html`
    <style>
      .buModal {
        top: ${top};
        left: 50%;
        position: absolute;
        border: 2px solid #73f6c6;
        padding: 10px 20px;
        z-index: 9;
        transform: translate(-50%, -50%);
      }
    </style>
    <div class="buModal">
      <span class="title">BACKING UP</span>
      <div class="perc">${value}%</div>
    </div>
  `
};
