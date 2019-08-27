function generateWall (mapGenerator, x, y) {
  const { map } = mapGenerator;
  const walls = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // skip corners and middle part;
      if (i % 2 === 0 && j % 2 === 0 || j === 1 && i === 1) {
        continue;
      }

      if (!map[x + i - 1]) {
        continue;
      }

      if (map[x + i - 1][ x + j - 1] === 6) {
        walls.push({ x: i, y: j });
      }
    }
  } 

  switch(walls.length) {
    case 0: {
      return {
        type: 0,
      };
    }
    case 1: {
      const wall = {
        type: 1,
      };

      const {x, y} = walls[0];
      if (x === 0) {
        wall.rotation = 0; 
      } 
      if (x === 2) {
        wall.rotation = 2; 
      }
      if (y === 0) {
        wall.rotation = 3; 
      }
      if (y === 2) {
        wall.rotation = 1; 
      }
      return wall;
    }
    case 2: {
      const [wall1, wall2] = walls;
      if (Math.abs(wall1.x - wall2.x) === 2 || Math.abs(wall1.y - wall2.y) === 2)  {
        return {
          type: 2
        };
      }

      return {
        type: 3
      };
    }
    case 3: {
      return {
        type: 4
      };
    }
    case 4: {
      return {
        type: 5,
      };
    }
  }
}

module.exports = generateWall;
