function Sword(color) {
  this.slices = [];
  this.color = color;
}

Sword.prototype.update = function() {
  if (this.slices.length > 20) {
    this.slices.splice(0, 1);
    this.slices.splice(0, 1);
  } else if (this.slices.length > 0) {
    this.slices.splice(0, 1);
  }
};

Sword.prototype.draw = function(points, combo) {
  for (let i = 0; i < this.slices.length; i++) {
    let s = map(i, 0, this.slices.length, 2, 20);
    noStroke();
    fill(this.color);
    ellipse(this.slices[i].x, this.slices[i].y, s)
  }
};

Sword.prototype.slice = function(xComp, yComp) {
  this.slices.push(createVector(xComp, yComp));
};


Sword.prototype.checkForSlice = function(sushi) {
  if (sushi.sliced || this.slices.length < 2) {
    return false;
  }

  const lastMark = this.slices.slice(-1)[0];
  const secondToLastMark = this.slices[this.slices.length - 2];
  const lastToSushi = dist(lastMark.x, lastMark.y, sushi.center[0], sushi.center[1]);
  const secondToLastToSushi = dist(secondToLastMark.x, secondToLastMark.y, sushi.center[0], sushi.center[1]);
  const markToMark = dist(lastMark.x, lastMark.y, secondToLastMark.x, secondToLastMark.y);

  if (lastToSushi < sushi.size / 2 || ((lastToSushi < markToMark && secondToLastToSushi < markToMark) && markToMark < width / 4)) {
    sushi.sliced = true;
    sushi.sliceSound.play();
    splats.push(new Splat(sushi.center[0], sushi.center[1]));
    const firstSushiHalf = new SushiHalf(sushi.xPos - 10, sushi.yPos, -sushi.xVel, sushi.yVel, sushi.half[0], sushi.size)
    const secondSushiHalf = new SushiHalf(sushi.xPos + 10, sushi.yPos, sushi.xVel, sushi.yVel, sushi.half[1], sushi.size)
    halves.push(firstSushiHalf);
    halves.push(secondSushiHalf);
    return true;
  }
};
