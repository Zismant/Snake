document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    const gameWidth = 300;
    const gameHight = 150;
    const el = 15;
    
    const snake = [];

    const snakeHead = {
        x: 0,
        y: 0,
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
        
            food.x = Math.floor(Math.random() * (gameWidth -el - el ) + el);
            food.y = Math.floor(Math.random() * (gameHight -el - el ) + el);
        
    }

    function drawFood() {
        ctx.fillStyle = 'green';
        ctx.fillRect(food.x, food.y, el, el);
        console.log(food);
    }
    


    
    
    function game() {
        drawFill();
        drawFood();
        drawSnake();
        moveSnake();
    }
    
    createNewFood();
    // window.requestAnimationFrame(game);
    setInterval(game, 300);

});

    


