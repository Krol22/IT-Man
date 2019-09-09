const { html } = require('./innerself');

module.exports = function GOM(state) {
  const { displayGOModal, score, killedBy } = state;
  if (!displayGOModal) {
    return html``;
  }

  const top = window.gameCanvas ? `${window.gameCanvas.getBoundingClientRect().height.toFixed(0) / 2}px` : '50%';

  return html`
    <style>
      .background {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        z-index: 10;
      }

      .gom {
        font-size: 25px;
        position: absolute;
        border: 2px solid #73f6c6;
        z-index: 11;
        background-color: black;
        padding: 20px 150px 50px 150px;
        min-width: 400px;
        min-height: 200px;
        text-align: center;
        top: ${top};
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .gom .btn {
        margin: 30px 0;
      }
    </style>
    <div class="background"></div>
    <div class="gom">
      <h1>GAME OVER</h1>
      <div>${killedBy}</div>
      <div>You have scored: ${score}</div>
      <div class="btn" onclick="window.gsm.changeState(window.levelState)">[ Restart ]</div>
    </div>
  `
}
