/*
  CollisionSystem - C
*/


const collisionSystem = {
  init: entities => {
    this.playerEntity = entities.filter(entity => 
      entity.componentTypes.includes('P'))
    this.systemEntities = entities.filter(entity =>
      entity.componentTypes.includes('C') &&
      !entity.componentTypes.includes('P')
    );
  },
  update: delta => {
    this.systemEntities.forEach(entity => {
       
    });
  }
};

const handlePlayerObjectCollision = (player, object) => {
  if(collides(player, object)) {
    let xDepth = player.width + player.x - object.x
    let x2Depth = object.x + object.width - player.x;
    let yDepth = (object.height / 2) - (object.y - player.y) -22;

    const a = [xDepth, x2Depth, yDepth];
    const minDepth = Math.min(...a);

    switch(minDepth) {
      case xDepth:
        player.x = object.x - player.width;
        player.ax = 0;
        break;
      case x2Depth:
        player.x = object.x + object.width;
        player.ax = 0;
        break;
      case yDepth:
        player.y = object.y - player.height;
        player.ay = 0;
        break;
      // case y2Depth:
        // player.y = object.y + object.height;
        // player.accY = 0;
        // break;
      default:
    }


    return true;
  }

  return false;
}

const collides = (player, object) => {
  return(player.x < object.x + object.width &&
    player.x + player.width > object.x &&
    player.y < object.y + object.height &&
    player.y + player.height > object.y);
};
