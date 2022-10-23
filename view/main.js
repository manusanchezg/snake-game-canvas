import Controller from "../controller/controller.js";
import Snake from "../model/snake.js";
import Apple from "../model/apple.js";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
/** @type {Snake} */
const snake = new Snake(ctx);
/** @type {Apple} */
const apple = new Apple(ctx, canvas.width, canvas.height);

const controller = new Controller(canvas, ctx, apple, snake);
controller.drawBoard();
apple.createFruit();
apple.draw();
snake.drawSnake();

const score = document.getElementById("score");
score.textContent = `score: ${controller.score}`;

document.addEventListener("keydown", keyDown);

const restart = document.getElementById("restart");
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const resume = document.getElementById("resume");
let loop;

start.addEventListener("click", (e) => {
  loop = setInterval(game, 200);
  start.hidden = true;
  restart.hidden = false;
});

restart.addEventListener("click", (e) => {
  clearInterval(loop);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  controller.drawBoard();
  apple.createFruit();
  apple.draw();
  snake.restartLocation();
  snake.drawSnake();
});

pause.addEventListener("click", (e) => {
  clearInterval(loop);
  pause.hidden = true;
  resume.hidden = false;
  document.removeEventListener("keydown", keyDown);
});

resume.addEventListener("click", (e) => {
  loop = setInterval(game, 200);
  resume.hidden = true;
  pause.hidden = false;
  document.addEventListener("keydown", keyDown);
});

function game() {
  controller.moveSnake(snake.snake, snake.lastDir);
  controller.checkInvalidCollision();
  snake.checkHeadCollision();
  score.textContent = `score: ${controller.score}`;
}

function keyDown(e) {
  switch (e.key) {
    case "ArrowUp":
      snake.lastDir = "up";
      break;
    case "ArrowDown":
      snake.lastDir = "down";
      break;
    case "ArrowLeft":
      snake.lastDir = "left";
      break;
    case "ArrowRight":
      snake.lastDir = "right";
      break;

    default:
      break;
  }
}
