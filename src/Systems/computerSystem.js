/*
  ComputerSystem - Cp
*/
function collides (player, object) {
  return(player.x < object.x + object.width &&
    player.x + player.width > object.x &&
    player.y < object.y + object.height &&
    player.y + player.height > object.y);
};

function isNear(playerEntity, computerPhComponent, context) {
  const { x: px, y: py, width: pw, height: ph } = playerEntity.components['Ph'];
  const { flipX } = playerEntity.components['D'];

  let playerCenterX = px + pw / 2; 
  let playerCenterY = py + ph / 2;

  const { x: cx, y: cy, width: cw, height: ch } = computerPhComponent;

  if (!flipX) { // player faces left
    context.rect(px + pw + 10, playerCenterY, 10, 10);
    context.stroke();
    context.rect(cx, cy, cw, ch);
    context.stroke();
    return collides({
      x: px + pw + 10,
      y: playerCenterY, 
      width: 10,
      heigth: 10,
    }, {
      x: cx,
      y: cy,
      width: cw,
      height: ch,
    }); 
  } else { // player faces right
    return collides({
      x: playerCenterX - 20,
      y: playerCenterY, 
      width: pw,
      heigth: ph,
    }, {
      x: cx,
      y: cy,
      width: cw,
      height: ch,
    }); 
  }

}

const computerSystem = {
  init: (entities, context) => {
    this.context = context;
    this.playerEntity = entities.find(entity => entity.componentTypes.includes('P'));
    this.systemEntities = entities.filter(entity => entity.componentTypes.includes('Cp'));
  },
  update: () => {
    this.systemEntities.forEach(entity => {
      const phComponent = entity.components['Ph'];
      const cpComponent = entity.components['Cp'];
      const aComponent = entity.components['A'];
      const playerPhComponent = this.playerEntity.components['Ph'];

      if (this.playerEntity.components['P'].state !== 'BACK_UP') {
        return;
      }

      if (!isNear(this.playerEntity, phComponent, this.context)) {
        console.log('no');
        return;
      }


      switch(cpComponent.state) {
        case 'BROKEN': 
          cpComponent.state = 'FIXED';
          aComponent.state = 'FIXED';
      }
    });
  },
};

module.exports = computerSystem;
