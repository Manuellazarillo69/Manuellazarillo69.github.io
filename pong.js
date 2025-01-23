// Obtén el contexto del canvas
const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Variables del juego
const ballRadius = 10;
const paddleWidth = 10;
const paddleHeight = 100;
let upArrowPressed = false;
let downArrowPressed = false;
let playerY = (canvas.height - paddleHeight) / 2;
let computerY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;

// Movimiento de la pelota
function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Colisiones con el techo y el suelo
  if (ballY - ballRadius <= 0 || ballY + ballRadius >= canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Colisión con las palas
  if (ballX - ballRadius <= paddleWidth && ballY >= playerY && ballY <= playerY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  } else if (ballX + ballRadius >= canvas.width - paddleWidth && ballY >= computerY && ballY <= computerY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }

  // Si la pelota se sale del lado izquierdo o derecho, reinicia la posición
  if (ballX - ballRadius <= 0 || ballX + ballRadius >= canvas.width) {
    resetBall();
  }
}

// Dibuja la pelota
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#FFF";
  ctx.fill();
  ctx.closePath();
}

// Dibuja la pala del jugador
function drawPlayerPaddle() {
  ctx.beginPath();
  ctx.rect(0, playerY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#FFF";
  ctx.fill();
  ctx.closePath();
}

// Dibuja la pala de la computadora
function drawComputerPaddle() {
  ctx.beginPath();
  ctx.rect(canvas.width - paddleWidth, computerY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#FFF";
  ctx.fill();
  ctx.closePath();
}

// Dibuja el marcador
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#FFF";
  ctx.fillText("Jugador", 50, 20);
  ctx.fillText("Computadora", canvas.width - 150, 20);
}

// Mueve la pala del jugador
function movePaddles() {
  if (upArrowPressed && playerY > 0) {
    playerY -= 5;
  }
  if (downArrowPressed && playerY + paddleHeight < canvas.height) {
    playerY += 5;
  }

  // Movimiento de la pala de la computadora (movimiento simple, sigue a la pelota)
  if (ballY < computerY + paddleHeight / 2) {
    computerY -= 4;
  } else if (ballY > computerY + paddleHeight / 2) {
    computerY += 4;
  }
}

// Resetea la pelota
function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = 4;
}

// Detectar teclas presionadas
document.addEventListener('keydown', function(e) {
  if (e.key == "ArrowUp") {
    upArrowPressed = true;
  } else if (e.key == "ArrowDown") {
    downArrowPressed = true;
  }
});

document.addEventListener('keyup', function(e) {
  if (e.key == "ArrowUp") {
    upArrowPressed = false;
  } else if (e.key == "ArrowDown") {
    downArrowPressed = false;
  }
});

// Función principal para dibujar y actualizar el juego
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  moveBall();
  movePaddles();
  drawBall();
  drawPlayerPaddle();
  drawComputerPaddle();
  drawScore();
  
  requestAnimationFrame(gameLoop);
}

// Inicia el juego
gameLoop();
