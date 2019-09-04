const { Entity } = require('../../Engine/ecs');
const { TILE_SIZE } = require('../../const');

module.exports = function generateEnemyEntity(x, y, enemyType, enemyAsset) {
  console.log(enemyType);
  return new Entity ([
    {n: 'D', width: 72, height: 72, image: enemyAsset },
    {
        n: 'A',
        currentFrame: 0,
        state: 'WALKING',
        frames: enemyType === 1 ? 2 : 3,
        animations: {
          WALKING: {
            frames: enemyType === 1 ? [0, 1] : [0, 1, 2],
            time: 10
          },
        },
        delayTimer: 0,
    }, { n: 'Ph', x: x * TILE_SIZE, y: y * TILE_SIZE, vx: 0, vy: 0, ax: 0, ay: 0, width: 64, height: 64},
  ]);
}
