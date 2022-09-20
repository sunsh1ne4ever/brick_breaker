import "./style.css";
import Ball from "./model/Ball.js";
import Paddle from "./model/Paddle.js";
import Brick from "./model/Brick.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const ball = new Ball(
  canvas.width / 2,
  canvas.height - 30,
  10,
  10,
  "#0095DD",
  1,
  -1
);

const paddle = new Paddle(
  (canvas.width - 10) / 2,
  canvas.height - 10,
  75,
  10,
  "#0095DD"
);

const brickRowCount = 3;
const brickColumnCount = 5;
const bricks = [];
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

for (let c = 0; c < brickColumnCount; c++) {
  for (let r = 0; r < brickRowCount; r++) {
    let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
    let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
    bricks.push(new Brick(brickX, brickY, brickWidth, brickHeight, "#0095DD"));
  }
}

let isGameOver = false;
let score = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);

  ball.draw(ctx);
  ball.move();
  isGameOver = !ball.bounce(canvas.width, canvas.height);

  paddle.draw(ctx);
  paddle.move(canvas.width);

  ball.colides(paddle);

  bricks.forEach((brick) => {
    brick.draw(ctx);
    if (brick.colides(ball)) {
      score++;
    }
  });
  
  if (!isGameOver) {
    if (score == brickRowCount * brickColumnCount) {
      window.alert("You won!");
    } else {
      window.requestAnimationFrame(draw);
    }
  } else {
    window.alert("Game over!");
  }
}

draw();
