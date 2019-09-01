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
        currentFrame,
        rotate,
      } = entity.components['D'];

      let {
        offsetX,
        offsetY,
      } = entity.components['D'];


      offsetY = offsetY ? offsetY : 0;
      offsetX = offsetX ? offsetX : 0;

      if (invisible) {
        return;
      }

      const animationComponent = entity.components['A'];

      const frameWidth = 16;
      const frameHeight = 16;

      // if (!image) {
      // const physicsComponent = entity.components['Ph'];
      // if (physicsComponent) {
        // this.context.save();
        // this.context.translate(physicsComponent.x * SCALE, physicsComponent.y * SCALE);
        // this.context.strokeStyle = '#ff0000';
        // this.context.strokeRect(0, 0, physicsComponent.width * SCALE, physicsComponent.height * SCALE)
        // this.context.restore();
      // }
// //
      if (!image) { 
        return; 
      }
        // return;
      // }

      this.context.save();
      this.context.translate((x - offsetX) * SCALE , (y - offsetY) * SCALE);

      if (rotate) {
        this.context.translate(width  * SCALE / 2, height * SCALE / 2);
        this.context.rotate(Math.PI / 2 * rotate);
        this.context.translate(-width  * SCALE / 2, -height * SCALE / 2);

      }

      if (animationComponent) {
        const { currentFrame } = animationComponent;
        if (flipX) {
          this.context.scale(-1, 1);
          this.context.translate(-(width * SCALE), 0);
        }
        this.context.drawImage(image, currentFrame * frameWidth, 0, frameWidth, frameHeight, 0, 0, width * SCALE, height * SCALE);
      } else {
        if (currentFrame) {
          this.context.drawImage(image, 16 * currentFrame, 0, 16, 16, 0, 0, width * SCALE, height * SCALE);
        } else {
          this.context.drawImage(image, 0, 0, frameWidth, frameHeight, 0, 0, width * SCALE, height * SCALE);
        }
      }
      this.context.restore();
    });
  }
}

module.exports = drawSystem;
