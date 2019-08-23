const gameLoop = require('./Engine/gameLoop');
const inputManager = require('./Engine/inputManager');
const { ECS, Entity } = require('./Engine/ecs');

const playerSystem = require('./Systems/playerSystem');
const physicsSystem = require('./Systems/physicsSystem');
const drawSystem = require('./Systems/drawSystem');
const animationSystem = require('./Systems/animationSystem');
const collisionSystem = require('./Systems/collisionSystem');
const computerSystem = require('./Systems/computerSystem');
const itemSystem = require('./Systems/itemSystem');

require('./UI/App');

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

const createPlayerEntity = async () => {
  const playerAsset = await loadAsset('IT_Man.png');
  return new Entity([
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
  ]);
};

const createComputerEntity = async () => {
  const computerAsset = await loadAsset('Computer.png')
  return [
    new Entity([
      { n: 'Cp', state: 'LOCKED', timer: 0, password: 'SECRET_123' },
      { n: 'D', x: 140, y: 100, width: 64, height: 64, image: computerAsset },
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
          FIXED: 1,
        },
        delayTimer: 0,
      },
      { n: 'Ph', x: 140, y: 100, vx: 0, vy: 0, ax: 0, ay: 0, width: 64, height: 64 },
    ]),
    new Entity([
      { n: 'Cp', state: 'FIXED', timer: 0, password: 'SECRET_123' },
      { n: 'D', x: 140, y: 100, width: 64, height: 64, image: computerAsset },
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
      { n: 'Ph', x: 140, y: 200, vx: 0, vy: 0, ax: 0, ay: 0, width: 64, height: 64 },
    ]),
    new Entity([
      { n: 'Cp', state: 'BROKEN', backupTimer: 0, password: 'SECRET_123' },
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
          FIXED: 1,
        },
        delayTimer: 0,
      },
      { n: 'Ph', x: 140, y: 300, vx: 0, vy: 0, ax: 0, ay: 0, width: 64, height: 64 },
    ])
  ];
};

const start = async () => {
  const passwordAsset = await loadAsset('Item_1.png');
  const fireExAsset = await loadAsset('Item_2.png');
  const lifeAsset = await loadAsset('Item_3.png');
  const player = await createPlayerEntity();
  const computer = await createComputerEntity();
  const entities = [
    player, ...computer,
    new Entity([
      { n: 'I', type: 'PASS', pass: 'SECRET_123', floatTimer: 1, floatDirection: -1, timer: 0 },
      { n: 'D', x: 250, y: 120, width: 52, height: 52, image: passwordAsset },
    ]),
    new Entity([
      { n: 'I', type: 'FIRE_EX', floatTimer: 5, floatDirection: -1, timer: 0 },
      { n: 'D', x: 250, y: 220, width: 52, height: 52, image: fireExAsset },
    ]),
    new Entity([
      { n: 'I', type: 'LIFE', floatTimer: 10, floatDirection: -1, timer: 0 },
      { n: 'D', x: 250, y: 320, width: 52, height: 52, image: lifeAsset },
    ]),
  ];

  const ecs = new ECS([
    playerSystem,
    physicsSystem,
    drawSystem,
    animationSystem,
    collisionSystem,
    computerSystem,
    itemSystem,
  ]);

  inputManager.init();
  const canvas = document.querySelector('#game');
  const context = drawSystem.init(entities, canvas);
  computerSystem.init(entities, context);
  itemSystem.init(entities);
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


