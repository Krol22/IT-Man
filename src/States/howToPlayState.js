const inputManager = require('../Engine/inputManager');
const menuState = require('./menuState');

const howToPlayState = {
  init: () => {
    window.dispatch('HIDE_MENU');
    window.dispatch('SHOW_HTP');
  },
  update: () => {},
}

window.howToPlayState = howToPlayState;

module.exports = howToPlayState;
