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
  () => {},
  () => {},
  () => {},
  (mapGenerator, x, y) => {
    const wall = generateWall(mapGenerator, x, y);
    if (!wall) {
      return;
    }

    const wallAsset = new Entity([
      {
        n: 'D', x: x*TILE_SIZE, y: y*TILE_SIZE, width: 3 * 96, height: 3 * 96, image: mapGenerator.assets.wall, currentFrame: 5 - wall.type, rotate: wall.rotation, offsetX: 112, offsetY: 112 },{
        n: 'Ph', x: (x)*TILE_SIZE, y: (y)*TILE_SIZE, width: 64, height: 64, vx: 0, vy: 0, ax: 0, ay: 0,
      },
      { n: 'M' }
    ]);

    const wallPhEntities = generatePhEntities(wall, x, y);
    return [wallAsset, ...wallPhEntities];
  },
  (mapGenerator, x, y) => {
    return [
      new Entity([
        { n: 'D', x: x* TILE_SIZE, y: y*TILE_SIZE, width: 102, height: 102, image: mapGenerator.assets.backgroundWall, offsetX: 20, offsetY: 20},
        { n: 'Ph', x: x*TILE_SIZE, y: y*TILE_SIZE, width: 102, height: 102, vx: 0, vy: 0, ax: 0, ay: 0},
      ]),
    ];
  },
];


const Map = function (assets) {
  this.rows = 37;
  this.cols = 33;
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
