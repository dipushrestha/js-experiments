import { getDistance, getRandomColor, appendPX } from './utils.js';

export default class Ball {
  constructor(x, y, radius, parent, parentWidth, parentHeight, balls) {
    this.x = x;
    this.y = y;
    this.balls = balls;
    this.mass = radius;
    this.radius = radius;
    this.parent = parent;
    this.dx = (Math.random() - 0.5) * 3;
    this.dy = (Math.random() - 0.5) * 3;
    this.parentWidth = parentWidth;
    this.parentHeight = parentHeight;
    this.element = null;
  }

  init() {
    this.element = document.createElement('div');
    this.element.className = 'ball';
    this.element.style.width = appendPX(this.radius * 2);
    this.element.style.height = appendPX(this.radius * 2);
    this.element.style.backgroundColor = getRandomColor();
    this.parent.appendChild(this.element);
    return this;
  }

  move() {
    if (this.x - this.radius <= 0) {
      this.dx *= -1;
      this.x = this.radius;
    } else if (this.x + this.radius >= this.parentWidth) {
      this.dx *= -1;
      this.x = this.parentWidth - this.radius;
    }

    if (this.y - this.radius <= 0) {
      this.dy *= -1;
      this.y = this.radius;
    } else if (this.y + this.radius >= this.parentHeight) {
      this.dy *= -1;
      this.y = this.parentHeight - this.radius;
    }

    for (let ball of this.balls) {
      if (this === ball) continue;

      let combinedRadius = this.radius + ball.radius;
      let distanceBetweenBalls = getDistance(
        this.x + this.dx,
        this.y + this.dy,
        ball.x + ball.dx,
        ball.y + ball.dy
      );

      if (distanceBetweenBalls < combinedRadius) {
        let tempX = this.dx;
        let tempY = this.dy;
        this.dx = ball.dx;
        this.dy = ball.dy;
        ball.dx = tempX;
        ball.dy = tempY;
        this.element.style.backgroundColor = getRandomColor();
      }
    }

    this.x += this.dx;
    this.y += this.dy;
  }

  draw() {
    this.element.style.left = appendPX(this.x - this.radius);
    this.element.style.top = appendPX(this.y - this.radius);
  }
}
