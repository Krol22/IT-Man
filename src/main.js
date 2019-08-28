const gameLoop = require('./Engine/gameLoop');
const inputManager = require('./Engine/inputManager');

const GSM = require('./Engine/gsm');
const Camera = require('./Heplers/Camera');
const levelState = require('./States/levelState');

const generateWall = require('./Heplers/Wall.helper');

require('./UI/App');

const canvas = document.querySelector('#game');
const context = canvas.getContext('2d');
const camera = new Camera(0, 0, 800, 600, context);
// For UI;
window.gameContext = context;
window.gameCamera = camera;

const menuState = {
  init: () => {
    window.dispatch('SHOW_MENU');
  },
  update: () => {},
}

const fakeMap = [
  ['', 6, ''],
  [6, 6, 6],
  ['', 6, ''],
];

console.log(generateWall({ map: fakeMap }, 1, 1));

const start = async () => {
  const gsm = new GSM();
  inputManager.init();
  await gsm.changeState(levelState);
  gameLoop.start(delta => {
    inputManager.update();
    camera.update();
    gsm.update(delta);
  });
} 

start();


