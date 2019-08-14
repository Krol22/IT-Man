function ECS(systems) {
  this.systems = systems;

  this.start = () => {
    this.systems.forEach(system => {
      system.init();
    });
  };

  this.update = delta => {
    this.systems.forEach(system => {
      system.update(delta);
    });
  };
};

function Entity(components) {
  this.components = components;
  this.componentTypes = components.map(component => component.name);
}

module.exports = {
  ECS,
  Entity
};
