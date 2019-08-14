const inputManager = require('../Engine/inputManager');

/*
  PlayerSystem
*/

const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const SPACE = 32;

const playerSystem = {
  init: entities => {
    this.systemEntities = entities.filter(entity => entity.componentTypes.includes('P'));
    console.log(this.systemEntities);
  },
  update: delta => {
    this.systemEntities.forEach(entity => {
      if (inputManager.keys[LEFT].isDown) {
        entity.state = 'GO_LEFT';
      } else if (inputManager.keys[UP].isDown) {
        entity.state = 'GO_UP';
      } else if (inputManager.keys[RIGHT].isDown) {
        entity.state = 'GO_RIGHT';
      } else if (inputManager.keys[DOWN].isDown) {
        entity.state = 'GO_DOWN';
      } else if (inputManager.keys[SPACE].isDown) {
        entity.state = 'BACK_UP';
      } else {
        entity.state = 'IDLE';
      }
    });
  }
};

module.exports = playerSystem;
