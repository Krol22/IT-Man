const gameLoop = require('./Engine/gameLoop');
const inputManager = require('./Engine/inputManager');
const { ECS, Entity } = require('./Engine/ecs');

const playerSystem = require('./Systems/playerSystem');
const physicsSystem = require('./Systems/physicsSystem');
const drawSystem = require('./Systems/drawSystem');
const animationSystem = require('./Systems/animationSystem');

const imageSrc = 'player.png';

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
        width: 48,
        height: 48,
        flipX: false,
        image: playerAsset,
      },
      { 
        name: 'A',
        currentFrame: 0,
        state: 'IDLE',
        frames: 3,
        animations: {
          WALK: {
            frames: [1, 2],
            time: 10,
          },
          IDLE: 0,
        },		
        delayTimer: 0,
      },
      { name: 'Ph', x: 0, y: 0, vx: 0, vy: 0, ax: 0, ay: 0 },
    ]),
    new Entity([{ name: 'C', state: 'burning', fixed: false}]),
  ];

  const ecs = new ECS([playerSystem, physicsSystem, drawSystem, animationSystem]);

  inputManager.init();
  const canvas = document.querySelector('#game');
  drawSystem.init(entities, canvas);
  playerSystem.init(entities);
  physicsSystem.init(entities);
  animationSystem.init(entities);

  gameLoop.start(delta => {
    inputManager.update();
    ecs.update(delta);
  });
} 

start();


