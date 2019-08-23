const { html, createStore } = require('./innerself');

const init = {
  eq: [],
  score: 0,
  lifes: 3,
  bumX: 100,
  bumY: 100,
}

function reducer(state = init, action, args) {
  switch (action) {
    case 'ADD_EQ': {
      const [value] = args;
      return {
        ...state,
        eq: [
          ...state.eq,
          value,
        ],
      };
    }
    case 'ADD_SCORE': {
      const [value] = args;
      return {
        ...state,
        score: state.score + value,
      }
    }
    case 'ADD_LIFE': {
      return {
        ...state,
        lifes: state.lifes + 1,
      }
    }
    // show back up modal
    case 'SHOW_BU_MODAL': {
      const [, bumX, bumY] = args;
      return {
        ...state,
        bumX,
        bumY,
        displayBUModal: true,
      }
    }
    case 'HIDE_BU_MODAL': {
      return {
        ...state,
        displayBUModal: false,
      }
    }

  }
  return state;
}

const { attach, connect, dispatch } = createStore(reducer);

window.dispatch = dispatch;

function BackingUpModal(state) {
  const { displayBUModal, buTime, bumX, bumY } = state;
  if (!displayBUModal) {
    return html``;
  }

  console.log(bumX, bumY);

  return html`
    <style>
      .modal {
        top: ${bumY + 100}px;
        left: ${bumX}px;
      }
    </style>
    <div class="modal">BACKING_UP</div>
  `
}

function OuterUI(state) {
  const { eq, score, lifes } = state;

  const lifesArr = [];
  for (let i = 0; i < lifes - 1; i++) {
    lifesArr.push('<img class="lifeAsset" width=32 heigth=32 src="./Item_3.png" />');
  }

  return html`
    <div class="outerUI">
      <div class="eq">
        <h2>Equipment: </h2>
        <ul>
          ${eq.map(item => `<li>${item}</li>`)}
        </ul>
      </div>
      <div class="score">
        <h2>Score: </h2>
        <span class="score">${score}</span>
      </div>
      <div class="lifes">
        <h2>Lifes: ${lifes}</h2>
      </div>
    </div>
  `
}

function GameUI() {
  return html`
    ${connect(OuterUI)()} 
    ${connect(BackingUpModal)()} 
  `;
}

attach(GameUI, document.querySelector('#root'));

