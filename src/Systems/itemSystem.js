const soundManager = require('../Heplers/SoundManager');
/* 
  ItemSystem - I -> responsible for picking up Items and animate them,

  Equipable systems will be inside player system,

  currently items: 

  - password,
  - extuinguisher,
  - life,
  - door card,
*/

const collides = (player, object) => {
  return(player.x < object.x + object.width &&
    player.x + player.width > object.x &&
    player.y < object.y + object.height &&
    player.y + player.height > object.y);
};

const floatItem = (itemComponent, drawComponent) => {
  if (itemComponent.floatTimer > 10) {
    itemComponent.floatDirection = -itemComponent.floatDirection;
    itemComponent.floatTimer = 0;
  }

  if (itemComponent.timer > 2) {
    drawComponent.y = drawComponent.y + itemComponent.floatDirection;
    itemComponent.floatTimer++;
    itemComponent.timer = 0;
  }

  itemComponent.timer++;
}

const itemSystem = {
  init: entities => {
    this.player = entities.find(entity => entity.componentTypes.includes('P'));
    this.systemEntities = entities.filter(entity => entity.componentTypes.includes('I'));
  },
  update: () => {
    this.systemEntities.forEach(entity => {
      const itemComponent = entity.components['I'];
      const drawComponent = entity.components['D'];

      if (drawComponent.invisible) {
        return;
      }

      floatItem(itemComponent, drawComponent);

      if (!collides(this.player.components['Ph'], drawComponent)) {
        return;
      }

      drawComponent.invisible = true;

      this.player.components['P'].timer = this.player.components['P'].timer + 200;
      window.dispatch('HIDE_PASS_INDICATOR');
      soundManager.play('pickup');
    });
  },
}

module.exports = itemSystem;
