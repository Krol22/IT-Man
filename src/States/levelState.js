const { ECS } = require('../Engine/ecs');

const playerSystem = require('../Systems/playerSystem');
const physicsSystem = require('../Systems/physicsSystem');
const drawSystem = require('../Systems/drawSystem');
const animationSystem = require('../Systems/animationSystem');
const collisionSystem = require('../Systems/collisionSystem');
const computerSystem = require('../Systems/computerSystem');
const itemSystem = require('../Systems/itemSystem');

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

    level1State.ecs = new ECS([
      playerSystem,
      physicsSystem,
      drawSystem,
      animationSystem,
      collisionSystem,
      computerSystem,
      itemSystem,
    ]);

    const mapGenerator = await new MapGenerator(assets);

    const entities = mapGenerator.loadMap(0);

    const playerEntity = entities.find(entity => entity.componentTypes.includes('P'));
    window.gameCamera.followPoint(playerEntity.components['Ph']);

    drawSystem.init(entities, window.gameContext);
    computerSystem.init(entities);
    itemSystem.init(entities);
    collisionSystem.init(entities);
    playerSystem.init(entities);
    physicsSystem.init(entities);
    animationSystem.init(entities);
  },
  update: (delta) => {
    level1State.ecs.update(delta);
  },
};

module.exports = level1State;
