const gameLoop = require('./Engine/gameLoop');
const inputManager = require('./Engine/inputManager');
const { ECS, Entity } = require('./Engine/ecs');

const playerSystem = require('./Systems/playerSystem');
const physicsSystem = require('./Systems/physicsSystem');
const drawSystem = require('./Systems/drawSystem');
const animationSystem = require('./Systems/animationSystem');
const collisionSystem = require('./Systems/collisionSystem');
const computerSystem = require('./Systems/computerSystem');

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
  const playerAsset = await loadAsset('IT_Man.png');
  const computerAsset = await loadAsset('Computer.png')
  const entities = [
    new Entity([
      { n: 'P', state: 'idle', alive: true }, 
      { 
        n: 'D',
        x: 0,
        y: 10,
        width: 96,
        height: 96,
        flipX: false,
        image: playerAsset,
      },
      { 
        n: 'A',
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
      { n: 'Ph', x: 0, y: 0, vx: 0, vy: 0, ax: 0, ay: 0, width: 96, height: 96 },
    ]),
    new Entity([
      { n: 'Cp', state: 'FIXED' },
      { n: 'D', x: 210, y: 100, width: 64, height: 64, image: computerAsset },
      { 
        n: 'A',
        currentFrame: 0,
        state: 'FIXED',
        frames: 3,
        animations: {
          LOCKED: 2,
          BROKEN: {
            frames: [0, 1],
            time: 5
          },
          FIXED: 1,
        },
        delayTimer: 0,
      },
      { n: 'Ph', x: 210, y: 100, vx: 0, vy: 0, ax: 0, ay: 0, width: 64, height: 64 },
    ]),
    new Entity([
      { n: 'Cp', state: 'BROKEN' },
      { n: 'D', x: 100, y: 100, width: 64, height: 64, image: computerAsset },
      { 
        n: 'A',
        currentFrame: 0,
        state: 'BROKEN',
        frames: 3,
        animations: {
          LOCKED: 2,
          BROKEN: {
            frames: [0, 1],
            time: 5
          },
          FIXED: 0,
        },
        delayTimer: 0,
      },
      { n: 'Ph', x: 100, y: 100, vx: 0, vy: 0, ax: 0, ay: 0, width: 64, height: 64 },
    ]),
    new Entity([
      { n: 'Cp', state: 'LOCKED' },
      { n: 'D', x: 320, y: 100, width: 64, height: 64, image: computerAsset },
      { 
        n: 'A',
        currentFrame: 0,
        state: 'LOCKED',
        frames: 3,
        animations: {
          LOCKED: 2,
          BROKEN: {
            frames: [0, 1],
            time: 5
          },
          FIXED: 0,
        },
        delayTimer: 0,
      },
      { n: 'Ph', x: 320, y: 100, vx: 0, vy: 0, ax: 0, ay: 0, width: 64, height: 64 },
    ]),
  ];

  const ecs = new ECS([playerSystem, physicsSystem, drawSystem, animationSystem, collisionSystem, computerSystem]);

  inputManager.init();
  const canvas = document.querySelector('#game');
  const context = drawSystem.init(entities, canvas);
  computerSystem.init(entities, context);
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


