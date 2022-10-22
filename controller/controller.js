import Apple from "../model/apple.js";
import Snake from "../model/snake.js";

export default class Controller {
  /**
   *
   * @param {HTMLCanvasElement} canvas
   * @param {Apple} apple
   * @param {Snake} snake
   */
  constructor(canvas, ctx, apple, snake) {
    this.canvas = canvas;
    this.apple = apple;
    this.snake = snake;
    this.ctx = ctx;
    this.score = 0;
  }

  drawBoard() {
    for (let i = 0; i < 50; i++) {
      this.ctx.strokeStyle = "lightgray";
      this.ctx.moveTo(0, i * 20);
      this.ctx.lineTo(canvas.width, i * 20);
      this.ctx.stroke();
      this.ctx.moveTo(i * 20, 0);
      this.ctx.lineTo(i * 20, canvas.width);
      this.ctx.stroke();
    }
  }

  moveSnake(snake, direction) {
    let x = snake[0][0];
    let y = snake[0][1];
    let currDir = "";
    console.log(currDir);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBoard();
    this.apple.draw();
    switch (direction) {
      case "up":
        if (this.snake.lastDir !== "down") {
          y -= 20;
          this.snake.lastDir = "up";
        }
        break;
      case "down":
        if (this.snake.lastDir !== "up") {
          y += 20;
          this.snake.lastDir = "down";
        }
        break;
      case "left":
        if (this.snake.lastDir !== "right") {
          x -= 20;
          this.snake.lastDir = "left";
        }
        break;
      case "right":
        if (this.snake.lastDir !== "left") {
          x += 20;
          this.snake.lastDir = "right";
        }
        break;
      default:
        break;
    }
    let tail = snake.pop();
    tail[0] = x;
    tail[1] = y;
    snake.unshift(tail);

    this.checkFruitCollision();
    this.snake.drawSnake();
  }

  checkFruitCollision() {
    if (
      this.#checkCollision(
        this.snake.snake[0][0],
        this.snake.snake[0][1],
        this.apple.position[0],
        this.apple.position[1]
      )
    ) {
      this.score++;
      this.snake.size++;
      this.snake.snake.push([
        this.snake.snake[this.snake.snake.length - 1][0],
        this.snake.snake[this.snake.snake.length - 1][1],
      ]);
      this.apple.createFruit();
      this.apple.draw();
      this.snake.drawSnake();
    }
  }

  checkInvalidCollision() {
    if (
      this.snake.snake[0][0] > this.canvas.width ||
      this.snake.snake[0][0] < 0 ||
      this.snake.snake[0][1] < 0 ||
      this.snake.snake[0][1] > this.canvas.height ||
      this.snake.checkHeadCollision()
    ) {
      location = "finish-game.html";
      return true;
    }
    return false;
  }

  #checkCollision(x1, y1, x2, y2) {
    x1 = x1 - (x1 % 10) - 10;
    x2 = x2 - (x2 % 10);
    y1 = y1 - (y1 % 10) - 10;
    y2 = y2 - (y2 % 10);
    if (x1 == x2 && y1 == y2) {
      return true;
    } else {
      return false;
    }
  }
}
