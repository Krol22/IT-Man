const inputManager = require('../Engine/inputManager');
const { PLAYER_AX, PLAYER_AY } = require('../const');

/*
  PlayerSystem - P
*/

const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const SPACE = 32;

const playerSystem = {
  init: entities => {
    this.systemEntities = entities.filter(entity => 
      entity.componentTypes.includes('P') &&
      entity.componentTypes.includes('Ph') && 
      entity.componentTypes.includes('A') &&
      entity.componentTypes.includes('D')
    );
  },
  update: delta => {
    this.systemEntities.forEach(entity => {
      if (inputManager.keys[LEFT].isDown) {
        entity.state = 'GO_LEFT';
      } else if (inputManager.keys[RIGHT].isDown) {
        entity.state = 'GO_RIGHT';
      } else if (inputManager.keys[UP].isDown) {
        entity.state = 'GO_UP';
      } else if (inputManager.keys[DOWN].isDown) {
        entity.state = 'GO_DOWN';
      } else {
        entity.state = 'IDLE';
      }

      if (inputManager.keys[SPACE].isDown) {
        entity.state = 'BACK_UP';
      }

      const physicsComponent = entity.components['Ph'];
      const drawCompponent = entity.components['D'];
      const animationComponent = entity.components['A'];

      switch(entity.state) {
        case 'GO_UP': 
          animationComponent.state = 'WALK';
          physicsComponent.ay = -PLAYER_AY;
          break;
        case 'GO_DOWN': 
          animationComponent.state = 'WALK';
          physicsComponent.ay = PLAYER_AY;
          break;
        default: 
          physicsComponent.ay = 0;
          physicsComponent.vy = 0;
          break;
      }

      switch(entity.state) {
        case 'GO_LEFT': 
          animationComponent.state = 'WALK';
          physicsComponent.ax = -PLAYER_AX;
          drawCompponent.flipX = true;
          break;
        case 'GO_RIGHT': 
          animationComponent.state = 'WALK';
          physicsComponent.ax = PLAYER_AX;
          drawCompponent.flipX = false;
          break;
        default: 
          physicsComponent.ax = 0;
          physicsComponent.vx = 0;
          break;
      }

      if (entity.state === 'IDLE') {
        animationComponent.state = 'IDLE';
      }

      if (entity.state === 'BACK_UP') {
        animationComponent.state = 'BACK_UP';
      }
    });
  }
};

module.exports = playerSystem;
