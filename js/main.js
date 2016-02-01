console.log("main.js loaded");

/*function draw() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var raf;

    var x = canvas.width;
    var y = canvas.height;
    ctx.fillStyle = "#0095DD";
    var height = 40;
    var width = 100;

    for (var i = 0; i < 6; i++) {
      var yPos = width * i;
        for (var j = 0; j < 11; j++) {
          ctx.fillRect((width + 10 ) * j, yPos / 2, width, height);
        }
    }
  var ball = {
    x: canvas.width,
    y: canvas.height,
    dx: 2,
    dy: -2,
    radius: 50,
    color: 'purple',
    ballDraw: function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
      x += dx;
      y += dy;
    }
  }
}
*/

window.onload = function() {
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var ballRadius = 10;
var x = canvas.width;
var y = canvas.height;
var dx = 4;
var dy = -2;
var myBall = ctx.arc(x, y, ballRadius, 0, Math.PI*2);
var paddleHeight = 20;
var paddleWidth = 90;
var paddleMove = (canvas.width - paddleWidth)/2;
//var rightPressed = false;
//var leftPressed = false;

  function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI*2);
      ctx.fillStyle = 'purple';
      ctx.closePath();
      ctx.fill();
  }

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleMove, (canvas.height - paddleHeight), paddleWidth, paddleHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }

  function move(e) {
    /*if (e.keyCode == 37) {
      rightPressed = true;
      alert("right pressed!");
    } else if (e.keyCode == 39) {
      leftPressed = true;
      alert("left pressed!")
    }*/
    //alert(e.keyCode);
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

function bricks() {
    ctx.beginPath();
    ctx.rect(0, 0, height, width);
    ctx.fillStyle = 'pink';
    ctx.fill();
    ctx.closePath();
    var height = 40;
    var width = 100;

    for (var i = 0; i < 6; i++) {
      var yPos = width * i;
        for (var j = 0; j < 11; j++) {
          ctx.fillRect((width + 10 ) * j, yPos / 2, width, height);
        }
    }
}

  function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();
      drawPaddle();
      bricks();
      if (x > canvas.width + ballRadius || x < 0) {
        dx = -dx;
      } else if (y > canvas.length + ballRadius || y < 0) {
        dy = -dy; //change to width to prevent it from disappearing on bottom
      }
      //if ball goes below x-axis, stop
      if (y > canvas.height+ 30) {
        dx = 0;
        dy = 0;
      }
      //deflects ball off paddle
      //logic?
     if (y < ballRadius) {
      dy = -dy;
     } else if (y > canvas.height - ballRadius) {
        if(x > paddleMove && x < paddleMove + paddleWidth) {
          dy = -dy;
        }}
      //if (x > (canvas.width + ballRadius + paddleHeight)) {
      //  dx = -dx;
      //}
      x += dx;
      y += dy;
  }

  setInterval(draw, 8);

}















