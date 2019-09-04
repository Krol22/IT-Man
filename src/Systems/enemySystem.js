/*
 EnemySystem - E
 */

const enemySystem = {
  init: entities => {
    this.systemEntities = entities.filter(entity => entity.componentTypes.includes('E'));
  },
  update: delta => {
    this.systemEntities.forEach(entity => {

    });
  }
}

module.exports = enemySystem;
