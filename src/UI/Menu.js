const { html } = require('./innerself');

function Menu(state) {
  const { menuStateVisible } = state;

  if (!menuStateVisible) {
    return html``;
  }

  return html`
    <style>
      .Menu h1, 
      .Menu h2 {
        display: inline-block;
      }

      .Menu h1 {
        font-size: 140px;
      }

      .Menu h2 {
        margin-left: 10px;
        font-size: 90px;
      }

      .Menu__blink {
        animation: test .7s infinite alternate steps(1); 
        opacity: 1;
      }

      .Menu__btn {
        cursor: pointer;
      }

      .Menu__btn:hover {
        color: white;
      }

      @keyframes test {
        0% {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
      }
    </style>
    <div class="Menu screen">
      <div class="Menu__logo">
        <h1>IT</h1>
        <h2>man</h2>
      </div>
      <h3 class="Menu__blink">Press SPACE to start</h3> 
      <div class="btn" onclick="window.gsm.changeState(window.howToPlayState)">
        [ How to play? ]
      </div>
    </div>
  `;
}

module.exports = Menu;
