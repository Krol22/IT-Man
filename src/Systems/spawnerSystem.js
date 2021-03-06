const { TILE_SIZE } = require('../const');

/*
 S - spawnerSystem
*/

const maxX = 32 * TILE_SIZE;
const maxY = 36 * TILE_SIZE;

const collides = (objA, objB) => {
  return(objA.x < objB.x + objB.width &&
    objA.x + objA.width > objB.x &&
    objA.y < objB.y + objB.height &&
    objA.y + objA.height > objB.y);
}

const getAvailableRandomPosition = (entities, width, height) => {
  let proper = false;
  let newX, newY;
  while(!proper) {
    newX = Math.floor(Math.random() * maxX);
    newY = Math.floor(Math.random() * maxY);

    const colidesEntity = entities.find(entity => {
      const phComponent = entity.components['Ph'];
      return collides({
        x: newX,
        y: newY,
        width,
        height,
      }, phComponent)
    });

    proper = !colidesEntity;
  }

  return {
    x: newX,
    y: newY
  };
} 

const spawnSystem = {
  init: (entities) => {
    this.phEntities = entities.filter(entity => entity.componentTypes.includes('Ph'));
    this.systemEntities = entities.filter(entity => entity.componentTypes.includes('S'));
  },
  update: delta => {
    const computers = this.systemEntities.filter(entity => entity.componentTypes.includes('Cp'))
    const password = this.systemEntities.filter(entity => entity.componentTypes.includes('I'))[0];
    const activeComputers = computers.filter(entity => entity.components['Cp'].state !== 'FIXED');

    if (!activeComputers.length) {
      const computerToSpawn = Math.floor(Math.random() * 2);
      const phComponent = computers[0].components['Ph'];
      const cpComponent = computers[0].components['Cp'];
      const aComponent = computers[0].components['A'];
      const state = computerToSpawn === 0 ? 'BROKEN' : 'LOCKED';
      cpComponent.state = state;
      aComponent.state = state;

      const { x, y } = getAvailableRandomPosition(this.phEntities, phComponent.width, phComponent.height);

      phComponent.x = x;
      phComponent.y = y;

      if (state === 'LOCKED') {
        const passwordDComponent = password.components['D'];
        const {x: xi, y: yi} = getAvailableRandomPosition(this.phEntities, passwordDComponent.width, passwordDComponent.height);

        passwordDComponent.x = xi;
        passwordDComponent.y = yi;
        password.components['D'].invisible = false;

        window.dispatch('SET_PASS_INDICATOR', xi, yi);
      }
      window.dispatch('SET_INDICATOR', x, y);

    }
  },
};

module.exports = spawnSystem;

