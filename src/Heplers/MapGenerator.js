const { Entity } = require('../Engine/ecs');
const generateWall = require('./Wall.helper');

const TILE_SIZE = 96;

const generateComputerEntity = (x, y, computerType, asset) => {
  return new Entity([
      { n: 'Cp', state: 'LOCKED', timer: 0, password: 'SECRET_123' },
      { n: 'D', width: 64, height: 64, image: asset },
      { 
        n: 'A',
        currentFrame: 0,
        state: computerType === 1 ? 'BROKEN' : 'LOCKED',
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
      { n: 'Ph', x: x * TILE_SIZE, y: y * TILE_SIZE, vx: 0, vy: 0, ax: 0, ay: 0, width: 64, height: 64 },
    ]);
};

const EntitiesToMap = [ 
  (mapGenerator, x, y) => {
    // PLAYER
    return [new Entity([
    { n: 'P', state: 'idle', alive: true }, 
      { 
        n: 'D',
        width: 96,
        height: 96,
        flipX: false,
        image: mapGenerator.assets.player,
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
      { n: 'Ph', x: x*TILE_SIZE, y: y*TILE_SIZE, vx: 0, vy: 0, ax: 0, ay: 0, width: 96, height: 96 },
    ])];
  },
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
        n: 'D', x: x*TILE_SIZE, y: y*TILE_SIZE, width: 3 * 96, height: 3 * 96, image: mapGenerator.assets.wall, currentFrame: 5- wall.type, rotate: wall.rotation },{
        n: 'Ph', x: x*TILE_SIZE, y: y*TILE_SIZE, width: 12, height: 12, vx: 0, vy: 0, ax: 0, ay: 0,
      },
    ]);

    let additionalWalls = [];

    if (wall.walls) {
      additionalWalls = wall.walls.map(wall => {
        return new Entity([{
          n: 'D', x: wall.ox*TILE_SIZE, y: wall.oy*TILE_SIZE, width: 12, height: 12,},{
          n: 'Ph', x: wall.ox*TILE_SIZE, y: wall.oy*TILE_SIZE, width: 12, height: 12, vx: 0, vy: 0, ax: 0, ay: 0,
        }]);
      });
    }

    return [wallAsset, ...additionalWalls];
  }
];


const Map = function (assets) {
  this.rows = 20;
  this.cols = 20;
  this.assets = assets;

  this.mapData = [
    [
      [5, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', 'w', 6, 'w', '', 6, 'w', '', '', '', '', 3, '', '', '', '', '', '', '', ''],
      ['', '', 'w', '', '', 'w', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', 'w', '', 2, '', '', '', '', '', 6, 'w', '', '', '', '', '', '', '', ''],
      ['', '', 6, '', '', '', '', '', '', '', 'w', '', '', '', '', '', '', '', '', ''],
      ['', '', 'w', '', 'w', 6, 'w', 'w', 6, 'w', 6, '', 2, '', '', '', '', '', '', ''],
      ['', 0, '', '', '', 'w', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', 'w', '', '', '', '', '', '', '', '', '', '', '', 3, '', ''],
      ['', 4, '', '', '', 6, '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', 4, '', '', '', 'w', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', 1, '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 2, '', '', '', '', '', ''],
      ['', '', '', 1, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', 3, '', '', '', '', '', '', '', '', '', 2, '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 5],
    ]
  ]
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
      console.log(result);
      entities = entities.concat(result);
    }
  }

  return entities.filter(entity => entity);
}

module.exports = Map;
