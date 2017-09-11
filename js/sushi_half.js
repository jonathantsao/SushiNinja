function SushiHalf(xPos, yPos, xVel, yVel, type, size) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.xVel = xVel;
  this.yVel = yVel;
  this.type = type;
  this.size = size;
}

SushiHalf.prototype.update = function() {
  this.xPos += this.xVel;
  this.yPos += this.yVel;
  this.yVel += 0.1;
};

SushiHalf.prototype.draw = function() {
  image(this.type, this.xPos, this.yPos, this.size / 2, this.size);
};
