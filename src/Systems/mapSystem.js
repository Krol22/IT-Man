/*
  mapSystem - M
*/
const mapSystem = {
  init: entities => {
    this.systemEntities = entities.filter(entity => entity.componentTypes.includes('M'));
  },
  update: () => {
    this.systemEntities.forEach(entity => {

    });
  }
}
