const { ECS, Entity } = require('../Engine/ecs');

const playerSystem = require('../Systems/playerSystem');
const physicsSystem = require('../Systems/physicsSystem');
const drawSystem = require('../Systems/drawSystem');
const animationSystem = require('../Systems/animationSystem');
const collisionSystem = require('../Systems/collisionSystem');
const computerSystem = require('../Systems/computerSystem');
const itemSystem = require('../Systems/itemSystem');
const spawnSystem = require('../Systems/spawnerSystem');

const generateComputerEntity = require('../Heplers/Map/ComputerGenerator');
const MapGenerator = require('../Heplers/MapGenerator');

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

const level1State = {
  init: async () => {
    const assets = {};
    assets.player = await loadAsset('IT_Man.png');
    assets.computer = await loadAsset('Computer.png');
    assets.fireEx = await loadAsset('Item_2.png');
    assets.life = await loadAsset('Item_3.png');
    assets.password = await loadAsset('Item_1.png');
    assets.wall = await loadAsset('Walls.png');
    assets.backgroundWall = await loadAsset('Wall.png');
    assets.enemy1 = await loadAsset('Enemy_1.png');
    assets.enemy2 = await loadAsset('Enemy_2.png');

    level1State.ecs = new ECS([
      playerSystem,
      physicsSystem,
      drawSystem,
      animationSystem,
      collisionSystem,
      computerSystem,
      itemSystem,
      spawnSystem,
    ]);

    const mapGenerator = await new MapGenerator(assets);

    const entities = mapGenerator.loadMap(0);
    entities.push(
      new Entity([
        { n: 'S' },
        { n: 'Cp', state: 'LOCKED', timer: 0, password: 'SECRET_123' },
        { n: 'D', width: 64, height: 64, image: assets.computer },
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
        { n: 'Ph', x: 100, y: 100, vx: 0, vy: 0, ax: 0, ay: 0, width: 64, height: 64, skipCollisionCheck: true },
      ]),
    );

    const playerEntity = entities.find(entity => entity.componentTypes.includes('P'));
    window.gameCamera.followPoint(playerEntity.components['Ph']);

    drawSystem.init(entities, window.gameContext);
    computerSystem.init(entities);
    itemSystem.init(entities);
    collisionSystem.init(entities);
    playerSystem.init(entities);
    physicsSystem.init(entities);
    animationSystem.init(entities);
    spawnSystem.init(entities);
  },
  update: (delta) => {
    level1State.ecs.update(delta);
  },
};

module.exports = level1State;
