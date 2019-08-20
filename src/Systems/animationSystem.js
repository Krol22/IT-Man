/*
  AnimationSystem - A
*/

const animationSystem = {
  init: entities => {
    this.systemEntities = entities.filter(entity => entity.componentTypes.includes('A'));
  },
  update: delta => {
    this.systemEntities.forEach(entity => {
      const {
        state,
        currentFrame, 
        animations, 
      } = entity.components['A'];

      currentState = Object.keys(animations).find(key => {
        const animation = animations[key]
        if (!animation.frames) {
          return;
        }

        if (animation.frames.includes(currentFrame)) {
          return key;
        }
      });

      if (currentState !== state) {
        entity.components['A'].delayTimer = 0;
        if (animations[state].frames) {
          entity.components['A'].currentFrame = animations[state].frames[0];
        } else {
          entity.components['A'].currentFrame = animations[state];
        }
        return;
      }

      entity.components['A'].delayTimer++;
      if (entity.components['A'].delayTimer <= animations[state].time) {
        return;
      }


      entity.components['A'].delayTimer = 0;
      entity.components['A'].currentFrame += 1;
      if (entity.components['A'].currentFrame > animations[state].frames[animations[state].frames.length - 1]) {
        entity.components['A'].currentFrame = animations[state].frames[0];
        return;
      }
    });
  }
}

module.exports = animationSystem;
