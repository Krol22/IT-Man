const { Entity } = require('../../Engine/ecs');
const { TILE_SIZE } = require('../../const');

module.exports = function generatePlayerEntity(mapGenerator, x, y) {
  return [new Entity([
  { n: 'P', state: 'idle', alive: true },
    {
      n: 'D',
      width: 96,
      height: 96,
      flipX: false,
      image: mapGenerator.assets.player,
      offsetX: 8,
      priority: 2,
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
    { n: 'Ph', x: x*TILE_SIZE, y: y*TILE_SIZE, vx: 0, vy: 0, ax: 0, ay: 0, width: 80, height: 96 },
  ])];
}
