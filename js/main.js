console.log("main.js loaded");

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//var refreshIntervalId = setInterval(draw, 2);
var ballRadius = 13;
var x = canvas.width;
var y = canvas.height;
var dx = 2;
var dy = -2;
var paddleHeight = 30;
var paddleWidth = 150;
var paddleMove = (canvas.width - paddleWidth)/2;
var brickRowCount = 5;
var brickColumnCount = 11;
//var brickWidth = 105;
//var brickHeight = 40;
var brickPadding = 5;
var bricks = [];
//var wonGame = false;
//var stop = setInterval(draw, 2);
var intervalID;
var toggle = "play";
//function to draw ball
function drawBall() {
  ctx.beginPath();

  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = '#9FB6CD';

  ctx.closePath();
  ctx.fill();
}

//function to draw paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleMove, (canvas.height - paddleHeight), paddleWidth, paddleHeight);
  ctx.fillStyle = "#8B8989";
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
  // canvas.width = canvas.width;
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
          //ctx.fillStyle = "magenta";
          ctx.fillStyle = 'rgb(0,' + Math.floor(255-42.5*r) + ',' +
                         Math.floor(255-15*c) + ')';
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

    //alert("you win");
    clearInterval(intervalID);
ctx.font = "200px Impact, Charcoal, sans-serif";
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    ctx.shadowColor = "#C6E2FF";
    ctx.fillStyle = 'white';
    ctx.fillText("YOU WIN!", 218, 400);
  }
  //wonGame = true;
}

function loseTheGame () {
  if (y > canvas.height + 30) {
    dx = 0;
    dy = 0;
    clearInterval(intervalID);
    ctx.font = "200px Impact, Charcoal, sans-serif";
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    ctx.shadowBlur = 10;
    //ctx.textBlur = 10;
    ctx.shadowColor = "#C6E2FF";
    ctx.fillStyle = 'black';
    ctx.fillText("YOU LOSE!", 218, 400);


    /*var h2 = document.createElement("h1")
    h2.textContent = "You Lose!";
    h2.style.cssText = "color: blue; font-size: 100px; bottom: 20px; margin-bottom: 100px; font: arial;";
    document.body.appendChild(h2);*/
  }

  //function that draws entire canvas. all other canvas elements drawn here
}
//if (wonGame === false) {
function draw() {
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();
  winningConditions();
  loseTheGame();
  pauseResume();

  //conditionals to check if ball is going beyond the boundaries of the canvas
  if (x > canvas.width + ballRadius || x < 0) {
    dx = -dx;
  }
  if (y < canvas.length - ballRadius || y < 0) {
    dy = -dy;
  }
  //causes ball to change direction if it hits paddle
  if (y < ballRadius) {
    dy = -dy;
  }
  if (y > canvas.height - paddleHeight - ballRadius) {
    if (x > paddleMove && x < paddleMove + paddleWidth) {
      dy = -dy;
    }
  }
  x += dx;
  y += dy;
  //pause and resume


}

intervalID = setInterval(draw, 5);

function pauseResume() {
document.getElementById("toggle").addEventListener('click', function(event) {
  if (toggle === "play") {
    document.getElementById("toggle").innerHTML = 'Resume';
  intervalID;
  toggle = "pause";
  } else if (toggle === "pause") {
    dx = 0;
    dy = 0;
    //clearInterval(intervalID);
  document.getElementById("toggle").innerHTML = 'Pause';
  toggle = "play";
}
})

function winTheGame() {
  for (var i = 0; i < bricks.length; i++) {
    for (var j = 0; j < bricks[i].length; j++) {
      console.log("breaking brick:", i, j);
      bricks[i][j].status = 0;
    }
  }
}
}

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





