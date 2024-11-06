const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreDisplay = document.getElementById("score");
let score = 0;
let isJumping = false;

// Função de pulo do dinossauro
function jump() {
    if (isJumping) return;
    isJumping = true;
    let upInterval = setInterval(() => {
        if (parseInt(getComputedStyle(dino).bottom) >= 150) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (parseInt(getComputedStyle(dino).bottom) <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    dino.style.bottom = parseInt(getComputedStyle(dino).bottom) - 5 + "px";
                }
            }, 20);
        } else {
            dino.style.bottom = parseInt(getComputedStyle(dino).bottom) + 5 + "px";
        }
    }, 20);
}

// Movimentação do cacto
function moveCactus() {
    let cactusPosition = 600;
    cactus.style.right = "-30px";
    cactus.style.display = "block";

    let cactusInterval = setInterval(() => {
        if (cactusPosition < -30) {
            cactusPosition = 600;
            score += 1;
            scoreDisplay.innerText = "Score: " + score;
        } else if (
            cactusPosition < 50 &&
            cactusPosition > 0 &&
            parseInt(getComputedStyle(dino).bottom) < 50
        ) {
            clearInterval(cactusInterval);
            alert("Game Over! Pontuação: " + score);
            score = 0;
            scoreDisplay.innerText = "Score: " + score;
            cactusPosition = 600;
            moveCactus();
        } else {
            cactusPosition -= 5;
            cactus.style.right = cactusPosition + "px";
        }
    }, 20);
}

document.addEventListener("keydown", (e) => {
    if (e.key === " ") jump();
});

moveCactus();
