document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    const up = document.querySelector('#up');
    const down = document.querySelector('#down');
    const left = document.querySelector('#left');
    const right = document.querySelector('#right');

    let step = 0;
    let maxStep = 15;

    const gameWidth = 300;
    const gameHight = 150;
    const el = 15;
    const score = document.querySelector('span');
    score.textContent = 0;
    let direction = null;
    const snake = [{
        x: el * Math.floor(Math.random() * (gameWidth / el - 0) + 0),
        y: el * Math.floor(Math.random() * (gameWidth / el - 0) + 0),
    }];

    const food = {};



    function drawFill() {
        ctx.fillStyle = 'aquamarine';
        ctx.fillRect(0, 0, gameWidth, gameHight);
    }

    function drawSnake() {
        snake.forEach((item, i) => {
            ctx.fillStyle = (i == 0) ? '#600' : '#F00';
            ctx.fillRect(item.x, item.y, el, el);
        });

    }

    function moveSnake() {
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        


        if (direction == 'left') {
            snakeX -= el;
        } else if (direction == 'right') {
            snakeX += el;
        } else if (direction == 'up') {
            snakeY -= el;
        } else if (direction == 'down') {
            snakeY += el;
        }


        if (snake[0].x < 0) {
            snakeX = gameWidth - el;
        }
        if (snake[0].x > gameWidth - el) {
            snakeX = 0;
        }
        if (snake[0].y < 0) {
            snakeY = gameHight - el;
        }
        if (snake[0].y > gameHight - el) {
            snakeY = 0;
        }


        snake.unshift({
            x: snakeX,
            y: snakeY,
        });

        if (snake[0].x == food.x && snake[0].y == food.y) {
            score.textContent++;
            createNewFood();
        } else {
            snake.pop();
        }

        snake.forEach((item, i) => {
            if (i > 0) {
                if (item.x == snake[0].x && item.y == snake[0].y) {
                    alert(`GAME OVER     Score: ${score.textContent}`);
                    snake.length = 1;
                    score.textContent = 0;
                    direction = null;
                   
                }
            }
        });
    }

    function controlSnakeDirection() {

        document.addEventListener('keydown', (e) => {
            if ((e.code == 'ArrowLeft' || e.code == 'KeyA' ) && direction !== 'right') {
                direction = 'left';
            } else if ((e.code == 'ArrowRight' || e.code == 'KeyD') && direction !== 'left') {
                direction = 'right';
            } else if ((e.code == 'ArrowUp' || e.code == 'KeyW') && direction !== 'down') {
                direction = 'up';
            } else if ((e.code == 'ArrowDown' || e.code == 'KeyS') && direction !== 'up') {
                direction = 'down';
            }
        });

        up.addEventListener('click', (e) => {
            if (direction !== 'down') {direction = 'up';} 
        });
        down.addEventListener('click', (e) => {
            if (direction !== 'up') {direction = 'down';} 
        });
        left.addEventListener('click', (e) => {
            if (direction !== 'right') {direction = 'left';} 
        });
        right.addEventListener('click', (e) => {
            if (direction !== 'left') {direction = 'right';} 
        });

    }

    function createNewFood() {
        
        food.x = el * Math.floor(Math.random() * (gameWidth / el - 0) + 0);
        food.y = el * Math.floor(Math.random() * (gameHight / el - 0) + 0);
        
        snake.forEach(item => {
            if (item.x == food.x && item.y == food.y) {createNewFood();}
        });
    }

    function drawFood() {
        ctx.fillStyle = 'green';
        ctx.fillRect(food.x, food.y, el, el);
    }


    function gameLoop() {

        requestAnimationFrame(gameLoop);
        if (++step < maxStep) {
            return;
        }
        step = 0;

        ctx.clearRect(0, 0, gameWidth, gameHight);
        drawFill();
        drawFood();
        moveSnake();
        drawSnake();
        console.log(step);
    }

    gameLoop();
    createNewFood();
    controlSnakeDirection();

  
    

});