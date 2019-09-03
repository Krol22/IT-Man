const { Entity } = require('../Engine/ecs');
const { TILE_SIZE } = require('../const');

function generateWall (mapGenerator, x, y) {
  const { mapData } = mapGenerator;
  const map = mapData[0];

  const walls = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // skip corners and middle part;
      if (i % 2 === 0 && j % 2 === 0 || j === 1 && i === 1) {
        continue;
      }

      if (!map[y + i - 1]) {
        continue;
      }

      if (map[y + i - 1][x + j - 1] === 'w') {
        walls.push({ x: j, y: i, ox: x + j, oy: y + i });
      }
    }
  } 

  switch(walls.length) {
    case 0: {
      return { type: 0, walls };
    }
    case 1: {
      const wall = { type: 1, walls };
      const {x, y} = walls[0];
      if (x === 0) { 
        wall.rotation = 0;
      } else if (y === 2) { 
        wall.rotation = 1;
      } else if (x === 2) { 
        wall.rotation = 2;
      } else if (y === 0) { 
        wall.rotation = 3;
      }
      return wall;
    }
    case 2: {
      const [wall1, wall2] = walls;
      if (Math.abs(wall1.x - wall2.x) === 2 || Math.abs(wall1.y - wall2.y) === 2)  {
        return {
          type: 2,
          rotation: wall1.x === wall2.x ? 0 : 1,
          walls,
        };
      }

      const wall = { type: 3, walls };
      if (wall2.x === 2) {
        wall.rotation = 0;
      } else if (wall1.x === 2) {
        wall.rotation = 1;
      } else if (wall1.x === 0) {
        wall.rotation = 2;
      } else if (wall2.x === 0) {
        wall.rotation = 3;
      }
      return wall;
    }
    case 3: {
      const wall = { type: 4, walls };
      const [wall1, wall2, wall3] = walls;
      if (wall2.y === wall3.y || wall1.y === wall2.y) { // 1, 3
        wall.rotation = wall1.x === 1 ? 3 : 1; 
        return wall;
      }
      // 0, 2
      wall.rotation = wall2.x === 0 ? 2 : 0;
      return wall;
    }
    case 4: {
      return {
        type: 5,
        walls,
      };
    }
  }
}

function generatePhEntities (wall, x, y) {
  const { walls } = wall; 

  const minX = walls.sort((wallA, wallB) => wallA.x - wallB.x)[0];
  const minY = walls.sort((wallA, wallB) => wallA.y - wallB.y)[0];
  const maxX = walls.sort((wallA, wallB) => wallB.x - wallA.x)[0];
  const maxY = walls.sort((wallA, wallB) => wallB.y - wallA.y)[0];

  const fixX = minX.x === 0 ? 32 : 0;
  const fixY = minY.y === 0 ? 32 : 0;

  const WALL_SIZE = 96;

  return [
    new Entity([
      {n: 'D', x: wall.ox + 1 *TILE_SIZE, y: wall.oy*TILE_SIZE, width: 12, height: 12,},
      { n: 'Ph', x: (minX.ox) * TILE_SIZE - fixX - WALL_SIZE, y : (y + 1) * TILE_SIZE - WALL_SIZE, width: (maxX.x - minX.x) * 128 + 64, height: 64, vx: 0, vy: 0, ax: 0, ay: 0 }
    ]),
    new Entity([
      {n: 'D', x: wall.ox + 1 *TILE_SIZE, y: wall.oy*TILE_SIZE, width: 12, height: 12, offsetX: 20},
      { n: 'Ph', x: (x + 1) * TILE_SIZE - WALL_SIZE, y : minY.oy * TILE_SIZE - fixY - WALL_SIZE, width: 64, height: (maxY.y - minY.y) * 128 + 64, vx: 0, vy: 0, ax: 0, ay: 0 }
    ]),
  ]
}

module.exports = {
  generateWall,
  generatePhEntities,
};
