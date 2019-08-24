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

const MapGenerator = require('./Heplers/MapGenerator');

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

const start = async () => {
  const assets = {};
  assets.player = await loadAsset('IT_Man.png');
  assets.computer = await loadAsset('Computer.png');
  assets.fireEx = await loadAsset('Item_2.png');
  assets.life = await loadAsset('Item_3.png');
  assets.password = await loadAsset('Item_1.png');

  const ecs = new ECS([
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

  console.log(entities);

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


