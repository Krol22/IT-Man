const { ENEMY_SPEED } = require('../const');

/*
 EnemySystem - E
 */
function collides (player, object) {
  return(player.x < object.x + object.width &&
    player.x + player.width > object.x &&
    player.y < object.y + object.height &&
    player.y + player.height > object.y);
};

const handleRandomWalk = (entity, mapEntities) => {
  const enemyPhComponent = entity.components['Ph'];
  const collisionObj = {
    top: false,
    left: false,
    right: false,
    bottom: false,
  };

  mapEntities.forEach(entity => {
    const mapPhComponent = entity.components['Ph'];
    if (!collisionObj.top) {
      const offset = enemyPhComponent.vy < 0 ? 10 : enemyPhComponent.height;
      collisionObj.top = collides(
        mapPhComponent,
        {
          x: enemyPhComponent.x,
          y: enemyPhComponent.y - offset,
          width: enemyPhComponent.width,
          height: enemyPhComponent.height,
        }
      );
    }

    if (!collisionObj.bottom) {
      const offset = enemyPhComponent.vy > 0 ? 10 : enemyPhComponent.height;
      collisionObj.bottom = collides(
        mapPhComponent,
        {
          x: enemyPhComponent.x,
          y: enemyPhComponent.y + offset,
          width: enemyPhComponent.width,
          height: enemyPhComponent.height,
        }
      );
    }

    if (!collisionObj.left) {
      const offset = enemyPhComponent.vx < 0 ? 10 : enemyPhComponent.width;
      collisionObj.left = collides(
        mapPhComponent,
        {
          x: enemyPhComponent.x - offset,
          y: enemyPhComponent.y,
          width: enemyPhComponent.width,
          height: enemyPhComponent.height,
        }
      );
    }

    if (!collisionObj.right) {
      const offset = enemyPhComponent.vx > 0 ? 10 : enemyPhComponent.width;
      collisionObj.right = collides(
        mapPhComponent,
        {
          x: enemyPhComponent.x + offset,
          y: enemyPhComponent.y,
          width: enemyPhComponent.width,
          height: enemyPhComponent.height,
        }
      );
    }
  });

  let direction; 

  
  if (enemyPhComponent.vx < 0) { // LEFT
    direction = 'left';
    collisionObj.right = true;
  } else if (enemyPhComponent.vx > 0) { // RIGHT
    direction = 'right';
    collisionObj.left = true;
  } else if (enemyPhComponent.vy < 0) { // TOP
    direction = 'top';
    collisionObj.bottom = true;
  } else { // DOWN
    direction = 'bottom';
    collisionObj.top = true;
  }

  const canGoFurther = !collisionObj[direction];
  let newDirection = false;

  if (canGoFurther) {
    const willChangeDir = Math.random() > 0.5;
    if (willChangeDir) {
      const availableDirections = Object.keys(collisionObj).map(key => (!collisionObj[key] && key)).filter(value => value);
      if (availableDirections.length < 2) {
        return;
      }
      const randomDirection = Math.floor(Math.random() * availableDirections.length);

      newDirection = availableDirections[randomDirection];
    }
  } else {
    const availableDirections = Object.keys(collisionObj).map(key => (!collisionObj[key] && key)).filter(value => value);
    const randomDirection = Math.floor(Math.random() * availableDirections.length);

    newDirection = availableDirections[randomDirection];
  }

  if (newDirection) {
    enemyPhComponent.ax = 0;
    enemyPhComponent.vx = 0;
    enemyPhComponent.ay = 0;
    enemyPhComponent.vy = 0;
  } else {
    return;
  }

  if (newDirection === 'left') {
    enemyPhComponent.ax = -ENEMY_SPEED;
  } else if (newDirection === 'right') {
    enemyPhComponent.ax = ENEMY_SPEED;
  } else if (newDirection === 'top') {
    enemyPhComponent.ay = -ENEMY_SPEED;
  } else if (newDirection === 'bottom') {
    enemyPhComponent.ay = ENEMY_SPEED;
  }
};


const enemySystem = {
  init: (entities) => {
    this.systemEntities = entities.filter(entity => entity.componentTypes.includes('E'));
    this.player = entities.find(entity => entity.componentTypes.includes('P'));
    this.mapEntities = entities.filter(entity => entity.componentTypes.includes('M'));
  },
  update: delta => {
    this.systemEntities.forEach(entity => {
      const eComponent = entity.components['E'];

      if (eComponent.bh === 'RANDOM') {
        handleRandomWalk(entity, this.mapEntities);
      }
    });
  }
}

module.exports = enemySystem;
