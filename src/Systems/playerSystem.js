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
      entity.componentTypes.includes('Ph')
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

      switch(entity.state) {
        case 'GO_UP': 
          physicsComponent.ay = -PLAYER_AY;
          break;
        case 'GO_DOWN': 
          physicsComponent.ay = PLAYER_AY;
          break;
        default: 
          physicsComponent.ay = 0;
          physicsComponent.vy = 0;
          break;
      }

      switch(entity.state) {
        case 'GO_LEFT': 
          physicsComponent.ax = -PLAYER_AX;
          break;
        case 'GO_RIGHT': 
          physicsComponent.ax = PLAYER_AX;
          break;
        default: 
          physicsComponent.ax = 0;
          physicsComponent.vx = 0;
          break;
      }
    });
  }
};

module.exports = playerSystem;
