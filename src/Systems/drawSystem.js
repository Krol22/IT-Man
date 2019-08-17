/* 
  DrawSystem - D
*/

const drawSystem = {
  init: (entities, canvas) => {
    this.systemEntities = entities.filter(entity => entity.componentTypes.includes('D'));
    this.context = canvas.getContext('2d');
    console.log(this.context);
  },
  update: () => {
    this.context.clearRect(0, 0, 800, 600);
    this.context.fillRect(0, 0, 800, 600);

    this.systemEntities.forEach(entity => {
      const { x, y, width, height, image } = entity.components['D'];

      this.context.save();
      this.context.translate(x, y);
      this.context.drawImage(image, 0, 0, 14, 24, 0, 0, 14, 24);
      this.context.restore();
    });
  }
}

module.exports = drawSystem;
