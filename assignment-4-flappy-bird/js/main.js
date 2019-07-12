import Bird from './Bird.js';
import Obstacle from './Obstacle.js';

const GAME_WIDTH = 650;
const GAME_HEIGHT = 650;
const NO_OF_TUBES = 3;
const TUBE_GAP = 150;

const canvas = document.getElementById('game-container');
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

const ctx = canvas.getContext('2d');
ctx.fillStyle = '#000';

let background = new Image();
let floor = new Image();
let tubeUpImage = new Image();
let tubeDownImage = new Image();
let birdImage = new Image();

let bird;
let score;
let requestId;
let tubes = [];

let startButton = startScreen();

window.addEventListener('keydown', spaceKey);

function spaceKey(e) {
  if (e.code === 'Space') {
    bird.fly();
  }
}

function init() {
  background.src = 'images/background.png';
  floor.src = 'images/floor.png';
  tubeUpImage.src = 'images/pipeNorth.png';
  tubeDownImage.src = 'images/pipeSouth.png';
  birdImage.src = 'images/bird.png';
  bird = new Bird({
    x: 50,
    y: 150,
    gravity: 0.1,
    sprite: birdImage,
    gameContext: ctx,
    floorY: GAME_HEIGHT - floor.height
  });

  for (let i = 0; i < NO_OF_TUBES; i++) {
    let tubeY = Math.floor(Math.random() * 110);

    let tubeUp = new Obstacle({
      x: GAME_WIDTH + (GAME_WIDTH / NO_OF_TUBES) * i,
      y: -tubeY,
      speed: 2,
      sprite: tubeUpImage,
      gameContext: ctx
    });

    let tubeDown = new Obstacle({
      x: GAME_WIDTH + (GAME_WIDTH / NO_OF_TUBES) * i,
      y: tubeUp.sprite.height - tubeY + TUBE_GAP,
      speed: 2,
      sprite: tubeDownImage,
      gameContext: ctx
    });

    tubes.push({ tubePair: [tubeUp, tubeDown] });
  }
}

function startScreen() {
  let startButton = document.createElement('button');
  startButton.innerHTML = 'Start';
  startButton.classList.add('start-button');
  document.body.appendChild(startButton);
  startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    score = 0;
    init();
    draw();
  });
  return startButton;
}

function draw() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  ctx.fillStyle = '#71C5CF';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  let backgroundPattern = ctx.createPattern(background, 'repeat-x');
  ctx.save();
  ctx.fillStyle = backgroundPattern;
  ctx.translate(0, GAME_HEIGHT - background.height - floor.height);
  ctx.fillRect(0, 0, GAME_WIDTH, background.height);
  ctx.restore();

  for (let i = 0; i < tubes.length; i++) {
    tubes[i].tubePair[0].draw();
    tubes[i].tubePair[1].draw();

    if (
      (bird.x + bird.width >= tubes[i].tubePair[0].x &&
        bird.x + bird.width <= tubes[i].tubePair[0].x + tubeUpImage.width &&
        (bird.y <= tubes[i].tubePair[0].y + tubeUpImage.height ||
          bird.y + bird.height >= tubes[i].tubePair[1].y)) ||
      bird.y + bird.height >= canvas.height - floor.height
    ) {
      startButton.innerHTML = 'Game Over <br> Click to start again';
      startButton.style.display = 'block';
      tubes = [];
      window.cancelAnimationFrame(requestId);
      return;
    }

    if (tubes[i].tubePair[0].x + tubeUpImage.width < 0) {
      tubes[i].tubePair[0].x = canvas.width;
      tubes[i].tubePair[1].x = canvas.width;
    }

    if (bird.x === Math.floor(tubes[i].tubePair[0].x + tubeUpImage.width)) {
      score++;
    }
  }

  let floorPattern = ctx.createPattern(floor, 'repeat-x');
  ctx.save();
  ctx.fillStyle = floorPattern;
  ctx.translate(0, GAME_HEIGHT - floor.height);
  ctx.fillRect(0, 0, GAME_WIDTH, floor.height);
  ctx.restore();

  bird.draw();

  ctx.fillStyle = '#fff';
  ctx.font = '36px serif';
  ctx.fillText(`Score: ${score}`, 10, 30);

  requestId = window.requestAnimationFrame(draw);
}
