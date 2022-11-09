document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    const up = document.querySelector('#up');
    const down = document.querySelector('#down');
    const left = document.querySelector('#left');
    const right = document.querySelector('#right');

    let step = 0;
    let maxStep = 30;

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




    // passenger
    const passenger = {};
    const passengerImage = new Image();
    passengerImage.src = 'img/passenger.png';

    function createPassenger() {

        passenger.x = el * Math.floor(Math.random() * (gameWidth / el - 0) + 0);
        passenger.y = el * Math.floor(Math.random() * (gameHight / el - 0) + 0);

        snake.forEach(item => {
            if (item.x == passenger.x && item.y == passenger.y) {
                createPassenger();
                return;
            }
        });

    }

    function drawPassenger() {
        ctx.drawImage(passengerImage, passenger.x, passenger.y);

    }

    //uber
    const uber = {};
    const uberImage = new Image();
    uberImage.src = 'img/uber.png';

    function createUber() {

        uber.x = el * Math.floor(Math.random() * (gameWidth / el - 0) + 0);
        uber.y = el * Math.floor(Math.random() * (gameHight / el - 0) + 0);

        snake.forEach(item => {
            if (item.x == uber.x  &&  item.y == uber.y ) {
                createUber();
                return;
            }
        });

    }

    function drawUber() {
        ctx.drawImage(uberImage, uber.x, uber.y);

    }

    //  house
    const houseSmallImage = new Image();
    houseSmallImage.src = 'img/houseSmall.png';
    const houseBigImage = new Image();
    houseBigImage.src = 'img/houseBig.png';
    const house = [];

    function createHouse() {

        let x = () => el * Math.floor(Math.random() * (gameWidth / el - 0) + 0);
        let y = () => el * Math.floor(Math.random() * (gameHight / el - 0) + 0);

        for (let i = 0; i < 4; i++) {
            house.push({
                x: x(),
                y: y(),
            });
        }

    }

    function drawHouse() {
        house.forEach((item, i) => {
            if (i % 2 != 0) {
                ctx.drawImage(houseBigImage, item.x, item.y);
            } else {
                ctx.drawImage(houseSmallImage, item.x, item.y);
            }
        });

    }


    // snake
    const snake = [{}];

    function createSnake() {
        snake[0].x = el * Math.floor(Math.random() * (gameWidth / el - 0) + 0);
        snake[0].y = el * Math.floor(Math.random() * (gameWidth / el - 0) + 0);

    }

    const headImage = new Image();
    headImage.src = 'img/taxi.svg';
    // headImage.src ='img/car.png';
    const imageUp = new Image();
    imageUp.src = 'img/taxiUp.png';

    function drawSnake() {
        snake.forEach((item, i) => {
            if (i == 0) {
                ctx.drawImage(headImage, item.x, item.y);
            } else {
                ctx.drawImage(imageUp, item.x, item.y);
            }

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

        if (snake.length > 1) {
            house.forEach(item => {
                if (snake[0].x == item.x && snake[0].y == item.y) {
                    house.length = 0;
                    createHouse();

                    snake.length = 1;
                    direction = null;
                    alert(`GAME OVER, ти нащо людям в дім в'їхав???! Score: ${score.textContent}`);
                    score.textContent = 0;
                }
            });
        }

        snake.unshift({
            x: snakeX,
            y: snakeY,
        });


        if ((snake[0].x == passenger.x && snake[0].y == passenger.y) ||
            (snake[0].x == uber.x + el && snake[0].y == uber.y)) {
            score.textContent++;
            createPassenger();
            createUber();

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

        up.addEventListener('click', (e) => {
            if (direction !== 'down') {
                direction = 'up';
            }
        });
        down.addEventListener('click', (e) => {
            if (direction !== 'up') {
                direction = 'down';
            }
        });
        left.addEventListener('click', (e) => {
            if (direction !== 'right') {
                direction = 'left';
            }
        });
        right.addEventListener('click', (e) => {
            if (direction !== 'left') {
                direction = 'right';
            }
        });

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
        drawPassenger();
        drawUber();
        drawHouse();
        drawSnake();
        moveSnake();

    }

    createHouse();
    createSnake();
    controlSnakeDirection();
    createPassenger();
    createUber();
    gameLoop();




});