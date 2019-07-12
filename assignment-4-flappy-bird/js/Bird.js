export default class Bird {
  constructor(props) {
    this.x = props.x;
    this.y = props.y;
    this.gravity = props.gravity;
    this.width = props.sprite.width;
    this.height = props.sprite.height;
    this.sprite = props.sprite;
    this.gameContext = props.gameContext;
    this.floorY = props.floorY;
  }

  draw() {
    this.update();
    this.gameContext.drawImage(this.sprite, this.x, this.y);
  }

  fall() {
    this.gravity += 0.2;
  }

  fly() {
    this.gravity -= 7;
  }

  update() {
    this.fall();
    if (this.y < 0 || this.y + this.sprite.height > this.floorY) {
      if (this.y < 0) {
        this.y = 50;
      } else {
        return;
      }
    } else {
      this.y += this.gravity;
    }
  }
}
