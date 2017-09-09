let bg;
let slices = [];
let sushi = [];
let score;
let lives;
let sword;
let start;
let stop;

function setup() {
  bg = loadImage("./assets/background.jpg");
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(60);
  sword = new Sword(color("#FFFFFF"));
  score = 0;
  lives = 3;
  start = false;
  stop = false;
}

function draw() {
  background(bg);
  renderLives();
  renderScore();

  if (!start) {
    if (mouseIsPressed) {
      start = true;
    }
    textAlign(CENTER, CENTER);
    noStroke();
    fill(255);
    textSize(30);
    text("Click and hold to slice some raw fish", width / 2, height / 2);
    text("Click to Begin!", width / 2, height / 2 + 40);
    return;
  }

  if (stop) {
    textAlign(CENTER);
    fill("#FF0000");
    text(`Game over, your score was ${score}`, width / 2, height / 2);
    text("Press enter to play again!", width / 2, height / 2 + 40);
    textSize(100);
    return;
  }
  stop = false;

  if (mouseIsPressed) {
    sword.slice(mouseX, mouseY);
  }

  if (frameCount % 10 === 0) {
    if (noise(frameCount) > 0.4) {
      sushi.push(makeSushi());
    }
  }
  let points = 0;
  for (let i = sushi.length - 1; i >= 0; i--) {
    sushi[i].update();
    sushi[i].draw();
    if (stop) return;
    if (!sushi[i].visible) {
      if (!sushi[i].sliced && !sushi[i].spoiled) {
        lives -= 1;
        if (lives < 1) {
          endGame();
        }
      }
      sushi.splice(i, 1);
    } else {
      points += sword.checkForSlice(sushi[i]) ? 1 : 0;
    }
  }

  if (frameCount % 2 === 0) {
    sword.update();
  }
  sword.draw();
  score += points;
}

function makeSushi() {
  const xPos = random(width);
  const yPos = height;
  const size = noise(frameCount) * 20 + 20;
  const spoiled = (random() > 0.95);

  const r = spoiled ? 255 : 0;
  const g = spoiled ? 0 : noise(frameCount * 2) * 255;
  const b = spoiled ? 0: noise(frameCount * 3) * 255;

  const col = color(r, g, b);
  const speed = random(3, 5);
  return new Sushi(xPos, yPos, speed, col, size, spoiled);
}

function renderLives() {
  stroke(255);
  strokeWeight(3);
  fill("#FF00EE");
  for (let i = lives; i > 0; i--) {
    ellipse(width - (i * 20 + 20), 50, 20)
  }
}

function renderScore() {
  textAlign(LEFT);
  noStroke();
  fill(255);
  textSize(50);
  text(score, 30, 50);
}

function keyPressed() {
  if (keyCode === ENTER) {
    stop = false;
    score = 0;
    lives = 3;
  }
}

function endGame() {
  slices = [];
  sushi = [];
  stop = true;
}
