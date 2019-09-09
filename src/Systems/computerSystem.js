const soundManager = require('../Heplers/SoundManager');
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
  const { x: cx, y: cy, width: cw, height: ch } = computerPhComponent;

  return collides({
    x: px,
    y: py, 
    width: pw,
    height: ph,
  }, {
    x: cx,
    y: cy,
    width: cw,
    height: ch,
  }); 
}

const handleComputerInteraction = system => {
  const entity = system.computerEntity;
  const passEntity = system.passEntity;

  const phComponent = entity.components['Ph'];
  const cpComponent = entity.components['Cp'];
  const aComponent = entity.components['A'];

  if (!isNear(this.playerEntity, phComponent)) {
    window.dispatch('SHOW_INDICATOR');
    return;
  }

  window.dispatch('HIDE_INDICATOR');

  if (this.playerEntity.components['P'].state !== 'BACK_UP') {
    cpComponent.backupTimer = 0;
    window.dispatch('HIDE_BU_MODAL');
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
        soundManager.play('fixing');
        this.playerEntity.components['P'].timer = this.playerEntity.components['P'].timer + 600;
      }
      break;
    case 'LOCKED':
      if (passEntity.components['D'].invisible) {
        cpComponent.state = 'BROKEN';
        aComponent.state = 'BROKEN';
      } else {
        window.dispatch('CHANGE_STATUS', 'You need to pickup password first to unlock computer!');
      }
      break;
  }
};

const computerSystem = {
  init: (entities) => {

    this.playerEntity = entities.find(entity => entity.componentTypes.includes('P'));
    this.computerEntity = entities.filter(entity => entity.componentTypes.includes('Cp'))[0];
    this.passEntity = entities.find(entity => entity.componentTypes.includes('I') && entity.components['I'].type === 'PASS');
  },
  update: () => {
    handleComputerInteraction(this);
  },
};

module.exports = computerSystem;
