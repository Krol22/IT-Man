const { SCALE, TILE_SIZE } = require('../const');
const Camera = function(x, y, w, h, ctx) {
  this.ctx = ctx; 
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
};

Camera.prototype.update = function () {
  // this.ctx.clearRect(-10000, -10000, 20000, 20000);
  this.ctx.fillStyle = '#ff0000';
  this.ctx.fillRect(-10000, -10000, 20000, 20000);
  this.ctx.fillStyle = '#111';
  this.ctx.fillRect(0, 0, 33 * TILE_SIZE * SCALE - 20, 37 * TILE_SIZE * SCALE - 20);

  if (this.followPoint) {
    this.moveTo(this.followPoint.x, this.followPoint.y);
  }
};

Camera.prototype.setFollowPoint = function (component) {
  this.followPoint = component;
}

Camera.prototype.moveTo = function(x, y) {
  const cX = x - this.w + 64;
  const cY = y - this.h + 64;

  let translateX = (this.x - cX) * SCALE;
  let translateY = (this.y - cY) * SCALE;

  this.ctx.translate(translateX, translateY);

  this.x = cX;
  this.y = cY;
};

module.exports = Camera;
