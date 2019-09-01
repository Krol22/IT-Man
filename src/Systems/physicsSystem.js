const {
  FRICTION,
} = require('../const');

/*
  PhysicsSystem - Ph
*/

const physicsSystem = {
  init: entities => {
    this.systemEntities = entities.filter(entity => entity.componentTypes.includes('Ph'));
  },
  update: delta => {
    this.systemEntities.forEach(entity => {
      const physicsComponent = entity.components['Ph'];
      const drawComponent = entity.components['D'];

      const { ax, ay } = physicsComponent;

      physicsComponent.x += physicsComponent.vx;
      physicsComponent.y += physicsComponent.vy;
      physicsComponent.vx += ax;
      physicsComponent.vy += ay;

      if (drawComponent) {
        drawComponent.x = physicsComponent.x;
        drawComponent.y = physicsComponent.y;
      }

      physicsComponent.vx *= FRICTION;
      physicsComponent.vy *= FRICTION;
    });
  }
};

module.exports = physicsSystem;
