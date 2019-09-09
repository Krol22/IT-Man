const { html } = require('./innerself');

function HTP(state) {
  const { htpVisible } = state;

  if (!htpVisible) {
    return html``;
  }

  return html`
    <style>
      .HTP_tip {
        border: 1px solid currentcolor;
        padding: 40px;
      }
    </style>
    <div class="HTP screen">
      <h1>How to play?</h1>
      <p class="HTP_tip">
        Use arrows for movement 
      </p>
      <p class="HTP_tip">
        You lose when your time ends
      </p>
      <p class="HTP_tip">
        To gain up time you need to make backup on computers.
        For locked computers you need to find password first.
      </p>
      <p class="HTP_tip">
        Watch out for Computer Viruses! 
      </p>
      <div class="btn" onclick="window.gsm.changeState(window.menuState)">[ Go back ]</div>
    </div>
  `
};

module.exports = HTP;
