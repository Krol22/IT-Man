const { SCALE } = require('../const');

/* 
  DrawSystem - D
*/

const drawSystem = {
  init: (entities, context) => {
    this.systemEntities = entities.filter(entity => entity.componentTypes.includes('D'));
    this.context = context;
    this.context.webkitImageSmoothingEnabled = false;
    this.context.imageSmoothingEnabled = false;
  },
  update: () => {
    this.systemEntities.forEach(entity => {
      const { 
        x, 
        y, 
        width, 
        height, 
        image,
        flipX,
        invisible,
      } = entity.components['D'];

      if (invisible) {
        return;
      }

      const animationComponent = entity.components['A'];

      const frameWidth = 16;
      const frameHeight = 16;

      if (!image) {
        const physicsComponent = entity.components['Ph'];
        if (physicsComponent) {
          this.context.save();
          this.context.translate(physicsComponent.x, physicsComponent.y);
          this.context.strokeStyle = '#ff0000';
          this.context.strokeRect(0, 0, physicsComponent.width, physicsComponent.height)
          this.context.restore();
        }
        return;
      }

      this.context.save();
      this.context.translate(x * SCALE, y * SCALE);

      if (animationComponent) {
        const { currentFrame } = animationComponent;
        if (flipX) {
          this.context.scale(-1, 1);
          this.context.translate(-(width * SCALE), 0);
        }
        this.context.drawImage(image, currentFrame * frameWidth, 0, frameWidth, frameHeight, 0, 0, width * SCALE, height * SCALE);
      } else {
        this.context.drawImage(image, 0, 0, frameWidth, frameHeight, 0, 0, width * SCALE, height * SCALE);
      }
      this.context.restore();
    });
  }
}

module.exports = drawSystem;
