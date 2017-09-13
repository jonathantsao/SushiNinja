let bg;
let slices = [];
let sushi = [];
let splats = [];
let halves = [];
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
let sushi1_1;
let sushi1_2;
let sushi2_1;
let sushi2_2;
let sushi3_1;
let sushi3_2;
let sushi4_1;
let sushi4_2;
let sushi5_1;
let sushi5_2;
let spoiledSushi;
let splatImage;
let life;
let backgroundSong;
let sliceSound1;
let sliceSound2;
let sliceSound3;
let pauseForNewLevel;
let level;
let newLevelTimer;
let paused;
let pausedImg;

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
  splatImage = loadImage("./assets/sushi_splat.png");
  pausedImg = loadImage("./assets/pause_icon.png");
  loadSushiHalves();
  backgroundSong.loop();

  createCanvas(window.innerWidth - 400, window.innerHeight);
  frameRate(60);
  sword = new Sword(color("#FFFFFF"));
  score = 0;
  lives = 3;
  start = false;
  stop = false;
  paused = false;
  pauseForNewLevel = false;
  level = 1;
}

function draw() {
  background(bg);
  renderSplats();
  renderLives();
  renderScore();
  renderPause();
  if (!start) {
    if (mouseIsPressed) {
      if (mouseX < width && mouseY < height) {
        start = true;
      }
    }
    introText();
    return;
  }

  if (paused) {
    renderPauseText();
    return;
  }

  if (stop) {
    replayText();
    return;
  }

  processScore();

  if (pauseForNewLevel) {
    newLevelText(level);
    newLevel();
    return;
  }

  if (mouseIsPressed) {
    sword.slice(mouseX, mouseY);
  }

  if (frameCount % 10 === 0) {
    if (noise(frameCount) > processLevel()) {
      sushi.push(makeSushi());
    }
  }
  renderSushiHalves();
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
  text("Slice up some raw fish...", width / 2, height / 2 - 50);
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
  text("Press enter or click to play again!", width / 2, height / 2 + 50);
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

function renderSushiHalves() {
  for (let i = halves.length - 1; i >=0; i--) {
    halves[i].update();
    halves[i].draw();
  }
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
  if (keyCode === ENTER && stop) {
    stop = false;
    score = 0;
    lives = 3;
    level = 0;
  } else if (keyCode === ESCAPE) {
    if (backgroundSong.isPlaying()) {
      backgroundSong.pause();
    } else {
      backgroundSong.loop();
    }
  }
}

function renderSplats() {
  splats.forEach((splat) => {
    splat.update();
    if (splat.timer < 240) {
      image(splatImage, splat.xPos, splat.yPos, 80, 80);
    }
  });
}

function loadSushiHalves() {
  sushi1_1 = loadImage("./assets/sushi1_1.png");
  sushi1_2 = loadImage("./assets/sushi1_2.png");
  sushi2_1 = loadImage("./assets/sushi2_1.png");
  sushi2_2 = loadImage("./assets/sushi2_2.png");
  sushi3_1 = loadImage("./assets/sushi3_1.png");
  sushi3_2 = loadImage("./assets/sushi3_2.png");
  sushi4_1 = loadImage("./assets/sushi4_1.png");
  sushi4_2 = loadImage("./assets/sushi4_2.png");
  sushi5_1 = loadImage("./assets/sushi5_1.png");
  sushi5_2 = loadImage("./assets/sushi5_2.png");
}

function endGame() {
  slices = [];
  sushi = [];
  splats = [];
  halves = [];
  stop = true;
}

function processLevel() {
  const levelThreshold = 0.8 - (level * 0.08);
  return levelThreshold;
}

function newLevel() {
  slices = [];
  splats = [];
  halves = [];
  sushi = [];
  newLevelTimer += 1;
  if (newLevelTimer > 240) {
    pauseForNewLevel = false;
  }
}

function processScore() {
  if (score == 5 && level == 1) {
    pauseForNewLevel = true;
    level += 1;
    newLevelTimer = 0;
  } else if (score == 12 && level == 2) {
    pauseForNewLevel = true;
    level += 1;
    newLevelTimer = 0;
  } else if (score == 30 && level == 3) {
    pauseForNewLevel = true;
    level += 1;
    newLevelTimer = 0;
  } else if (score == 50 && level == 4) {
    pauseForNewLevel = true;
    level += 1;
    newLevelTimer = 0;
  } else if (score == 90 && level == 5) {
    pauseForNewLevel = true;
    level += 1;
    newLevelTimer = 0;
  } else if (score == 130 && level == 6) {
    pauseForNewLevel = true;
    level += 1;
    newLevelTimer = 0;
  }
}

function mouseClicked() {
  if (stop && (mouseX < width && mouseY < height)) {
    stop = false;
    score = 0;
    lives = 3;
    level = 0;
  } else if (paused && (mouseX < width && mouseY < height)) {
    paused = false;
    backgroundSong.play();
  } else if (!paused) {
    if ((mouseX > 30 && mouseX < 60) && (mouseY > (height / 2 - 80))) {
      paused = true;
      slices.pop();
      backgroundSong.pause();
    }
  }
}

function newLevelTextShuffler(level) {
  const text = [`Level ${level - 1} was a piece of sashimi cake...`, `You barely passed level ${level - 1}...`, `I'm actually impressed with your score for ${level - 1}`, "You seem like a promising chef."]
  return text[level - 2];
}

function newLevelText(lev) {
  textAlign(CENTER, CENTER);
  stroke(0);
  fill(255);
  textSize(40);
  textFont(sevenSwordsman);
  text(newLevelTextShuffler(lev), width / 2, height / 2 - 50);
  text(`But let's see how you do on level ${level}...`, width / 2, height / 2 + 50);
}

function renderPause() {
  image(pausedImg, 30, height - 55, 30, 30);
}

function renderPauseText() {
  textAlign(CENTER, CENTER);
  stroke(0);
  fill(255);
  textSize(40);
  textFont(sevenSwordsman);
  text("Paused", width / 2, height / 2 - 50);
  text("Click anywhere to continue", width / 2, height / 2 + 50);
}
