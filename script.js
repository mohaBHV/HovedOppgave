const player = document.getElementById('player');
const gameContainer = document.getElementById('gameContainer');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');

let playerLeft = 175;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let isGameOver = false;

function movePlayer(event) {
    if (!isGameOver) {
        if (event.key === 'ArrowLeft' && playerLeft > 0) {
            playerLeft -= 25;
        } else if (event.key === 'ArrowRight' && playerLeft < 350) {
            playerLeft += 25;
        }

        player.style.left = playerLeft + 'px';
    }
}

document.addEventListener('keydown', movePlayer);

function spawnEnemy() {
    if (!isGameOver) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.style.left = Math.random() * 350 + 'px';
        gameContainer.appendChild(enemy);

        let enemyBottom = 400;
        let enemyLeft = parseFloat(enemy.style.left);

        function moveEnemy() {
            if (enemyBottom > 0 && enemyBottom < 550) {
                enemyBottom -= 1;
                enemy.style.bottom = enemyBottom + 'px';
            } else {
                clearInterval(enemyTimerId);
                gameContainer.removeChild(enemy);
                if (!isGameOver) {
                    score++;
                    scoreDisplay.textContent = 'Score: ' + score;
                }
            }

            if (
                (enemyBottom > 0 && enemyBottom < 50) &&
                (playerLeft >= enemyLeft && playerLeft <= enemyLeft + 50)
            ) {
                gameOver();
            }
        }

        let enemyTimerId = setInterval(moveEnemy, 20);
    }
}

let gameTimerId = setInterval(spawnEnemy, 1000);

function gameOver() {
    isGameOver = true;
    clearInterval(gameTimerId);

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreDisplay.textContent = 'High Score: ' + highScore;
    }

    alert('Game Over! Your Score: ' + score);

    player.style.left = '175px';
    score = 0;
    scoreDisplay.textContent = 'Score: ' + score;
    isGameOver = false;
    gameTimerId = setInterval(spawnEnemy, 1000);
}





