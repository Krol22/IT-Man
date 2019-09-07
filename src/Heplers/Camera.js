const { SCALE, TILE_SIZE } = require('../const');
const Camera = function(x, y, w, h, ctx) {
  this.ctx = ctx; 
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.color = 0;
};

Camera.prototype.update = function () {
  // this.ctx.clearRect(-10000, -10000, 20000, 20000);
  this.ctx.fillStyle = `hsl(${this.color}, 100%, 20%)`;
  this.color += 1;
  if (this.color > 360) {
    this.color = 0;
  }
  this.ctx.fillRect(-10000, -10000, 20000, 20000);
  this.ctx.fillStyle = '#111';
  this.ctx.fillRect(20, 20, 33 * TILE_SIZE * SCALE - 50, 37 * TILE_SIZE * SCALE - 50);

  if (this.followPoint) {
    this.moveTo(this.followPoint.x, this.followPoint.y);
  }
};

Camera.prototype.setFollowPoint = function (component) {
  this.followPoint = component;
}

Camera.prototype.moveTo = function(x, y) {
  const cX = (x - this.w + 64);
  const cY = (y - this.h + 64);

  let translateX = (this.x - cX) * SCALE;
  let translateY = (this.y - cY) * SCALE;

  this.ctx.translate(translateX, translateY);

  this.x = cX;
  this.y = cY;
};

module.exports = Camera;
