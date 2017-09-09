function Sushi(xPos, yPos, speed, size, spoiled) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.xVel = generateXVel(xPos);
  this.yVel = -12;
  this.speed = speed;
  this.size = size;
  this.cut = false;
  this.opacity = 255;
  this.visible = true;
  this.sliced = false;
  this.spoiled = spoiled;
  this.sushiList = [sushi1, sushi2, sushi3, sushi4, sushi5];
  this.type = spoiled ? spoiledSushi : random(this.sushiList);
}

Sushi.prototype.update = function() {
  this.xPos += this.xVel;
  this.yPos += this.yVel;
  this.yVel += 0.1;

  if (this.yPos > height) {
    this.visible = false;
  }
  this.center = center(this.xPos, this.yPos, this.size);
};

Sushi.prototype.draw = function() {
  if (this.sliced) {
    if (this.spoiled) {
      endGame();
    }
  } else {
    image(this.type, this.xPos, this.yPos, this.size, this.size);
  }
};

function generateXVel(xPos) {
  if (xPos > width / 2) {
    return random(-1.5, -0.5);
  } else {
    return random(0.5, 1.5);
  }
}

function center(xPos, yPos, size) {
  let centerX = xPos + size / 2;
  let centerY = yPos + size / 2;
  return [centerX, centerY];
}
