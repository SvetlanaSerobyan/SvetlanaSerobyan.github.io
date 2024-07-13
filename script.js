const board = document.getElementById("game-board");
const instructionText = document.getElementById("instruction-text");
const logo = document.getElementById("logo")
const score = document.getElementById("score")
const highScore = document.getElementById("highscore")

let gridSize = 25;
let highscore = 0
let snake = [{ x: 10, y: 10 }];
let snake2 = [{ x: 11, y: 11 }];
let wall = [
    // { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
    { x: 4, y: 4 },
    { x: 5, y: 5 },
    { x: 6, y: 6 },
    { x: 7, y: 7 },
    { x: 8, y: 8 },
    // { x: 9 , y: 9 },
    // { x: 10, y: 10},
    { x: 11, y: 11 },
    { x: 12, y: 12 },
    { x: 13, y: 13 },
    { x: 14, y: 14 },
    { x: 15, y: 15 },
    { x: 16, y: 16 },
    { x: 17, y: 17 },
    { x: 18, y: 18 },
    { x: 19, y: 19 },
    { x: 20, y: 20 },
    { x: 21, y: 21 },
    // { x: 22, y: 22},
    // { x: 23, y: 23},
    { x: 24, y: 24 },
    { x: 25, y: 25 },
    // { x: 26, y: 26 },
    // { x: 27, y: 27 },
    // { x: 28, y: 28 },
    // { x: 29, y: 29 },
    // { x: 30, y: 30 },
    // { x: 31, y: 31 },
];
let food = generateFood();
let hyperFood = generateHyperFood();
let direction = "right";
let direction1 = "left";
let isGameStarted = false;
let gameSpeedDelay = 200;
let gameIntervalId;

function draw() {
    board.innerHTML = ""
    drawSnake();
    drawFood();
    drawSnake2();
    drawHyperFood();
    updateScore();
}

function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = creatElement("div", "snake");
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);

    });
}

function creatElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;

}

function drawFood() {
    let foodElement = creatElement("div", "food");
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

function generateFood() {
    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;

    return { x, y }

}

function move() {
    let head = { ...snake[0] };
    let head1 = { ...snake[1] };
    let head2 = { ...snake[2] };
    let head3 = { ...snake[3] };
    let head4 = { ...snake[4] };
    let wallCell = { ...wall[0] };

    switch (direction) {
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        clearInterval(gameIntervalId);
        gameIntervalId = setInterval(() => {
            move();
            move1();
            checkCollision();
            draw();
        }, gameSpeedDelay);

    }
    else if (wallCell.x === head.x && wallCell.y === head.y) {
        resetGame();
    }
    else if (head.x === hyperFood.x && head.y === hyperFood.y) {
        snake.push(head1,head2,head3,head4)
        hyperFood = generateHyperFood();
        clearInterval(gameIntervalId);
        gameIntervalId = setInterval(() => {
            move();
            move1();
            checkCollision();
            draw();
        }, gameSpeedDelay);
    }
    else {
        snake.pop();
    }
}

function startGame() {
    isGameStarted = true;
    instructionText.style.display = "none";
    logo.style.display = "none";

    gameIntervalId = setInterval(() => {
        move();
        move1();
        checkCollision();
        draw();
    }, gameSpeedDelay);
}

function handleKeyPress(e) {

    if ((!isGameStarted && e.code === "Space") ||
        (!isGameStarted && e.key === " ")) {
        startGame();
    }
    else {
        switch (e.key) {
            case "ArrowUp":
                direction = "up"
                break;
            case "ArrowDown":
                direction = "down";
                break;
            case "ArrowLeft":
                direction = "left";
                break;
            case "ArrowRight":
                direction = "right";
                break;
        }
    }
}

function checkCollision() {
    let head = { ...snake[0] };
    let head1 = {...snake2[0]};

    if (head.x < 1 || head.x > gridSize ||
        head.y < 1 || head.y > gridSize) {
        resetGame()
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame()
        }
    }

    if (snake.length >= 3) {
        for (let i = 1; i < wall.length; i++) {
            if (wall[i].x === head.x && wall[i].y === head.y) {
                resetGame()
            }
        }
    }
    if (head1.x < 1 || head1.x > gridSize ||
        head1.y < 1 || head1.y > gridSize) {
        resetGame()
    }

    for (let i = 1; i < snake2.length; i++) {
        if (head1.x === snake2[i].x && head1.y === snake2[i].y) {
            resetGame()
        }
    }

    if (snake2.length >= 3) {
        for (let i = 1; i < wall.length; i++) {
            if (wall[i].x === head1.x && wall[i].y === head1.y) {
                resetGame()
            }
        }
    }

    if (head1.x === head.x && head1.y === head.y) {
        resetGame()
    }
}

function resetGame() {
    stopGame()
    updateHighScore()
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    direction = "right";
    snake2 = [{x:11,y:11}];
    direction1 = "left";
    updateScore()
}

function stopGame() {
    clearInterval(gameIntervalId);
    isGameStarted = false;
    logo.style.display = "block";
    instructionText.style.display = "block"
}

function updateScore() {
    let currentScore = (snake.length - 1) + (snake2.length - 1)
    score.textContent = currentScore.toString().padStart(3, "0")
    if (currentScore >= 2) {
        drawDiagonal()
    }
    if(currentScore >= 5){
        drawHyperFood()
    }
}

function updateHighScore() {
    let currentScore = snake.length - 1 && snake2.length-1;
    if (currentScore > highscore) {
        highscore = currentScore
    }
    highScore.textContent = highscore.toString().padStart(3, "0")
    highScore.style.display = "block"
}

function drawDiagonal() {
    wall.forEach((segment) => {
        const wallElement = creatElement("div", "wall");
        setPosition(wallElement, segment);
        board.appendChild(wallElement);

    });

}

function drawHyperFood() {
    let currentScore = snake.length - 1;
    if (currentScore >= 5) {
        let hyperFoodElement = creatElement("div", "hyper-food");
        setPosition(hyperFoodElement, hyperFood);
        board.appendChild(hyperFoodElement);

    }
        
    }


function generateHyperFood() {
    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;

    return { x, y }

}

function drawSnake2() {
    snake2.forEach((segment) => {
        const snake1Element = creatElement("div", "snake-0-2");
        setPosition(snake1Element, segment);
        board.appendChild(snake1Element);
    });
}

function move1() {
    let head = { ...snake2[0] };
    let wallCell = { ...wall[0] };

    switch (direction1) {
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;
    }
    snake2.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        clearInterval(gameIntervalId);
        gameIntervalId = setInterval(() => {
            move();
            move1();
            checkCollision();
            draw()
        }, gameSpeedDelay);

    } 
    else if (wallCell.x === head.x && wallCell.y === head.y) {
        resetGame()
    }
    else {
        snake2.pop();
    }
}
function handleKeyPress1(e) {
    if ((!isGameStarted && e.code === "Space") ||
    (!isGameStarted && e.key === " ")) {
    startGame();
}else{
    switch (e.code) {
        case "KeyW":
            direction1 = "up"
            break;
        case "KeyS":
            direction1 = "down";
            break;
        case "KeyA":
            direction1 = "left";
            break;
        case "KeyD":
            direction1 = "right";
            break;
    }
}
}


document.addEventListener("keydown", handleKeyPress) 
document.addEventListener("keydown", handleKeyPress1) 
