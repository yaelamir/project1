console.log("main.js loaded");

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var ballRadius = 15;
var x = canvas.width;
var y = canvas.height;
var dx = 2;
var dy = -2;
var paddleHeight = 30;
var paddleWidth = 150;
var paddleMove = (canvas.width - paddleWidth)/2;
var brickRowCount = 5;
var brickColumnCount = 11;
var brickPadding = 5;
var bricks = [];
var intervalID;
var toggle = "play";
var score = 0;

//function to draw ball

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "rgb("+
  Math.floor(Math.random()*256)+","+
  Math.floor(Math.random()*256)+","+
  Math.floor(Math.random()*256)+")";//'"#" + Math.floor(Math.random()*0xFFFFFF).toString(16)';//'#CB99C9';//'#9FB6CD';
  ctx.closePath();
  ctx.fill();
}

//function to draw paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleMove, (canvas.height - paddleHeight), paddleWidth, paddleHeight);
  ctx.fillStyle = "#00FA9A";
  ctx.fill();
  ctx.closePath();
}

//function to control arrow keys
function move(e) {
  if (e.keyCode === 39) {
    paddleMove += 40;
  }
  if (e.keyCode === 37) {
    paddleMove -= 40;
  }
  //sets boundaries for paddle
  if (paddleMove > canvas.width) {
    paddleMove = 0;
  }
  if (paddleMove < 0) {
    paddleMove = canvas.width;
  }
}
document.onkeydown = move;

//function to create bricks in an array
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

//function to draw bricks on canvas
function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        bricks[c][r].x = (c * (bricks[c][r].brickWidth + brickPadding));
        bricks[c][r].y = (r * (bricks[c][r].brickHeight + brickPadding));
          ctx.beginPath();
          ctx.fillStyle = 'rgb(0,' + Math.floor(255-42.5*r) + ',' + Math.floor(255-15*c) + ')';
          ctx.rect(bricks[c][r].x, bricks[c][r].y, bricks[c][r].brickWidth, bricks[c][r].brickHeight);
          ctx.fill();
          ctx.closePath();
      }
    }
  }
}

//function to detect if ball hits a brick
function collisionDetection() {
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

      }
    }
  }
}

//checks to see if user won
var winningConditions = function() {
  var total = 0;
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      total += bricks[c][r].status;
    }
  }
  console.log("total bricks left:", total);
  if (total === 0) {
    winner.play();
    clearInterval(intervalID);
    ctx.font = "200px Impact, Charcoal, sans-serif";
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    ctx.shadowColor = "#C6E2FF";
    ctx.fillStyle = 'white';
    ctx.fillText("WINNER", 218, 400);
  }
}

function loseTheGame () {
  if (y > canvas.height + 30) {
    dx = 0;
    dy = 0;
    loser.play();
    clearInterval(intervalID);
    ctx.font = "200px Impact, Charcoal, sans-serif";
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    ctx.shadowBlur = 10;
    //ctx.textBlur = 10;
    ctx.shadowColor = "#C6E2FF";
    ctx.fillStyle = 'black';
    ctx.fillText("LOSER", 360, 400);
  }
}

//function that draws entire canvas
//all other canvas elements drawn here
function draw() {
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();
  winningConditions();
  loseTheGame();
  pauseResume();
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
      dy = -dy;
      ballHitPaddle.play();
      if (dx > 0) {
        if (dx + x < paddleMove){
          dx *= (-2);
        } else {
          dx = dx;
        }
        //it hits the left side dx *=(-1)

      } else {
        dy = dy;
        //if it hits the right side dx *=(-1)
      }
    }
  }

  x += dx;
  y += dy;
  //pause and resume
}

intervalID = setInterval(draw, 8);

function pauseResume() {
  var tempdx = 0;
  var tempdy = 0;
  document.getElementById("toggle").addEventListener('click', function(event) {
  if (toggle === "pause") {
    // tempdx = dx;
    // tempdy = dy;
    // dx = 0;
    // dy = 0;
    document.getElementById("toggle").innerHTML = 'Pause';
    toggle = "play";
  } else if (toggle === "play") {
   document.getElementById("toggle").innerHTML = 'Resume';
    //intervalID;
    // dx = tempdx;
    // dy = tempdy;
    toggle = "pause";
    //clearInterval(intervalID);

    }
  });
}

function winTheGame() {
  for (var i = 0; i < bricks.length; i++) {
    for (var j = 0; j < bricks[i].length; j++) {
      console.log("breaking brick:", i, j);
      ctx.font = "20px Arial";
      ctx.fillStyle = "#0095DD";
      ctx.fillText("Bricks Remaining: " + total, 8, 585);
      bricks[i][j].status = 0;
    }
  }
}
/*function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Bricks Remaining: "+total, 8, 585);
}*/

//text for second canvas
function drawText() {
  var ctx = document.getElementById('textCanvas').getContext('2d');
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;
  //ctx.shadowBlur = 2;
  ctx.shadowColor = "#B9D3EE";
  ctx.font = "70px Impact, Charcoal, sans-serif";
  ctx.fillStyle = "white";
  ctx.fillText("BRICK BREAKER", 10, 60);
}
drawText();


//audio manipulation
//////////////////

// var ballHitWall = $("#sounds")[0];

var ballHitWall = new Audio("sounds/wall.wav")
var playBallHitSound = function () {
  ballHitWall.play();
}
var ballHitPaddle = new Audio("sounds/paddle.wav")
var playBallHitPaddleSound = function () {
  ballHitPaddle.play();
}
var ballHitBrick = new Audio("sounds/newbrick.wav")
var playBallHitBrickSound = function () {
  ballHitBrick.play();
}
var loser = new Audio("sounds/loser.wav")
var playLoserSound = function () {
  loser.play();
}
var winner = new Audio("sounds/winner.wav")
var playWinnerSound = function () {
  winner.play();
}


