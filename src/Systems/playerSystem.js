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
      const playerComponent = entity.components['P'];
      if (inputManager.keys[LEFT].isDown) {
        playerComponent.state = 'GO_LEFT';
      } else if (inputManager.keys[RIGHT].isDown) {
        playerComponent.state = 'GO_RIGHT';
      } else if (inputManager.keys[UP].isDown) {
        playerComponent.state = 'GO_UP';
      } else if (inputManager.keys[DOWN].isDown) {
        playerComponent.state = 'GO_DOWN';
      } else {
        playerComponent.state = 'IDLE';
      }

      if (inputManager.keys[SPACE].isDown) {
        playerComponent.state = 'BACK_UP';
      }

      const physicsComponent = entity.components['Ph'];
      const drawCompponent = entity.components['D'];
      const animationComponent = entity.components['A'];

      switch(playerComponent.state) {
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

      switch(playerComponent.state) {
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

      if (playerComponent.state === 'IDLE') {
        animationComponent.state = 'IDLE';
      }

      if (playerComponent.state === 'BACK_UP') {
        animationComponent.state = 'BACK_UP';
      }
    });
  }
};

module.exports = playerSystem;
