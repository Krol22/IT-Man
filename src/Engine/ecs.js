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
  this.components = {}; 
  this.componentTypes = components.map(component => component.name);

  components.forEach(component => {
    this.components[component.name] = component;
  });
};

module.exports = {
  ECS,
  Entity
};
