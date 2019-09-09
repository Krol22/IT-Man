const { html } = require('./innerself');

module.exports = function OuterUI(state) {
  const { score, timeLeft } = state;

  return html`
    <style>
      .ui {
        background-color: black;
        position: absolute;
        z-index: 8;
        min-width: 600px;
        margin: 0px 10px;
        text-align: center;
        padding: 10px;
        font-size: 20px;
        display: flex;
        justify-content: space-around;
        border: 2px solid #73f8c6;
        left: 50%;
        transform: translateX(-50%);
      }

      .danger {
        color: #ff0000;
      }
    </style>
    <div class="ui">
      <span>SCORE: ${score}</span>
      <span class="${timeLeft < 400 && 'danger'}">TIME: ${timeLeft}</span>
    </div>
  `;
};
