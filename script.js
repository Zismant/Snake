document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    const gameWidth = 300;
    const gameHight = 150;
    const el = 15;
    const score = document.querySelector('span');
    score.textContent = 0;
    
    
    
    const snake = [];

    const snakeHead = {
        x: el * Math.floor( Math.random() *  (gameWidth / el - 0) + 0 ),
        y: el * Math.floor( Math.random() *  (gameWidth / el - 0) + 0 ),
        moveTo: null,
    };

    const food = {};
    
    
    
    function drawFill() {
        ctx.fillStyle = 'aquamarine';
        ctx.fillRect(0, 0, gameWidth, gameHight);
    }
    
    function drawSnake() {
        
        ctx.fillStyle = 'red';
        ctx.fillRect(snakeHead.x, snakeHead.y, el, el);
    }

    function moveSnake() {
        switch(snakeHead.moveTo) {
            case 'left': snakeHead.x -= el;
            break;
            case'right': snakeHead.x += el;
            break;
            case 'up': snakeHead.y -= el; 
            break;
            case 'down': snakeHead.y += el;
            break;
        }

        document.addEventListener('keydown', (e) => {
            if ( (e.code == 'ArrowLeft' || e.code == 'KeyA') && snakeHead.moveTo !== 'right') snakeHead.moveTo = 'left';
            else if ( (e.code == 'ArrowRight' || e.code == 'KeyD') && snakeHead.moveTo !== 'left') snakeHead.moveTo = 'right';
            else if ( (e.code == 'ArrowUp' || e.code == 'KeyW') && snakeHead.moveTo !== 'down') snakeHead.moveTo = 'up';
            else if ( (e.code == 'ArrowDown' || e.code == 'KeyS') && snakeHead.moveTo !== 'up') snakeHead.moveTo = 'down';
        });   

        if (snakeHead.x < 0) snakeHead.x = gameWidth - el;
        if (snakeHead.x > gameWidth) snakeHead.x = 0;
        if (snakeHead.y < 0) snakeHead.y = gameHight - el;
        if (snakeHead.y > gameHight) snakeHead.y = 0;
        
    }

    function createNewFood() {
        
            food.x = el * Math.floor( Math.random() *  (gameWidth / el - 0) + 0 );
            food.y = el * Math.floor( Math.random() *  (gameHight / el - 0) + 0 );
        
    }

    function drawFood() {
        ctx.fillStyle = 'green';
        ctx.fillRect(food.x, food.y, el, el);
    }
    
    function snakeEatingFood() {
        if (snakeHead.x == food.x && snakeHead.y == food.y) {
            score.textContent++;
            createNewFood();
        }
    }

    function game() {
        drawFill();
        drawFood();
        drawSnake();
        moveSnake();
        snakeEatingFood();
        score.value
    }
    
    createNewFood();
    // window.requestAnimationFrame(game);
    setInterval(game, 300);

});

    


