const { Entity } = require('../Engine/ecs');
const { TILE_SIZE } = require('../const');
const { generateWall, generatePhEntities } = require('./Wall.helper');

const Level1Map = require('./Map/Level1');

const generatePlayerEntity = require('./Map/PlayerGenerator');
const generateComputerEntity = require('./Map/ComputerGenerator');

const EntitiesToMap = [
  generatePlayerEntity,
  (mapGenerator, x, y) => {
    // COMPUTER
    return [generateComputerEntity(x, y, 1, mapGenerator.assets.computer)];
  },
  (mapGenerator, x ,y) => {
    // COMPUTER_LOCKED
    return [generateComputerEntity(x, y, 2, mapGenerator.assets.computer)];
  },
  (mapGenerator, x, y) => {
    // PLAYER_LIFE
    return [new Entity([
      { n: 'I', name: 'Life', type: 'LIFE', floatTimer: 10, floatDirection: -1, timer: 0 },
      { n: 'D', x: x*TILE_SIZE, y: y*TILE_SIZE, width: 52, height: 52, image: mapGenerator.assets.life },
    ])];
  },
  (mapGenerator, x, y) => {
    // FIRE_EXT
    return [new Entity([
      { n: 'I', name: 'Fire extuinguisher', type: 'FIRE_EX', floatTimer: 5, floatDirection: -1, timer: 0 },
      { n: 'D', x: x*TILE_SIZE, y: y*TILE_SIZE, width: 52, height: 52, image: mapGenerator.assets.fireEx },
    ])];
  },
  (mapGenerator, x, y) => {
    // PASSWORD
    return [new Entity([
      { n: 'I', name: 'Password', type: 'PASS', pass: 'SECRET_123', floatTimer: 1, floatDirection: -1, timer: 0 },
      { n: 'D', x: x*TILE_SIZE, y: y*TILE_SIZE, width: 52, height: 52, image: mapGenerator.assets.password },
    ])];
  },
  (mapGenerator, x, y) => {
    const wall = generateWall(mapGenerator, x, y);
    if (!wall) {
      return;
    }

    const wallAsset = new Entity([
      {
        n: 'D', x: x*TILE_SIZE, y: y*TILE_SIZE, width: 3 * 96, height: 3 * 96, image: mapGenerator.assets.wall, currentFrame: 5 - wall.type, rotate: wall.rotation, offsetX: 128, offsetY: 128 },{
        n: 'Ph', x: (x)*TILE_SIZE, y: (y)*TILE_SIZE, width: 32, height: 32, vx: 0, vy: 0, ax: 0, ay: 0,
      },
    ]);

    const wallPhEntities = generatePhEntities(wall, x, y);
    return [wallAsset, ...wallPhEntities];
  }
];


const Map = function (assets) {
  this.rows = 37;
  this.cols = 36;
  this.assets = assets;

  this.mapData = Level1Map;
}

Map.prototype.loadMap = function (mapNumber) {
  const mapToLoad = this.mapData[mapNumber];
  let entities = [];

  for (let y = 0; y < this.rows; y++) {
    for (let x = 0; x < this.cols; x++) {
      const entityType = mapToLoad[y][x];
      if (entityType === '') {
        continue;
      }

      const entityNumber = Number(entityType);

      if (typeof entityType !== 'number') {
        continue;
      }
      const result = EntitiesToMap[entityNumber](this, x, y);
      entities = entities.concat(result);
    }
  }

  return entities.filter(entity => entity);
}

module.exports = Map;
