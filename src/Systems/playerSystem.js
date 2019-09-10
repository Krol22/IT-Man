const inputManager = require('../Engine/inputManager');
const soundManager = require('../Heplers/SoundManager');
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
  init: (entities) => {
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
      if (!playerComponent.alive) {
        entity.components['Ph'].ax = 0;
        entity.components['Ph'].ay = 0;
        if (inputManager.keys[SPACE].isDown) {
          window.gsm.changeState(window.levelState);
        }
        return;
      }

      if (inputManager.keys[LEFT].isDown) {
        playerComponent.state = 'GO_LEFT';
        if (inputManager.keys[UP].isDown) {
          playerComponent.state = 'GO_UP_LEFT';
        } else if (inputManager.keys[DOWN].isDown) {
          playerComponent.state = 'GO_DOWN_LEFT';
        }
      } else if (inputManager.keys[RIGHT].isDown) {
        playerComponent.state = 'GO_RIGHT';
        if (inputManager.keys[UP].isDown) {
          playerComponent.state = 'GO_UP_RIGHT';
        } else if (inputManager.keys[DOWN].isDown) {
          playerComponent.state = 'GO_DOWN_RIGHT';
        }
      } else if (inputManager.keys[UP].isDown) {
        playerComponent.state = 'GO_UP';
        if (inputManager.keys[LEFT].isDown) {
          playerComponent.state = 'GO_UP_LEFT';
        } else if (inputManager.keys[RIGHT].isDown) {
          playerComponent.state = 'GO_UP_RIGHT';
        }
      } else if (inputManager.keys[DOWN].isDown) {
        playerComponent.state = 'GO_DOWN';
        if (inputManager.keys[LEFT].isDown) {
          playerComponent.state = 'GO_DOWN_LEFT';
        } else if (inputManager.keys[RIGHT].isDown) {
          playerComponent.state = 'GO_DOWN_RIGHT';
        }
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
          physicsComponent.ax = 0;
          break;
        case 'GO_DOWN': 
          animationComponent.state = 'WALK';
          physicsComponent.ay = PLAYER_AY;
          physicsComponent.ax = 0;
          break;
        case 'GO_LEFT': 
          animationComponent.state = 'WALK';
          physicsComponent.ax = -PLAYER_AX;
          physicsComponent.ay = 0;
          drawCompponent.flipX = true;
          break;
        case 'GO_RIGHT': 
          animationComponent.state = 'WALK';
          physicsComponent.ax = PLAYER_AX;
          physicsComponent.ay = 0;
          drawCompponent.flipX = false;
          break;
        case 'GO_UP_RIGHT': 
          animationComponent.state = 'WALK';
          physicsComponent.ax = PLAYER_AX * 0.8;
          physicsComponent.ay = -PLAYER_AY * 0.8;
          drawCompponent.flipX = false;
          break;
        case 'GO_UP_LEFT': 
          animationComponent.state = 'WALK';
          physicsComponent.ax = -PLAYER_AX * 0.8;
          physicsComponent.ay = -PLAYER_AY * 0.8;
          drawCompponent.flipX = true;
          break;
        case 'GO_DOWN_RIGHT': 
          animationComponent.state = 'WALK';
          physicsComponent.ax = PLAYER_AX * 0.8;
          physicsComponent.ay = PLAYER_AY * 0.8;
          drawCompponent.flipX = false;
          break;
        case 'GO_DOWN_LEFT': 
          animationComponent.state = 'WALK';
          physicsComponent.ax = -PLAYER_AX * 0.8;
          physicsComponent.ay = PLAYER_AY * 0.8;
          drawCompponent.flipX = true;
          break;
        default: 
          physicsComponent.ax = 0;
          physicsComponent.ay = 0;
          physicsComponent.vx = 0;
          physicsComponent.vy = 0;
          break;
      }

      if (playerComponent.state === 'IDLE') {
        animationComponent.state = 'IDLE';
      }

      if (playerComponent.state === 'BACK_UP') {
        animationComponent.state = 'BACK_UP';
      }

      playerComponent.timer--;
      window.dispatch('UPDATE_TIME', playerComponent.timer);
      if (playerComponent.timer <= 0) {
        soundManager.play('death');
        playerComponent.alive = false;
        playerComponent.reason = 'TIME';
        window.dispatch('SHOW_GOM', 'Your time finished!');
      }
    });
  }
};

module.exports = playerSystem;
