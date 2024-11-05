let dino = document.getElementById("dino");
let obstacle = document.getElementById("obstacle");
let scoreElement = document.getElementById("score");

let score = 0;
let isJumping = false;
let gravity = 0.9;
let velocity = 0;
let isGameOver = false;

// Função para fazer o dinossauro pular
function jump() {
  if (isJumping || isGameOver) return;

  isJumping = true;
  velocity = -15;

  let jumpInterval = setInterval(() => {
    if (dino.offsetTop <= 50) {
      velocity += gravity;
      dino.style.top = dino.offsetTop + velocity + "px";
    } else {
      clearInterval(jumpInterval);
      isJumping = false;
    }
  }, 20);
}

// Função para verificar colisão com o obstáculo
function checkCollision() {
  if (isGameOver) return;

  let dinoRect = dino.getBoundingClientRect();
  let obstacleRect = obstacle.getBoundingClientRect();

  if (
    dinoRect.left < obstacleRect.right &&
    dinoRect.right > obstacleRect.left &&
    dinoRect.top < obstacleRect.bottom &&
    dinoRect.bottom > obstacleRect.top
  ) {
    gameOver();
  }
}

// Função para fim de jogo
function gameOver() {
  isGameOver = true;
  clearInterval(obstacleInterval);
  scoreElement.innerHTML = "Game Over! Pontos: " + score;
  obstacle.style.animation = "none"; // Para o movimento do obstáculo
}

// Função para atualizar o score
function updateScore() {
  if (isGameOver) return;
  
  score++;
  scoreElement.innerHTML = "Pontos: " + score;
}

// Função para mover o obstáculo
function moveObstacle() {
  if (isGameOver) return;

  let obstacleRight = obstacle.getBoundingClientRect().right;

  if (obstacleRight <= 0) {
    obstacle.style.animation = "none"; // Para a animação
    obstacle.offsetHeight; // Força o reflow
    obstacle.style.animation = "moveObstacle 1.5s linear infinite"; // Reinicia a animação
    updateScore();
  }
}

// Adiciona o evento de tecla (espaco) para pular
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    jump();
  }
});

// Atualiza o movimento do obstáculo e verifica a colisão
let obstacleInterval = setInterval(() => {
  moveObstacle();
  checkCollision();
}, 20);
