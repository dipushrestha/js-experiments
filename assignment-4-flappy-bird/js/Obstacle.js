export default class Obstacle {
  constructor(props) {
    this.x = props.x;
    this.y = props.y;
    this.speed = props.speed;
    this.sprite = props.sprite;
    this.gameContext = props.gameContext;
  }

  draw() {
    this.move();
    this.gameContext.drawImage(this.sprite, this.x, this.y);
  }

  move() {
    this.x -= this.speed;
  }
}
