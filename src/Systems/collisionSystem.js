/*
  CollisionSystem - C
*/

const collides = (player, object) => {
  return(player.x < object.x + object.width &&
    player.x + player.width > object.x &&
    player.y < object.y + object.height &&
    player.y + player.height > object.y);
};

const handlePlayerObjectCollision = (player, object) => {
  if(collides(player, object)) {
    let xDepth = player.width + player.x - object.x;
    let x2Depth = object.x + object.width - player.x;
    let yDepth = player.height + player.y - object.y;
    let y2Depth = object.y + object.height - player.y;

    const a = [xDepth, x2Depth, yDepth, y2Depth];
    const minDepth = Math.min(...a);

    switch(minDepth) {
      case xDepth:
        player.x = object.x - player.width + player.ax;
        player.ax = 0;
        player.vx = 0;
        break;
      case x2Depth:
        player.x = object.x + object.width + player.ax;
        player.ax = 0;
        player.vx = 0;
        break;
      case yDepth:
        player.y = object.y - player.height + player.ay;
        player.ay = 0;
        player.vy = 0;
        break;
      case y2Depth:
        player.y = object.y + object.height + player.ay;
        player.ay = 0;
        player.vy = 0;
        break;
      default:
    }

    return true;
  }

  return false;
}

const handlePlayerBoundariesCollision = (player) => {
  if (player.x < 0) {
    player.x = 0;
  }

  if (player.y < 0) {
    player.y = 0;
  }

}

const collisionSystem = {
  init: entities => {
    this.playerEntity = entities.filter(entity => 
      entity.componentTypes.includes('P'))[0];

    this.systemEntities = entities.filter(entity =>
      entity.componentTypes.includes('Ph') &&
      !entity.componentTypes.includes('P')
    );
  },
  update: delta => {
    this.systemEntities.forEach(entity => {
      handlePlayerBoundariesCollision(this.playerEntity.components['Ph']);
      handlePlayerObjectCollision(this.playerEntity.components['Ph'], entity.components['Ph']); 
    });
  }
};

module.exports = collisionSystem;
