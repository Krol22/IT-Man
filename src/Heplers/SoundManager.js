const TinyMusic = require('tinymusic');

module.exports = {
  init: () => {
    const tempo = 210;

    ac = new AudioContext();
    this.sounds = {};

    this.sounds.fixing = new TinyMusic.Sequence(ac, 280, ['B2 q', 'B2 q', 'G2 q']);
    this.sounds.fixing.createCustomWave([-0.8, 1, 0.8, 0.8, -0.8, -0.8, -1]);
    this.sounds.fixing.gain.gain.value = 0.4;
    this.sounds.fixing.staccato = 0.2;
    this.sounds.fixing.loop = false;

    this.sounds.death = new TinyMusic.Sequence(ac, 280, ['F2 q', 'E3 q', '- q', 'Ab2 q', '- q', 'F2 q']);
    this.sounds.death.createCustomWave([-1,0,1,0,-1,0,1]);
    this.sounds.death.gain.gain.value = 0.4;
    this.sounds.death.staccato = 0.2;
    this.sounds.death.loop = false;

    this.sounds.pickup = new TinyMusic.Sequence(ac, 280, ['G2 q', 'B2 q']);
    this.sounds.pickup.createCustomWave([-0.8, 1, 0.8, 0.8, -0.8, -0.8, -1]);
    this.sounds.pickup.gain.gain.value = 0.4;
    this.sounds.pickup.staccato = 0.2;
    this.sounds.pickup.loop = false;
  },
  play: sound => {
    this.sounds[sound].play();  
  },
  stop: sound => {
    this.sounds[sound].stop();
  }
};

