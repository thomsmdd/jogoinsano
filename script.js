const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
let isJumping = false;

document.addEventListener("keydown", function(event) {
    if (event.key === " " && !isJumping) {
        jump();
    }
});

function jump() {
    let position = 0;
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

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

function checkCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    if (
        dinoRect.right >= cactusRect.left &&
        dinoRect.left <= cactusRect.right &&
        dinoRect.bottom >= cactusRect.top
    ) {
        alert("Game Over!");
        location.reload();
    }
}

setInterval(checkCollision, 10);
