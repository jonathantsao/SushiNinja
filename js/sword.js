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

  if (lastToSushi < sushi.size || ((lastToSushi < markToMark && secondToLastToSushi < markToMark) && markToMark < width / 4)) {
    debugger;
    sushi.sliced = true;
    return true;
  }
};
