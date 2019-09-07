const gameLoop = require('./Engine/gameLoop');
const inputManager = require('./Engine/inputManager');

const GSM = require('./Engine/gsm');
const Camera = require('./Heplers/Camera');
const menuState = require('./States/menuState');

const generateWall = require('./Heplers/Wall.helper');


require('./UI/App');

const canvas = document.querySelector('#game');
const context = canvas.getContext('2d');
const camera = new Camera(0, 0, 800, 600, context);
// For UI;
window.gameContext = context;
window.gameCamera = camera;

const resize = () => {
  const containerHeigth = window.innerHeight;
  const containerWidth = window.innerWidth;

  console.log(containerWidth);

  const gameHeight = 600;
  const gameWidth = 810;

  if (containerWidth > gameWidth) {
    const scale = containerWidth / gameWidth
    canvas.style.transform = `scale(${scale})`;
    canvas.style.transformOrigin = 'top left';
  } else if (containerHeigth > gameHeight) {
    const scale = containerHeigth / gameHeight
    canvas.style.transform = `scale(${scale})`;
    canvas.style.transformOrigin = 'top left';
  }
}

window.addEventListener('resize', resize);
resize();

const start = async () => {
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


