import Directions from "./directions.js";

export default class Snake {
  #ctx

  static directionDeltas = new Map([
    [Directions.RIGHT, [1, 0]],
    [Directions.DOWN, [0, 1]],
    [Directions.LEFT, [-1, 0]],
    [Directions.UP, [0, -1]]
  ])

  constructor(ctx) {
    this.headColor = "#331E36";
    this.eyesColor = "#B399A2";
    this.size = 3;
    this.snake = [
      [110, 30],
      [90, 30],
      [70, 30],
    ];
    this.scale = "10"; // size of the snake head
    this.#ctx = ctx;
    this.lastDir = "right"
  }

  get ctx() {
    return this.#ctx
  }

  restartLocation() {
    this.snake = [
      [110, 30],
      [90, 30],
      [70, 30],
    ];
  }

  drawSnake() {
    this.ctx.fillStyle = this.headColor;
    for (let i = 0; i < this.size; i++) {
      const tailSize = this.scale - i < 4 ? 4 : this.scale - i
      this.ctx.beginPath();
      this.ctx.arc(this.snake[i][0], this.snake[i][1], tailSize, 0, 2 * Math.PI);
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

  move() {
    const currHead = this.snake[this.snake.length - 1]
    const delta = Snake.directionDeltas.get(this.lastDir)
    const newHead = {x: currHead.x + delta[0], y: currHead.y + delta[1] };

    this.snake.push(newHead)
    this.snake.shift()
  }
}
