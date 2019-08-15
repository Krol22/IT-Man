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

    this.systemEntities.forEach(entity => {
      const { x, y, width, height, frame } = entity.components['D'];

      this.context.rect(x, y, width, height);
      this.context.stroke();
    });
  }
}

module.exports = drawSystem;
