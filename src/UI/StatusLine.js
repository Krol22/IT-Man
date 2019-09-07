const { html } = require('./innerself');

module.exports = function StatusLine(state) {
  const { currentStatus } = state;

  return html`
    <style>
      .statusLine {
        position: absolute;
      }
    </style>
    <div class="statusLine">
      ${currentStatus ? currentStatus : 'status'}
    </div>
  `
}
