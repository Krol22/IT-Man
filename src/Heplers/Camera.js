const { SCALE } = require('../const');
const Camera = function(x, y, w, h, ctx) {
  this.ctx = ctx; 
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.moveTo(x, y);
};

Camera.prototype.update = function () {
  this.ctx.clearRect(this.x * SCALE, this.y * SCALE, 800 + this.x * SCALE, 600 + this.y * SCALE);
  this.ctx.fillStyle = '#fff';
  this.ctx.fillRect(0, 0, 800, 600);

  if (this.followPoint) {
    this.moveTo(this.followPoint.x, this.followPoint.y);
  }
};

Camera.prototype.followPoint = function (component) {
  this.followPoint = component;
}

Camera.prototype.moveTo = function(x, y) {
  const cX = x - this.w / 2;
  const cY = y - this.h / 2;

  this.ctx.translate((this.x - cX) * SCALE, (this.y - cY) * SCALE);

  this.x = cX;
  this.y = cY;
};

module.exports = Camera;
