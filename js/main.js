console.log("main.js loaded");

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var ballRadius = 10;
var x = canvas.width;
var y = canvas.height;
var dx = 2;
var dy = -2;
var paddleHeight = 30;
var paddleWidth = 150;
var paddleMove = (canvas.width - paddleWidth)/2;
var brickRowCount = 5;
var brickColumnCount = 11;
var brickWidth = 105;
var brickHeight = 40;
var brickPadding = 5;
var bricks = [];

//function to draw ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = 'purple';
  ctx.closePath();
  ctx.fill();
}

//function to draw paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleMove, (canvas.height - paddleHeight), paddleWidth, paddleHeight);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

//function to control arrow keys
function move(e) {
  if (e.keyCode === 39) {
    paddleMove += 20;
  }
  if (e.keyCode === 37) {
    paddleMove -= 20;
  }
//sets boundaries for paddles
  if (paddleMove > canvas.width) {
    paddleMove = 0;
  }
  if (paddleMove < 0) {
    paddleMove = canvas.width;
  }
  canvas.width = canvas.width;
}
document.onkeydown = move;

//function to create bricks in an array
function createBrick() {
  for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
      for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0,
                         y: 0,
                         status: 1};
      }
  }
}
createBrick();

//function to draw bricks on canvas
function drawBricks() {
  //if(bricks[c][r].status=== 1) {
  for(c = 0; c < brickColumnCount; c++) {
    for(r = 0; r < brickRowCount; r++) {
      var brickX = (c * (brickWidth + brickPadding));
        var brickY = (r * (brickHeight + brickPadding));
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath()
          ctx.rect(brickX, brickY, brickWidth, brickHeight)
          ctx.fillStyle = "magenta"
          ctx.fill()
          ctx.closePath();
//}
    }
  }
}

//function to detect if ball hits a brick
function collisionDetection() {
  for(c=0; c<brickColumnCount; c++) {
    for(r=0; r<brickRowCount; r++) {
      ctx.fillStyle = "magenta";
      var brickX = bricks[c][r].x;
      var brickY = bricks[c][r].y;
        if (ctx.fillStyle = "magenta" && x > brickX && x < (brickX + brickWidth) && y > brickY && y < (brickY + brickHeight)) {
        dy = -dy;
        ctx.fillStyle = 'white';
        }
    }
  }
}

//function that draws entire canvas. all other canvas elements drawn here
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
//conditional to check if ball is going beyond the boundaries of the canvas
    if (x > canvas.width + ballRadius || x < 0) {
      dx = -dx;
    } else if (y > canvas.length + ballRadius || y < 0) {
      dy = -dy;
    }
//if ball goes below x-axis, stop
    if (y > canvas.height + 30) {
      dx = 0;
      dy = 0;
//alert("you lose");
    }
//deflects ball off paddle
    if (y < ballRadius) {
      dy = -dy;
    } else if (y > canvas.height - ballRadius) {
      if(x > paddleMove && x < paddleMove + paddleWidth) {
        dy = -dy;
      }
    }
    x += dx;
    y += dy;
  }

setInterval(draw, 10);

















