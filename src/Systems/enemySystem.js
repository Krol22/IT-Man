/*
 EnemySystem - E
 */
function collides (player, object) {
  return(player.x < object.x + object.width &&
    player.x + player.width > object.x &&
    player.y < object.y + object.height &&
    player.y + player.height > object.y);
};

const handleRandomWalk = entity => {
};


const enemySystem = {
  init: (entities, map) => {
    this.systemEntities = entities.filter(entity => entity.componentTypes.includes('E'));
    this.player = entities.find(entity => entity.componentTypes.includes('P'));
    this.map = map;
  },
  update: delta => {
    this.systemEntities.forEach(entity => {
      const eComponent = entity.components['E'];

      if (eComponent.bh === 'RANDOM') {
        handleRandomWalk(entity);
      }
    });
  }
}

module.exports = enemySystem;
