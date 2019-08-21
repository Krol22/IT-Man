const { SCALE_X, SCALE_Y, colors } = require('../const');

/* 
  DrawSystem - D
*/

const drawSystem = {
  init: (entities, canvas) => {
    this.systemEntities = entities.filter(entity => entity.componentTypes.includes('D'));
    this.context = canvas.getContext('2d');
    this.context.webkitImageSmoothingEnabled = false;
    this.context.imageSmoothingEnabled = false;

    return this.context;
  },
  update: () => {
    this.context.clearRect(0, 0, 800, 600);
    this.context.fillStyle = '#fff';
    this.context.fillRect(0, 0, 800, 600);

    this.systemEntities.forEach(entity => {
      const { 
        x, 
        y, 
        width, 
        height, 
        image,
        flipX,
      } = entity.components['D'];

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
      this.context.translate(x, y);

      if (animationComponent) {
        const { currentFrame } = animationComponent;
        if (flipX) {
          this.context.scale(-1, 1);
          this.context.translate(-width, 0);
        }
        this.context.drawImage(image, currentFrame * frameWidth, 0, frameWidth, frameHeight, 0, 0, width, height);
      } else {
        this.context.drawImage(image, 0, 0, frameWidth, frameHeight, 0, 0, width, height);
      }
      this.context.restore();
    });
  }
}

module.exports = drawSystem;
