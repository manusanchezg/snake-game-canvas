export default class Snake {
  constructor(ctx) {
    this.headColor = "#331E36";
    this.eyesColor = "#B399A2";
    this.size = 3;
    this.snake = [
      [110, 30],
      [90, 30],
      [70, 30],
    ];
    this.scale = "10";
    this.ctx = ctx;
    this.lastDir = "right"
  }

  restartLocation() {
    this.snake = [
      [110, 30],
      [90, 30],
      [70, 30],
    ];
  }

  drawSnake() {
    for (let i = 0; i < this.size; i++) {
      const tailSize = this.scale - i < 5 ? 5 : this.scale - i
      this.ctx.beginPath();
      this.ctx.arc(this.snake[i][0], this.snake[i][1], tailSize, 0, 2 * Math.PI);
      this.ctx.fillStyle = this.headColor;
      this.ctx.fill();
    }
  }

  checkHeadCollision() {
    for (let i = 1; i < this.snake.length; i++) {
      if (this.snake[0][0] == this.snake[i][0] && this.snake[0][1] == this.snake[i][1]) {
        return true;
      }
    }
    return false;
  }
}
