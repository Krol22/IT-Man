const gameLoop = require('./Engine/gameLoop');
const inputManager = require('./Engine/inputManager');
const { ECS, Entity } = require('./Engine/ecs');
const playerSystem = require('./Systems/playerSystem');

const entities = [
  new Entity([{ name: 'POS', x: 0, y: 0 }]),
  new Entity([{ name: 'POS', x: 0, y: 0 }]),
  new Entity([{ name: 'POS', x: 0, y: 0 }]),
  new Entity([{ name: 'POS', x: 0, y: 0 }]),
  new Entity([{ name: 'P', state: 'idle', alive: true }, { name: 'POS' }]),
  new Entity([{ name: 'C', state: 'burning', fixed: false}]),
];

const ecs = new ECS([playerSystem]);

inputManager.init();
playerSystem.init(entities);

gameLoop.start(delta => {
  inputManager.update();
  ecs.update(delta);
});
