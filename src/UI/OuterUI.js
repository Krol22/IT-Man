const { html } = require('./innerself');

module.exports = function OuterUI(state) {
  const { eq, score, lifes } = state;

  const lifesArr = [];
  for (let i = 0; i < lifes - 1; i++) {
    lifesArr.push('<img class="lifeAsset" width=32 heigth=32 src="./Item_3.png" />');
  }

  return html`
    <div class="outerUI">
      <div class="score">
        <h2>Score: </h2>
        <span class="score">${score}</span>
      </div>
      <div class="lifes">
        <h2>Lifes: ${lifes}</h2>
      </div>
    </div>
  `;
};
