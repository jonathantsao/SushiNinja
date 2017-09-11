function Splat(xPos, yPos) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.timer = 0;
}

Splat.prototype.update = function() {
  this.timer += 1;
};
