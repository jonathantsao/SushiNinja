function Sword(color) {
  this.slices = [];
  this.sliceSizes = [];
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

Sword.prototype.draw = function() {
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

  let lastMark = this.slices.slice(-1)[0];
  let secondToLastMark = this.slices[this.slices.length - 2];
  let lastToSushi = dist(lastMark.x, lastMark.y, sushi.x, sushi.y);
  let secondToLastToSushi = dist(secondToLastMark.x, secondToLastMark.y, sushi.x, sushi.y);
  let markToMark = dist(lastMark.x, lastMark.y, secondToLastMark.x, secondToLastMark.y);

  if (lastToSushi < markToMark && secondToLastToSushi < markToMark) {
    return true;
  }
}
