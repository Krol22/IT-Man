const { html } = require('./innerself');

function Menu(state) {
  const { menuStateVisible } = state;

  if (!menuStateVisible) {
    return html``;
  }

  return html`
    <style>
      .Menu {
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: center;
        z-index: 6;
        background: black;
      }
    </style>
    <div class="Menu">
    <h1>Press SPACE to start</h1> 
    </div>
  `;
}

module.exports = Menu;
