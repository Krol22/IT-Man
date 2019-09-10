const { ECS, Entity } = require('../Engine/ecs');

const playerSystem = require('../Systems/playerSystem');
const physicsSystem = require('../Systems/physicsSystem');
const drawSystem = require('../Systems/drawSystem');
const animationSystem = require('../Systems/animationSystem');
const collisionSystem = require('../Systems/collisionSystem');
const computerSystem = require('../Systems/computerSystem');
const itemSystem = require('../Systems/itemSystem');
const spawnSystem = require('../Systems/spawnerSystem');
const enemySystem = require('../Systems/enemySystem');

const menuState = require('../States/menuState');
const { ENEMY_SPEED } = require('../const');

const MapGenerator = require('../Heplers/MapGenerator');

const enemyGenerator = (x, y, type) => {
  return new Entity([
    { n: 'E', type, bh: type === 1 ? 'RANDOM' : 'LINEAR', dirTimer: 0, },
    {
      n: 'A',
      currentFrame: 0,
      state: 'WALK',
      frames: type === 2 ? 3 : 2,
      animations: {
        WALK: {
          frames: type === 2 ? [0, 1, 2] : [0, 1],
          time: type === 2 ? 20 : 13,
        },
      },
      delayTimer: 0,
    },
    { n: 'D', x: -100, y: -100, width: 96, height: 96, image: type === 2 ? assets.enemy2 : assets.enemy1, offsetX: 12, offsetY: 12},
    { n: 'Ph', x, y, vx: 0, vy: 0, ax: 0, ay: ENEMY_SPEED, width: 72, height: 72, skipCollisionCheck: true },
  ])
}

const level1State = {
  init: async () => {
    const assets = window.assets;
    level1State.ecs = new ECS([
      playerSystem,
      physicsSystem,
      drawSystem,
      animationSystem,
      collisionSystem,
      computerSystem,
      itemSystem,
      spawnSystem,
      enemySystem,
    ]);

    const mapGenerator = await new MapGenerator(assets);
    window.dispatch('HIDE_GOM');

    const entities = mapGenerator.loadMap(0);
    entities.push(
      new Entity([
        { n: 'S' },
        { n: 'Cp', state: 'FIXED', timer: 0 },
        { n: 'D', width: 64, height: 64, image: assets.computer },
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
        { n: 'Ph', x: 100, y: 100, vx: 0, vy: 0, ax: 0, ay: 0, width: 64, height: 64, skipCollisionCheck: true },
      ]),
      new Entity([
        { n: 'S' },
        { n: 'I', name: 'Password', type: 'PASS', pass: 'SECRET_123', floatTimer: 1, floatDirection: -1, timer: 0 },
        { n: 'D', x: 100, y: 100, width: 52, height: 52, invisible: true, image: assets.password },
      ]),
      enemyGenerator(655, 1500, 2),
      enemyGenerator(655, 1500, 2),
      enemyGenerator(655, 1500, 1),
    );

    const playerEntity = entities.find(entity => entity.componentTypes.includes('P'));
    window.gameCamera.setFollowPoint(playerEntity.components['Ph']);

    drawSystem.init(entities, window.gameContext);
    computerSystem.init(entities);
    itemSystem.init(entities);
    collisionSystem.init(entities);
    playerSystem.init(entities, menuState);
    physicsSystem.init(entities);
    animationSystem.init(entities);
    spawnSystem.init(entities);
    enemySystem.init(entities);
  },
  update: (delta) => {
    level1State.ecs.update(delta);
  },
};

window.levelState = level1State;

module.exports = level1State;
