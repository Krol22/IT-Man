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
      .comp { color: #dd00aa; }
      .pass { color: #00dd00; }
    </style>
    <div class="HTP screen">
      <h1>How to play?</h1>
      <p class="HTP_tip">
        Use ARROWS for movement. Use SPACE to make backup.
        You make backup by stepping on computer first.
      </p>
      <p class="HTP_tip">
        To gain up time you need to make backup on computers.
        For locked computers you need to find password first.
      </p>
      <p class="HTP_tip">
        <span class="pass">P</span> and <span class="comp">C</span> 
        letters will show you where are password and computer
      </p>
      <p class="HTP_tip">
        You lose when your time ends.
        Watch out for Computer Viruses! 
      </p>
      <div class="btn" onclick="window.gsm.changeState(window.menuState)">[ Go back ]</div>
    </div>
  `
};

module.exports = HTP;
