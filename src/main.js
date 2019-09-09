const gameLoop = require('./Engine/gameLoop');
const inputManager = require('./Engine/inputManager');

const GSM = require('./Engine/gsm');
const Camera = require('./Heplers/Camera');
const menuState = require('./States/menuState');
const levelState = require('./States/levelState');

require('./States/howToPlayState');

const generateWall = require('./Heplers/Wall.helper');


require('./UI/App');

const canvas = document.querySelector('#game');
const context = canvas.getContext('2d');
const camera = new Camera(0, 0, 800, 600, context);
// For UI;
window.gameContext = context;
window.gameCamera = camera;
window.gameCanvas = canvas;

const resize = () => {
  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;

  const gameWidth = 810;
  const gameHeight = 620;

  let scale = containerWidth / gameWidth;

  if (containerWidth > gameWidth) {
    if (containerHeight < gameHeight * scale) {
      scale = containerHeight / gameHeight;
    }

    canvas.style.transform = `scale(${scale})`;
    canvas.style.transformOrigin = 'top';
  }
}

window.addEventListener('resize', resize);
resize();

const loadAsset = imageSrc => {
  return new Promise(resolve => {
    const asset = new Image();
    asset.src = imageSrc;
    asset.onload = () => {
      resolve(asset);
    }

    asset.onerror = e => {
      console.log(e);
    }
  });
}

const start = async () => {
  window.assets = {};
  window.assets.player = await loadAsset('IT_Man.png');
  window.assets.computer = await loadAsset('Computer.png');
  window.assets.password = await loadAsset('Item_1.png');
  window.assets.wall = await loadAsset('Walls.png');
  window.assets.backgroundWall = await loadAsset('Wall.png');
  window.assets.enemy1 = await loadAsset('Enemy_1.png');
  window.assets.enemy2 = await loadAsset('Enemy_2.png');

  window.gsm = new GSM();
  inputManager.init();
  await window.gsm.changeState(menuState);
  gameLoop.start(delta => {
    inputManager.update();
    camera.update();
    window.gsm.update(delta);
  });
} 

start();


