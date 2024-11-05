const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
let isJumping = false;
let cactusPosition = window.innerWidth;
let isGameOver = false;

// Função para detectar a tecla de pulo
document.addEventListener("keydown", function(event) {
    if (event.key === " " && !isJumping) {
        jump();
    }
});

// Função para o pulo do dinossauro
function jump() {
    let position = 0;
    isJumping = true;

    // Movimento de subida
    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            // Movimento de descida
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 5;
                    dino.style.bottom = position + "px";
                }
            }, 20);
        } else {
            position += 5;
            dino.style.bottom = position + "px";
        }
    }, 20);
}

// Função para mover o cacto
function moveCactus() {
    if (isGameOver) return;

    cactusPosition -= 10;
    cactus.style.left = cactusPosition + "px";

    // Se o cacto sair da tela, ele reaparece do lado direito
    if (cactusPosition < -30) {
        cactusPosition = window.innerWidth;
    }

    // Verifica colisão
    checkCollision();

    requestAnimationFrame(moveCactus);
}

// Função para verificar colisão
function checkCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    if (
        dinoRect.right >= cactusRect.left &&
        dinoRect.left <= cactusRect.right &&
        dinoRect.bottom >= cactusRect.top
    ) {
        alert("Game Over!");
        isGameOver = true;
    }
}

// Inicia o movimento do cacto
moveCactus();
