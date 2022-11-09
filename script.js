document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    const up = document.querySelector('#up');
    const down = document.querySelector('#down');
    const left = document.querySelector('#left');
    const right = document.querySelector('#right');

    let step = 0;
    let maxStep = 20;

    const gameWidth = 1600;
    const gameHight = 800;

   

    const el = 100;
    const score = document.querySelector('span');
    score.textContent = 0;
    let direction = null;
   

    


// fill
    function drawFill() {
        ctx.fillStyle = 'aquamarine';
        ctx.fillRect(0, 0, gameWidth, gameHight);
    }




// food
    const food = {};
    const passenger = new Image();
    passenger.src = 'img/passenger.png';

    function createNewFood() {
        
        food.x = el * Math.floor(Math.random() * (gameWidth / el - 0) + 0);
        food.y = el * Math.floor(Math.random() * (gameHight / el - 0) + 0);
        
        snake.forEach(item => {
        if (item.x == food.x && item.y == food.y) {createNewFood();}
    });
        
    }
    function drawFood() {
        ctx.drawImage(passenger, food.x, food.y);
    
    }

//uber
    const uberFood = {};
    const uber = new Image();
    uber.src = 'img/uber.png';

    function createUberFood() {
        
        uberFood.x = el * Math.floor(Math.random() * (gameWidth / el - 0) + 0);
        uberFood.y = el * Math.floor(Math.random() * (gameHight / el - 0) + 0);
        
        snake.forEach(item => {
        if (item.x == uberFood.x && uberFood.y == food.y) {drawUberFood();}
    });
        
    }

    function drawUberFood() {
        ctx.drawImage(uber, uberFood.x, uberFood.y);
    
    }





// snake
    const snake = [{
        x: el * Math.floor(Math.random() * (gameWidth / el - 0) + 0),
        y: el * Math.floor(Math.random() * (gameWidth / el - 0) + 0),
    }];
    const headImage = new Image();
    headImage.src ='img/taxi.svg';
    // headImage.src ='img/car.png';
    const imageUp = new Image();
    imageUp.src ='img/taxiUp.png';
    
    function drawSnake() {
        snake.forEach((item, i) => {
            if (i == 0) {
                ctx.drawImage(headImage, item.x, item.y);
            } else {ctx.drawImage(imageUp, item.x, item.y);}
            
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
        
        if (snake[0].x == house.x && snake[0].y == house.y) {
            createNewHouse();
            
              snake.length = 1;
              score.textContent = 0;
              direction = null;
              alert(`GAME OVER, ти нащо людям в дім в'їхав???! Score: ${score.textContent}`);
        }
        snake.unshift({
            x: snakeX,
            y: snakeY,
        });
        
        
        

        if ( (snake[0].x == food.x && snake[0].y == food.y) || (snake[0].x == uberFood.x + el && snake[0].y == uberFood.y) ) {
            score.textContent++;
            createNewFood();
            createUberFood();

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

    //  house
    const houseSmallImage = new Image();
    houseSmallImage.src = 'img/houseSmall.png';
    const houseBigImage = new Image();
    houseBigImage.src = 'img/houseBig.png';
    const house = {};

    function createNewHouse() {
    
        house.x = el * Math.floor(Math.random() * (gameWidth / el - 0) + 0);
        house.y = el * Math.floor(Math.random() * (gameHight / el - 0) + 0);
        
    }

    function drawHouse() {
        ctx.drawImage(houseBigImage, house.x, house.y);
        

    }


// game Loop

    function gameLoop() {

        requestAnimationFrame(gameLoop);
        if (++step < maxStep) {
            return;
        }
        step = 0;

        ctx.clearRect(0, 0, gameWidth, gameHight);
        drawFill();
        drawFood();
        drawUberFood();
        drawHouse();
        drawSnake();
        moveSnake();
        
    }

    gameLoop();
    controlSnakeDirection();
    createNewHouse();
    createNewFood();
    createUberFood();

  
    

});