const inputManager = require('../Engine/inputManager');
const levelState = require('./levelState');

const SPACE = 32;
const menuState = {
  init: () => {
    window.dispatch('SHOW_MENU');
    window.dispatch('HIDE_HTP');
  },
  update: () => {
    if (inputManager.keys[SPACE].isDown) {
      window.dispatch('HIDE_MENU');
      window.gsm.changeState(levelState);
    } 
  },
}

window.menuState = menuState;

module.exports = menuState ;
