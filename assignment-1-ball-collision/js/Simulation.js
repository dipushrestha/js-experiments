import { getRandomInt, getDistance } from './utils.js';
import Ball from '../js/Ball.js';

const BALL_SIZE = { MIN: 20, MAX: 30 };

export default class Simulation {
  constructor(parent, parentWidth, parentHeight, numberOfBalls, frameRate) {
    this.balls = [];
    this.parent = parent;
    this.parentWidth = parentWidth;
    this.parentHeight = parentHeight;
    this.frameRate = frameRate;
    this.numberOfBalls = numberOfBalls;
  }

  init() {
    for (let i = 0; i < this.numberOfBalls; i++) {
      let ballRadius = getRandomInt(BALL_SIZE.MIN, BALL_SIZE.MAX);
      let ballX = getRandomInt(ballRadius, this.parentWidth - ballRadius);
      let ballY = getRandomInt(ballRadius, this.parentHeight - ballRadius);
      if (i !== 0) {
        for (let j = 0; j < this.balls.length; j++) {
          let distanceBetweenBalls = getDistance(ballX, ballY, this.balls[j].x, this.balls[j].y);
          let combinedRadius = ballRadius + this.balls[j].radius;

          if (distanceBetweenBalls - combinedRadius <= 0) {
            ballX = getRandomInt(ballRadius, this.parentWidth - ballRadius);
            ballY = getRandomInt(ballRadius, this.parentHeight - ballRadius);

            j = -1;
          }
        }
      }
      let ball = new Ball(
        ballX,
        ballY,
        ballRadius,
        this.parent,
        this.parentWidth,
        this.parentHeight,
        this.balls
      );
      ball.init();
      ball.draw();
      this.balls.push(ball);
    }

    this.parent.addEventListener('click', e => {
      if (e.target.className === 'ball') {
        container.removeChild(e.target);
        let index = -1;
        for (let i = 0; i < this.balls.length; i++) {
          if (this.balls[i].element === e.target) index = i;
        }
        if (index > -1) this.balls.splice(index, 1);
      }
    });
  }

  update() {
    for (let ball of this.balls) {
      ball.move();
      ball.draw();
    }
  }

  animate() {
    setInterval(this.update.bind(this), 1000 / this.frameRate);
  }
}
