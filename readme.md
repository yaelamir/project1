Name:
Brick Breaker

**Description:**  
The goal is to catch the ball in order to break all the bricks. If the ball isn't caught - GAME OVER. You win when you break all the bricks.

**Code Snippet:**

**Instructions:**

**Development & Tools:**

**Authors:**

**Contact Info:**

**Brief History:**


var ball = {
    x: canvas.width/2,
    y: canvas.height - 30,
    dx: 2,
    dy: -2,
    radius: 20,
    color: 'purple',
    draw: function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
      x += dx;
      y += dy;

    }
  }

ball.draw();

}
setInterval(draw, 10);





