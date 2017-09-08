let bg;
let slices = [];

function setup() {
  // bg = loadImage("./assets/background.jpg");
  createCanvas(1000, 500);
}

function draw() {
  background(51);
  if (mouseIsPressed) {
    slices.push(createVector(mouseX, mouseY))
  }
}
