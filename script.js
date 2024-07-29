const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 200;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

class Dino {
    constructor() {
        this.x = 50;
        this.y = CANVAS_HEIGHT - 60;
        this.width = 30;
        this.height = 30;
        this.velocityY = 0;
        this.gravity = 0.6;
        this.jumpPower = -10;
        this.isJumping = false;
    }

    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        if (this.isJumping) {
            this.velocityY += this.gravity;
            this.y += this.velocityY;
            if (this.y > CANVAS_HEIGHT - 60) {
                this.y = CANVAS_HEIGHT - 60;
                this.isJumping = false;
                this.velocityY = 0;
            }
        }
    }

    jump() {
        if (!this.isJumping) {
            this.velocityY = this.jumpPower;
            this.isJumping = true;
        }
    }
}

class Cactus {
    constructor() {
        this.x = CANVAS_WIDTH;
        this.y = CANVAS_HEIGHT - 60;
        this.width = 20;
        this.height = 30;
        this.speed = 3;
    }

    draw() {
        ctx.fillStyle = 'brown';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.x -= this.speed;
        if (this.x + this.width < 0) {
            this.x = CANVAS_WIDTH;
        }
    }
}

const dino = new Dino();
const cactus = new Cactus();

function gameLoop() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    dino.draw();
    dino.update();
    cactus.draw();
    cactus.update();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        dino.jump();
    }
});

gameLoop();