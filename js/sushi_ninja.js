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

  if (frameCount % 10 === 0) {
    if (noise(frameCount) > 0.7) {
      sushi.push(makeSushi());
    }
  }
  let combo = 0;
  let points = 0;
  for (let i = 0; i < sushi.length; i++) {
    sushi[i].update();
    sushi[i].draw();
    points += sword.checkForSlice(sushi[i]) ? 1 : 0;
    combo += (sword.checkForSlice(sushi[i]) && points > 1) ? 1 : 0;
  }

  if (frameCount % 2 === 0) {
    sword.update();
  }
  sword.draw(points, combo);
  score += points + combo;

  noStroke();
  fill(255);
  textSize(50);
  text(score, 30, 50);
}

function makeSushi() {
  const xPos = random(width);
  const yPos = height;
  const size = noise(frameCount) * 20 + 20;
  const spoiled = (random() > 0.99);

  const r = spoiled ? 255 : 0;
  const g = spoiled ? 0 : noise(frameCount * 2) * 255;
  const b = spoiled ? 0: noise(frameCount * 3) * 255;

  const col = color(r, g, b);
  const speed = random(3, 5);
  return new Sushi(xPos, yPos, speed, col, size, spoiled);
}

function endGame() {
  noLoop();
}
