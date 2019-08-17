const gameLoop = require('./Engine/gameLoop');
const inputManager = require('./Engine/inputManager');
const { ECS, Entity } = require('./Engine/ecs');

const playerSystem = require('./Systems/playerSystem');
const physicsSystem = require('./Systems/physicsSystem');
const drawSystem = require('./Systems/drawSystem');

const imageSrc = 'player-0.png';

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
  const playerAsset = await loadAsset(imageSrc);
  const entities = [
    new Entity([
      { name: 'P', state: 'idle', alive: true }, 
      { 
        name: 'D',
        x: 0,
        y: 10,
        width: 14,
        height: 24,
        image: playerAsset,
      },
      { name: 'Ph', x: 0, y: 0, vx: 0, vy: 0, ax: 0, ay: 0 },
    ]),
    new Entity([{ name: 'C', state: 'burning', fixed: false}]),
  ];

  const ecs = new ECS([playerSystem, physicsSystem, drawSystem]);

  inputManager.init();
  const canvas = document.querySelector('#game');
  drawSystem.init(entities, canvas);
  playerSystem.init(entities);
  physicsSystem.init(entities);

  gameLoop.start(delta => {
    inputManager.update();
    ecs.update(delta);
  });
} 

start();


