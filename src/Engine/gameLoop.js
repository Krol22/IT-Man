let time = 0;

function loop(fn) {
  return window.requestAnimationFrame(function() {
    let now = Date.now();
    let elapsed = now - time;

    if (elapsed > 999) {
      elapsed = 1 / 60;
    } else {
      elapsed /= 1000;
    }

    time = now;
    fn(elapsed);
  });
}

module.exports = {
  start: function(fn) {
    return loop(function tick(elapsed) {
      fn(elapsed);
      loop(tick);
    });
  },
  stop: function(id) {
    window.cancelAnimationFrame(id);
  }
};
