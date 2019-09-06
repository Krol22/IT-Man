const { html } = require('./innerself');
module.exports = function Timer(state) {
  const { timeLeft } = state;
  return html`
  <div class="Timer">
    ${timeLeft}
  </div>
  `
}
