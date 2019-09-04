const { Entity } = require('../../Engine/ecs');
const { TILE_SIZE } = require('../../const');

module.exports = function generateComputerEntity(x, y, computerType, asset) {
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
      { n: 'Ph', x: x * TILE_SIZE, y: y * TILE_SIZE, vx: 0, vy: 0, ax: 0, ay: 0, width: 64, height: 64, skipCollisionCheck: true },
    ]);
}
