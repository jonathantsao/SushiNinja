let bg;
let slices = [];
let sushi = [];
let score;
let lives;
let sword;
let start;
let stop;
let sevenSwordsman;
let sushi1;
let sushi2;
let sushi3;
let sushi4;
let sushi5;
let spoiledSushi;
let life;
let backgroundSong;
let sliceSound1;
let sliceSound2;
let sliceSound3;

function preload() {
  backgroundSong = loadSound("./assets/song.mp3");
  sliceSound1 = loadSound("./assets/slice1.mp3");
  sliceSound2 = loadSound("./assets/slice2.mp3");
  sliceSound3 = loadSound("./assets/slice3.mp3");
}

function setup() {
  bg = loadImage("./assets/background.jpg");
  sevenSwordsman = loadFont("./assets/seven_swordsman.TTF");
  sushi1 = loadImage("./assets/sushi1.png");
  sushi2 = loadImage("./assets/sushi2.png");
  sushi3 = loadImage("./assets/sushi3.png");
  sushi4 = loadImage("./assets/sushi4.png");
  sushi5 = loadImage("./assets/sushi5.png");
  life = loadImage("./assets/life.png");
  spoiledSushi = loadImage("./assets/spoiled_sushi.png");
  backgroundSong.loop();

  createCanvas(window.innerWidth - 300, window.innerHeight);
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
      if (mouseX < width && mouseY < height) {
        start = true;
      }
    }
    introText();
    return;
  }

  if (stop) {
    replayText();
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
  renderSushi();

  if (frameCount % 2 === 0) {
    sword.update();
  }
  sword.draw();

}



function introText() {
  textAlign(CENTER, CENTER);
  stroke(0);
  fill(255);
  textSize(40);
  textFont(sevenSwordsman);
  text("Welcome to Sushi Ninja", width / 2, height / 2 - 200);
  text("Click and drag to slice some raw fish...", width / 2, height / 2 - 50);
  text("but avoid these spoiled ones!", width / 2, height / 2 + 50);
  image(spoiledSushi, width / 2, height / 2 + 80, 120, 120);
  text("Click to Begin!", width / 2, height / 2 + 200);
}

function replayText() {
  textAlign(CENTER);
  fill(255);
  stroke(0);
  textFont(sevenSwordsman);
  textSize(60);
  text(`Game over, your score was ${score}`, width / 2, height / 2 - 50);
  text("Press enter to play again!", width / 2, height / 2 + 50);
}

function makeSushi() {
  const xPos = random(width);
  const yPos = height;
  const size = noise(frameCount) * 100 + 100;
  const spoiled = (random() > 0.95);
  const speed = random(3, 5);
  return new Sushi(xPos, yPos, speed, size, spoiled);
}

function renderSushi() {
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
  score += points;
}

function renderLives() {
  stroke(255);
  strokeWeight(3);
  fill("#FF00EE");
  for (let i = lives; i > 0; i--) {
    image(life, width - (i * 60 + 40), 30, 50, 100)
  }
}

function renderScore() {
  textAlign(LEFT);
  noStroke();
  fill(255);
  textSize(50);
  text(score, 30, 50);
}

function renderSound() {
  textAlign(LEFT);
  strokeWeight(3)
  fill(255);
  textSize(20);
  text("Press ESC to turn the music on/off", 10, height - 10);
}

function keyPressed() {
  if (keyCode === ENTER) {
    stop = false;
    score = 0;
    lives = 3;
  } else if (keyCode === ESCAPE) {
    if (backgroundSong.isPlaying()) {
      backgroundSong.pause();
    } else {
      backgroundSong.loop();
    }
  }
}

function endGame() {
  slices = [];
  sushi = [];
  stop = true;
}
