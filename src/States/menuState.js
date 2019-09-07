const inputManager = require('../Engine/inputManager');
const levelState = require('../States/levelState');

const SPACE = 32;
const menuState = {
  init: () => {
    window.dispatch('SHOW_MENU');
  },
  update: () => {
    if (inputManager.keys[SPACE].isDown) {
      window.dispatch('HIDE_MENU');
      window.gsm.changeState(levelState);
    } 
  },
}

window.menuState = menuState;

module.exports = menuState;
