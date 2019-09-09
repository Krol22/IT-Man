const TinyMusic = require('tinymusic');

module.exports = {
  init: () => {
    const n1 = new TinyMusic.Note('G1 e');
    const n2 = new TinyMusic.Note('E2 q');
    const n3 = new TinyMusic.Note('C2 q');

    const tempo = 120;

    ac = new AudioContext();
    this.sounds = {};

    this.sounds.fixing = new TinyMusic.Sequence(ac, tempo);
    this.sounds.fixing.push(n1, n2, n3);
    this.sounds.fixing.loop = false;

    this.sounds.death = new TinyMusic.Sequence(ac, tempo);
    this.sounds.death.push(n2, n3, n1);
    this.sounds.death.loop = false;

    this.sounds.pickup = new TinyMusic.Sequence(ac, tempo);

    this.sounds.pickup.createCustomWave([-0.8, 1, 0.8, 0.8, -0.8, -0.8, -1]);
    this.sounds.pickup.volume = 0.5;
    this.sounds.pickup.bass.gain.value = 10;
    this.sounds.pickup.push(n1);
    this.sounds.pickup.loop = false;
  },
  play: sound => {
    this.sounds[sound].play();  
  }
};

