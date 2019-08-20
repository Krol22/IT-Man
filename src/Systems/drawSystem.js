/* 
  DrawSystem - D
*/

const drawSystem = {
  init: (entities, canvas) => {
    this.systemEntities = entities.filter(entity => entity.componentTypes.includes('D'));
    this.context = canvas.getContext('2d');
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
