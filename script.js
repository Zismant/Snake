document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
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
            ctx.fillStyle = (i == 0) ? 'red' : 'blue';
            ctx.fillRect(item.x, item.y, el, el);
        });
        
    }
    
    function moveSnake() {
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
        
        document.addEventListener('keydown', (e) => {
            if ((e.code == 'ArrowLeft' || e.code == 'KeyA') && direction !== 'right') {
                direction = 'left';
            } else if ((e.code == 'ArrowRight' || e.code == 'KeyD') && direction !== 'left') {
                direction = 'right';
            } else if ((e.code == 'ArrowUp' || e.code == 'KeyW') && direction !== 'down') {
                direction = 'up';
            } else if ((e.code == 'ArrowDown' || e.code == 'KeyS') && direction !== 'up') {
                direction = 'down';
            }   
        });

        if (direction == 'left') { snakeX -= el;} 
        else if (direction == 'right') { snakeX += el;}
        else if (direction == 'up') { snakeY -= el;} 
        else if (direction == 'down') { snakeY += el;}
        
        
        if (snake[0].x < 0) { snakeX = gameWidth - el;}
        if (snake[0].x > gameWidth - el) { snakeX = 0;}
        if (snake[0].y < 0) {snakeY = gameHight - el;}
        if (snake[0].y > gameHight - el) {snakeY = 0;}
        
        
        snake.unshift({
            x: snakeX,
            y: snakeY,
        });

        if (snake[0].x == food.x && snake[0].y == food.y) {
            score.textContent++;
            createNewFood();  
        }
        else {snake.pop();}
    }

    function createNewFood() {

        food.x = el * Math.floor(Math.random() * (gameWidth / el - 0) + 0);
        food.y = el * Math.floor(Math.random() * (gameHight / el - 0) + 0);

    }

    function drawFood() {
        ctx.fillStyle = 'green';
        ctx.fillRect(food.x, food.y, el, el);
    }

    
    function game() {
        drawFill();
        drawFood();
        moveSnake();
        drawSnake();
    }

    createNewFood();
    // window.requestAnimationFrame(game);
    setInterval(game, 350);

});