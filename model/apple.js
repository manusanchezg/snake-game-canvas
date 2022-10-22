export default class Apple {
  constructor(ctx, width, height) {
    this.img = new Image();
    this.img.src = "../assets/apple.svg";
    this.img.width = "10px";
    this.img.onload = () => {
      this.draw();
    };
    this.position = [];
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.position[0],
      this.position[1]
    );
  }

  createFruit() {
    const [x, y] = this.#chooseRandomPosition();
    this.position[0] = x;
    this.position[1] = y;
  }

  #chooseRandomPosition() {
    const appleSize = 25;
    let x = Math.floor(Math.random() * this.width - appleSize);
    let y = Math.floor(Math.random() * this.height - appleSize);
    x = x - x % 20
    y = y - y % 20
    return [Math.max(x, 0), Math.max(y, 0)];
  }
}
