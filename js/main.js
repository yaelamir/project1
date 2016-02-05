//global pollution
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//ball variables
var ballRadius = 15;
//ball starting positions on x & y axis
var x = canvas.width/2;
var y = canvas.height - 45;
//ball starting trajectory
var dx = 2;
var dy = -2;
//paddle variables
var paddleHeight = 30;
var paddleWidth = 150;
//paddle starting position
var paddleMove = (canvas.width - paddleWidth)/2;
//brick variables
var brickRowCount = 5;
var brickColumnCount = 11;
var brickPadding = 5;
var bricks = [];
//interval variable
var intervalID;
// score counter
var score = 0;
// click to start ball motion variable
var moving = false;
// toggle button variables
var toggle = 'play';
var toggleBtn = document.getElementById('toggleBtn');
var paused = false;

// hook up event listeners
toggleBtn.addEventListener('click', function(event) {
  if (toggleBtn.innerHTML === 'Start') {
    intervalID = setInterval(draw, 8);
    toggleBtn.innerHTML = 'Pause';
  } else {
    toggleBtn.innerHTML = paused ? 'Pause' : 'Resume';
    paused = !paused;
  }
});

// draws ball
function drawBall() {
  if (paused) return;
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = 'rgb('+
  Math.floor(Math.random()*256)+','+
  Math.floor(Math.random()*256)+','+
  Math.floor(Math.random()*256)+')';
  ctx.closePath();
  ctx.fill();
  moving = true;
}

// draws paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleMove, (canvas.height - paddleHeight), paddleWidth, paddleHeight);
  ctx.fillStyle = '#fdfd96';
  ctx.fill();
  ctx.closePath();
}

// controls arrow keys
function move(e) {
  if (paused) return;
  if (e.keyCode === 39) {
    paddleMove += 80;
  }
  if (e.keyCode === 37) {
    paddleMove -= 80;
  }
  //removes boundaries for paddle to loop thru walls
  if (paddleMove > canvas.width) {
    paddleMove = 0;
  }
  if (paddleMove < 0) {
    paddleMove = canvas.width;
  }
}
document.onkeydown = move;

// creates bricks
function createBrick() {
  for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
      for (r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0,
                         y: 0,
                         status: 1,
                         brickWidth: 105,
                         brickHeight: 40
                         };
      }
  }
}
createBrick();

// draws bricks on canvas
function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        bricks[c][r].x = (c * (bricks[c][r].brickWidth + brickPadding));
        bricks[c][r].y = (r * (bricks[c][r].brickHeight + brickPadding));
        ctx.beginPath();
        ctx.fillStyle = 'rgb(0,' + Math.floor(255 - 42.5 * r) + ',' + Math.floor(255 - 15 * c) + ')';
        ctx.rect(bricks[c][r].x, bricks[c][r].y, bricks[c][r].brickWidth, bricks[c][r].brickHeight);
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// detects if ball hits a brick
function collisionDetection() {
  if (paused) return;
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1 &&
          x > bricks[c][r].x &&
          x < (bricks[c][r].x + bricks[c][r].brickWidth)
          && y > bricks[c][r].y
          && y < (bricks[c][r].y + bricks[c][r].brickHeight)) {
            dy = -dy;
            ballHitBrick.play();
            bricks[c][r].status = 0;
            score += 5;
      }
    }
  }
}

// draws score on canvas
function drawScore() {
    ctx.font = '25px Impact, Charcoal, sans-serif';
    ctx.fillStyle = 'white';
    ctx.fillText('SCORE: ' + score, 10, 585);
}

//checks to see if user won
var winningConditions = function() {
  var total = 0;
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      total += bricks[c][r].status;
    }
  }
  if (total === 0) {
    winner.play();
    clearInterval(intervalID);
    ctx.font = '200px Impact, Charcoal, sans-serif';
    ctx.fillStyle = 'red';
    ctx.fillText('WINNER', 270, 400);
    ctx.font = '50px Impact, Charcoal, sans-serif'
    ctx.fillText('HIGH SCORE OF 275!', 400, 200);
  }
}

//checks if player has lost
function loseTheGame() {
  if (paused) return;
  if (y > canvas.height + 30) {
    dx = 0;
    dy = 0;
    loser.play();
    clearInterval(intervalID);
    ctx.font = '200px Impact, Charcoal, sans-serif';
    ctx.fillStyle = 'red';
    ctx.fillText('LOSER', 360, 400);
    ctx.font = '50px Impact, Charcoal, sans-serif'
    ctx.fillText('Final Score: ' + score, 470, 200);
  }
}

//draws entire canvas
//all other canvas elements called here
function draw() {
  if (paused) return;
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();
  winningConditions();
  loseTheGame();
  drawScore();
  //conditionals to check if ball is going beyond the boundaries of the canvas
  if (x + dx > canvas.width || x + dx < 0) {
    dx = -dx;
    playBallHitSound();
  }
  if (y + dy < canvas.length || y + dy < 0) {
    dy = -dy;
    playBallHitSound();
  }
  //causes ball to change direction if it hits paddle
  if (y < ballRadius) {
    dy = -dy;
    ballHitPaddle.play();
  }
  if (y + dy > canvas.height - paddleHeight) {
    if (x > paddleMove && x < paddleMove + paddleWidth) {
      if (x < paddleMove + (paddleWidth / 3)) {
        dx = dx < 0 ? -3 : 1;
      } else if (x < paddleMove + (paddleWidth / 3 * 2)) {
        dx = dx < 0 ? -2 : 2;
      } else {
        dx = dx < 0 ? -1 : 3;
      }
      dy = -dy;
      ballHitPaddle.play();
    }
  }
  x += dx;
  y += dy;
}

//checks which brick is currently being broken
//and how many remain to be broken
function winTheGame() {
  for (var i = 0; i < bricks.length; i++) {
    for (var j = 0; j < bricks[i].length; j++) {
      console.log('breaking brick:', i, j);
      ctx.font = '20px Arial';
      ctx.fillStyle = '#0095DD';
      ctx.fillText('Bricks Remaining: ' + total, 8, 585);
      bricks[i][j].status = 0;
    }
  }
}

//separate canvas for title
function drawText() {
  var ctx = document.getElementById('textCanvas').getContext('2d');
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;
  ctx.shadowColor = '#B9D3EE';
  ctx.font = '70px Impact, Charcoal, sans-serif';
  ctx.fillStyle = 'white';
  ctx.fillText('BRICK BREAKER', 10, 60);
}
drawText();

//audio manipulation
var ballHitWall = new Audio('sounds/wall.wav')
var playBallHitSound = function () {
  ballHitWall.play();
}
var ballHitPaddle = new Audio('sounds/paddle.wav')
var playBallHitPaddleSound = function () {
  ballHitPaddle.play();
}
var ballHitBrick = new Audio('sounds/newbrick.wav')
var playBallHitBrickSound = function () {
  ballHitBrick.play();
}
var loser = new Audio('sounds/loser.wav')
var playLoserSound = function () {
  loser.play();
}
var winner = new Audio('sounds/winner.wav')
var playWinnerSound = function () {
  winner.play();
}

draw();


