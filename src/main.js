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
const Camera = require('./Heplers/Camera');

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

  inputManager.init();
  const canvas = document.querySelector('#game');
  const context = canvas.getContext('2d');
  const camera = new Camera(0, 0, 800, 600, context);
  // For UI;
  window.gameCamera = camera;

  const playerEntity = entities.find(entity => entity.componentTypes.includes('P'));
  camera.followPoint(playerEntity.components['D']);

  drawSystem.init(entities, context);
  computerSystem.init(entities, context);
  itemSystem.init(entities);
  collisionSystem.init(entities);
  playerSystem.init(entities);
  physicsSystem.init(entities);
  animationSystem.init(entities);

  gameLoop.start(delta => {
    inputManager.update();
    camera.update();
    ecs.update(delta);
  });
} 

start();


