
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
        walls.push({ x: j, y: i, ox: x + j - 1, oy: y + i - 1 });
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

module.exports = generateWall;
