const { SCALE } = require('../const');
const Camera = function(x, y, w, h, ctx) {
  this.ctx = ctx; 
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
};

Camera.prototype.update = function () {
  this.ctx.clearRect(-10000, -10000, 20000, 20000);
  this.ctx.fillStyle = '#111';
  this.ctx.fillRect(-10000, -10000, 20000, 20000);

  if (this.followPoint) {
    this.moveTo(this.followPoint.x, this.followPoint.y);
  }
};

Camera.prototype.followPoint = function (component) {
  this.followPoint = component;
}

Camera.prototype.moveTo = function(x, y) {
  const cX = x - this.w + 64;
  const cY = y - this.h + 64;

  let translateX = (this.x - cX) * SCALE;
  let translateY = (this.y - cY) * SCALE;

  if (cX < 0) {
    translateX = 0;
  }

  if (cY < 0) {
    translateY = 0;
  }

  this.ctx.translate(translateX, translateY);

  this.x = cX;
  this.y = cY;
};

module.exports = Camera;
