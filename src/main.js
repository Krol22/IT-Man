const gameLoop = require('./Engine/gameLoop');
const inputManager = require('./Engine/inputManager');
const { ECS, Entity } = require('./Engine/ecs');

const playerSystem = require('./Systems/playerSystem');
const physicsSystem = require('./Systems/physicsSystem');
const drawSystem = require('./Systems/drawSystem');
const animationSystem = require('./Systems/animationSystem');
const collisionSystem = require('./Systems/collisionSystem');

const imageSrc = 'IT_Man.png';

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
        width: 96,
        height: 96,
        flipX: false,
        image: playerAsset,
      },
      { 
        name: 'A',
        currentFrame: 0,
        state: 'IDLE',
        frames: 5,
        animations: {
          BACK_UP: {
            frames: [3, 4],
            time: 10,
          },
          WALK: {
            frames: [1, 2],
            time: 10,
          },
          IDLE: 0,
        },		
        delayTimer: 0,
      },
      { name: 'Ph', x: 0, y: 0, vx: 0, vy: 0, ax: 0, ay: 0, width: 96, height: 96 },
    ]),
    new Entity([
      { name: 'D', x: 100, y: 100, width: 14, height: 24 },
      { name: 'Ph', x: 100, y: 100, vx: 0, vy: 0, ax: 0, ay: 0, width: 14, height: 14 },
    ]),
    new Entity([
      { name: 'D', x: 130, y: 130, width: 140, height: 240 },
      { name: 'Ph', x: 530, y: 160, vx: 0, vy: 0, ax: 0, ay: 0, width: 140, height: 140 },
    ]),
    new Entity([
      { name: 'D', x: 130, y: 130, width: 140, height: 240 },
      { name: 'Ph', x: 130, y: 130, vx: 0, vy: 0, ax: 0, ay: 0, width: 140, height: 140 },
    ]),
  ];

  const ecs = new ECS([playerSystem, physicsSystem, drawSystem, animationSystem, collisionSystem]);

  inputManager.init();
  const canvas = document.querySelector('#game');
  drawSystem.init(entities, canvas);
  collisionSystem.init(entities);
  playerSystem.init(entities);
  physicsSystem.init(entities);
  animationSystem.init(entities);

  gameLoop.start(delta => {
    inputManager.update();
    ecs.update(delta);
  });
} 

start();


