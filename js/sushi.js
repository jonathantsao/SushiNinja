function Sushi(xPos, yPos, speed, size, spoiled) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.xVel = generateXVel(xPos);
  // this.rotation = 0;
  // this.dRotation = this.xVel > 0 ? - PI / 60 : PI / 60;
  this.yVel = -12;
  this.speed = speed;
  this.size = size;
  this.cut = false;
  this.opacity = 255;
  this.visible = true;
  this.sliced = false;
  this.sliceSound = random([sliceSound1, sliceSound2, sliceSound3]);
  this.spoiled = spoiled;
  this.sushiList = [sushi1, sushi2, sushi3, sushi4, sushi5];
  this.type = spoiled ? spoiledSushi : random(this.sushiList);
  this.half = sushiHalves(this.type);
}

Sushi.prototype.update = function() {
  this.xPos += this.xVel;
  this.yPos += this.yVel;
  this.yVel += 0.1;
  // this.rotation += this.dRotation;

  if (this.yPos > height) {
    this.visible = false;
  }
  this.center = center(this.xPos, this.yPos, this.size);
  if (this.sliced) {
    this.opacity -= 5;
  }
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

function sushiHalves(type) {
  switch(type) {
    case spoiledSushi:
      return null;
      break;
    case sushi1:
      return [sushi1_2, sushi1_1];
      break;
    case sushi2:
      return [sushi2_2, sushi2_1];
      break;
    case sushi3:
      return [sushi3_2, sushi3_1];
      break;
    case sushi4:
      return [sushi4_2, sushi4_1];
      break;
    case sushi5:
      return [sushi5_2, sushi5_1];
      break;
  }
}
