function Sushi(xPos, yPos, speed, color, size, spoiled) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.xVel = generateXVel(xPos);
  this.yVel = -6;
  this.speed = speed;
  this.size = size;
  this.cut = false;
  this.opacity = 255;
  this.color = color;
  this.visible = true;
  this.sliced = false;
  this.removeColor = removeColor(color);
  this.spoiled = spoiled;
}

Sushi.prototype.update = function() {
  this.xPos += this.xVel;
  this.yPos += this.yVel;
  this.yVel += 0.1;

  if (this.yPos > height) {
    this.visible = false;
  }
};

Sushi.prototype.draw = function() {
  noStroke();
  fill(this.color);

  if (this.sliced) {
    if (this.spoiled) {
      endGame();
    }
    this.color = lerpColor(this.color, this.removeColor, 0.5);
  } else {
    ellipse(this.xPos, this.yPos, this.size)
  }
};

function generateXVel(xPos) {
  if (xPos > width / 2) {
    return random(-1.5, -0.5);
  } else {
    return random(0.5, 1.5);
  }
}


function removeColor(col) {
  const r = red(col);
  const g = green(col);
  const b = blue(col);

  return color(r, g, b, 0);
}
