let bg;
let slices = [];
let sushi = [];
let score;
let sword;

function setup() {
  // bg = loadImage("./assets/background.jpg");
  createCanvas(1000, 500);
  frameRate(60);
  sword = new Sword(color("#FFFFFF"));
  score = 0;
}

function draw() {
  background(51);
  if (mouseIsPressed) {
    sword.slice(mouseX, mouseY);
  }

  if (noise(frameCount) > 0.8) {
    sushi.push(makeSushi());
  }

  for (let i = 0; i < sushi.length; i++) {
    sushi[i].update();
    sushi[i].draw();
    sushi[i].sliced = sword.checkForSlice(sushi[i]);
  }

  if (frameCount % 2 === 0) {
    sword.update();
  }
  sword.draw();
}

function makeSushi() {
  const xPos = random(width);
  const yPos = height;
  const size = noise(frameCount) * 20 + 20;
  const r = noise(frameCount) * 255;
  const g = noise(frameCount * 2) * 255;
  const b = noise(frameCount * 3) * 255;

  const col = color(r, g, b);
  const speed = random(3, 5);
  return new Sushi(xPos, yPos, speed, col, size);
}
