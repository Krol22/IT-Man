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
        delayTimer = 0;
        if (animations[state].frames) {
          entity.components['A'].currentFrame = animations[state].frames[0];
        } else {
          entity.components['A'].currentFrame = animations[state];
        }
        return;
      }

      delayTimer++;
      if (delayTimer <= animations[state].time) {
        return;
      }


      delayTimer = 0;
      entity.components['A'].currentFrame += 1;
      if (currentFrame >= animations[state].frames.length) {
        entity.components['A'].currentFrame = animations[state].frames[0];
        return;
      }
    });
  }
}

module.exports = animationSystem;
