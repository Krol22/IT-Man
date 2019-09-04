const { SCALE } = require('../const');
/*
  ComputerSystem - Cp
*/
function collides (player, object) {
  return(player.x < object.x + object.width &&
    player.x + player.width > object.x &&
    player.y < object.y + object.height &&
    player.y + player.height > object.y);
};

function isNear(playerEntity, computerPhComponent) {
  const { x: px, y: py, width: pw, height: ph } = playerEntity.components['Ph'];
  const { flipX } = playerEntity.components['D'];
  let playerCenterY = py + ph / 2;

  const { x: cx, y: cy, width: cw, height: ch } = computerPhComponent;

  if (!flipX) { // player faces left
    return collides({
      x: px + pw + 10,
      y: playerCenterY, 
      width: 10,
      height: 10,
    }, {
      x: cx,
      y: cy,
      width: cw,
      height: ch,
    }); 
  } else { // player faces right
    return collides({
      x: px - 10,
      y: playerCenterY, 
      width: 10,
      height: 10,
    }, {
      x: cx,
      y: cy,
      width: cw,
      height: ch,
    }); 
  }
}

const handleComputerInteraction = entity => {
  const phComponent = entity.components['Ph'];
  const cpComponent = entity.components['Cp'];
  const aComponent = entity.components['A'];

  if (this.playerEntity.components['P'].state !== 'BACK_UP') {
    cpComponent.backupTimer = 0;
    window.dispatch('HIDE_BU_MODAL');
    return;
  }

  if (!isNear(this.playerEntity, phComponent)) {
    return;
  }

  switch(cpComponent.state) {
    case 'BROKEN': 
      cpComponent.backupTimer++;
      window.dispatch('SHOW_BU_MODAL', cpComponent.backupTimer, phComponent.x * SCALE, phComponent.y * SCALE);
      if (cpComponent.backupTimer > 40) {
        cpComponent.state = 'FIXED';
        aComponent.state = 'FIXED';
        cpComponent.backupTimer = 0;
        window.dispatch('ADD_SCORE', 100);
        window.dispatch('HIDE_BU_MODAL');
      }
      break;
    case 'LOCKED':
      cpComponent.state = 'BROKEN';
      aComponent.state = 'BROKEN';
      break;
  }
};

const spawnRandomComputer = entities => {
  const computerToFix = entities.find(entity => {
    entity.components['Cp'].state === 'BROKEN' || entity.components['Cp'].state === 'LOCKED'
  });

  if (!computerToFix) {}
}

const computerSystem = {
  init: (entities) => {
    this.playerEntity = entities.find(entity => entity.componentTypes.includes('P'));
    this.systemEntities = entities.filter(entity => entity.componentTypes.includes('Cp'));
  },
  update: () => {
    this.systemEntities.forEach(entity => {
      handleComputerInteraction(entity);
    });
  },
};

module.exports = computerSystem;
