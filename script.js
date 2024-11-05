// Configurações do jogo
const dino = document.getElementById('dino');
const ground = document.getElementById('ground');
const obstacle = document.getElementById('obstacle');
const gameArea = document.getElementById('gameArea');

// Função para o pulo
let isJumping = false;
function jump() {
    if (isJumping) return;

    isJumping = true;
    dino.style.transition = 'transform 0.3s ease-out';
    dino.style.transform = 'translateY(-100px)';  // Pulo

    setTimeout(() => {
        dino.style.transition = 'transform 0.3s ease-in';
        dino.style.transform = 'translateY(0px)';  // Descer
        isJumping = false;
    }, 300);
}

// Controle do pulo com a tecla de espaço
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'ArrowUp') {
        jump();
    }
});

// Detectar colisão com o obstáculo
function detectCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        dinoRect.bottom >= obstacleRect.top &&
        dinoRect.left < obstacleRect.right &&
        dinoRect.right > obstacleRect.left
    ) {
        alert('Você perdeu!');
        location.reload();  // Reinicia o jogo
    }
}

// Animar obstáculos
function moveObstacle() {
    let rightPosition = parseInt(window.getComputedStyle(obstacle).getPropertyValue('right'));
    
    if (rightPosition >= gameArea.offsetWidth) {
        obstacle.style.animation = 'none';  // Para o movimento
        obstacle.style.right = '-50px';     // Reseta a posição
        obstacle.style.animation = 'moveObstacle 2s infinite linear';  // Reinicia a animação
    }

    detectCollision();
}

// Atualizar o movimento
function update() {
    moveObstacle();
    requestAnimationFrame(update);
}

// Começar o jogo
update();
