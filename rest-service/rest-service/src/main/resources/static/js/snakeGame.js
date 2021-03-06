
/***************** Snake Game *****************/

//TODO for snake:
// - gameover conditions:
//  -> self bump //done
//  -> remove boundaries //done -ish
// - gameplay:
//  -> don't skip a cell when pressing the same button as current direction //done
//  -> keep score //done
//  -> clear interval error //done - ish
//  -> inputs for board dimensions (make snake 5px/5px) //done

//TODO: create a matrix to hold board
//  -> create gutters | walls | generate board //done
//  -> Lee ( A -> B) + show number of moves //done -ish

let playArea;
var snake = [], matrix = [];

var snakeWidth = 10, snakeHeight = 10;
var playAreaWidth = 500, playAreaHeight = 500;

var food = {x: 0, y: 0};

var timer, direction = "right",
    indexTail;
var makeWalls, status = 'OK';

//configure the play area
function startConfig() {
    // creating the control panel
    let controlPanel = document.createElement('div');
    controlPanel.id = "controlPanel";
    controlPanel.className = "control_panel";

    // creating the score board
    let scoreBoard = document.createElement('span');
    let text = document.createTextNode("Score: ");

    scoreBoard.className = "score_board";
    scoreBoard.appendChild(text);

    let score = document.createElement('div');
    score.id = "score";
    score.className = "score";
    scoreBoard.appendChild(score);
    controlPanel.appendChild(scoreBoard);

    //creating the sliders for the dimensions of the play area
    let sliderPlayAreaWidth = document.createElement('input');
    sliderPlayAreaWidth.type = 'range';
    sliderPlayAreaWidth.className = 'slider';
    sliderPlayAreaWidth.id = 'sliderWidth';
    sliderPlayAreaWidth.min = 100;
    sliderPlayAreaWidth.max = 560;
    sliderPlayAreaWidth.step = 10;
    sliderPlayAreaWidth.value = 500;
    controlPanel.appendChild(sliderPlayAreaWidth);

    let valueWidth = document.createElement('div');
    valueWidth.className = 'value_slider';
    valueWidth.id = "value_width";
    valueWidth.innerHTML = sliderPlayAreaWidth.value;

    sliderPlayAreaWidth.oninput = function () {
        valueWidth.innerHTML = sliderPlayAreaWidth.value;
    }
    controlPanel.appendChild(valueWidth);

    let sliderPlayAreaHeight = document.createElement('input');
    sliderPlayAreaHeight.type = 'range';
    sliderPlayAreaHeight.className = 'slider';
    sliderPlayAreaHeight.id = 'sliderHeight';
    sliderPlayAreaHeight.min = 100;
    sliderPlayAreaHeight.max = 560;
    sliderPlayAreaHeight.step = 10;
    sliderPlayAreaHeight.value = 500;
    controlPanel.appendChild(sliderPlayAreaHeight);

    let valueHeight = document.createElement('div');
    valueHeight.className = 'value_slider';
    valueHeight.id = "value_height";
    valueHeight.innerHTML = sliderPlayAreaHeight.value;

    sliderPlayAreaHeight.oninput = function () {
        valueHeight.innerHTML = sliderPlayAreaHeight.value;
    }
    controlPanel.appendChild(valueHeight);

    //creating the submit button
    let submitConfig = document.createElement('button');
    submitConfig.className = "config_button";
    submitConfig.addEventListener("click", submitConfiguration);

    text = document.createTextNode("Submit");
    submitConfig.appendChild(text);

    controlPanel.appendChild(submitConfig);
    document.body.appendChild(controlPanel);
}

//submit the configuration of the play area
function submitConfiguration() {
    //getting the dimensions
    playAreaWidth = document.getElementById("sliderWidth").value;
    playAreaHeight = document.getElementById("sliderHeight").value;

    //creating the snake matrix
    for (var i = 1; i <= playAreaHeight / snakeHeight; i++) {
        matrix[i] = [];
        for (var j = 1; j <= playAreaWidth / snakeWidth; j++) {
            matrix[i][j] = 0;
        }
    }
    indexTail = 0;

    if (document.body.contains(document.getElementById('playArea'))) {
        quit();
    } else {
        //creating the play area
        playArea = document.createElement('div');
        playArea.id = "playArea";
        playArea.className = "snake_area";
        playArea.style.width = playAreaWidth + 'px';
        playArea.style.height = playAreaHeight + 'px';
        document.body.appendChild(playArea);

        //creating the tiles
        for (var i = 1; i <= playAreaHeight / snakeHeight; i++)
            for (var j = 1; j <= playAreaWidth / snakeWidth; j++) {
                let tile = document.createElement('div');
                tile.id = "tile" + i + "_" + j;
                tile.style.width = snakeWidth + 'px';
                tile.style.height = snakeHeight + 'px';

                if (i % 2 == 1) {
                    if (j % 2 == 0) tile.className = "tile_green";
                    else tile.className = "tile_dark_green";
                } else {
                    if (j % 2 == 0) tile.className = "tile_dark_green";
                    else tile.className = "tile_green";
                }

                tile.style.top = ((i - 1) * snakeHeight) + 'px';
                tile.style.left = ((j - 1) * snakeWidth) + 'px';

                //creating the walls
                makeWalls = function () {
                    if (tile.classList.contains('tile_wall')) {
                        //delete wall
                        tile.classList.remove('tile_wall');
                        matrix[tile.offsetTop / snakeHeight][tile.offsetLeft / snakeWidth] = 0;
                    } else {
                        //add wall
                        tile.classList.add('tile_wall');
                        matrix[tile.offsetTop / snakeHeight][tile.offsetLeft / snakeWidth] = 'W';
                    }
                }
                tile.addEventListener("click", makeWalls);
                playArea.appendChild(tile);
            }
        //creating the start button
        let startButton = document.createElement('button');
        let text = document.createTextNode('Start');
        startButton.appendChild(text);
        startButton.className = 'start_button';

        //starting the snake game on click
        startButton.addEventListener("click", startSnake);
        document.getElementById("controlPanel").appendChild(startButton);
    }
}

//start snake game
function startSnake() {
    /*  doesn't work
        for(var i = 1; i <= playAreaHeight / snakeHeight; i++)
            for(var j = 1; j <= playAreaWidth / snakeWidth; j++)
                document.getElementById("tile" + i + "_" + j).removeEventListener("click", makeWalls);
    */
    if (!playArea.contains(document.getElementById("food"))) {
        status = 'OK';
        //generating the coordinates of the snake
        var x1 = Math.floor(Math.random() * (playArea.offsetWidth - snakeWidth + 1));
        var y1 = Math.floor(Math.random() * (playArea.offsetHeight - snakeHeight + 1));
        var x2 = x1 - x1 % snakeWidth;
        var y2 = y1 - y1 % snakeHeight;

        snake.push([x2, y2]);
        //matrix[y2 / snakeWidth][x2 / snakeHeight] = 'S';

        createFood();
        drawSnake();

        //receiving the input keys
        document.body.addEventListener("keypress", getDirection);
        //Lee();
        timer = setInterval(function () {
            move(direction);
        }, 300);
    } else quit();
}

//create food
function createFood() {
    //delete food if exist
    if (playArea.contains(document.getElementById("food")))
        playArea.removeChild(document.getElementById("food"));

    //getting the score
    document.getElementById("score").innerHTML = snake.length;

    //creating a piece of food
    let foodNew = document.createElement('div');
    foodNew.className = "food";
    foodNew.id = "food";

    //generating the coordinates of the food
    var x1 = Math.floor(Math.random() * (playArea.offsetWidth - snakeWidth + 1));
    var y1 = Math.floor(Math.random() * (playArea.offsetHeight - snakeHeight + 1))
    food.x = x1 - x1 % snakeWidth;
    food.y = y1 - y1 % snakeHeight;

    //matrix[food.y / snakeHeight][food.x / snakeWidth] = 'F';

    foodNew.style.left = food.x;
    foodNew.style.top = food.y;

    playArea.appendChild(foodNew);
}

//get direction
function getDirection() {
    switch (event.keyCode) {
        case 119: { // w key
            if (direction != "up" && direction != "down") {
                direction = "up";
                move(direction);
            }
            break;
        }
        case 100: { // d key
            if (direction != "right" && direction != "left") {
                direction = "right";
                move(direction);
            }
            break;
        }
        case 115: { // s key
            if (direction != "down" && direction != "up") {
                direction = "down";
                move(direction);
            }
            break;
        }
        case 97: { // a key
            if (direction != "left" && direction != "right") {
                direction = "left";
                move(direction);
            }
            break;
        }
        default:
            break;
    }
}

// submit the direction
function move(finalDirection) {
    switch (finalDirection) {
        case "up": {
            executePath(1, -1);
            break;
        }
        case "right": {
            executePath(0, 1);
            break;
        }
        case "down": {
            executePath(1, 1);
            break;
        }
        case "left": {
            executePath(0, -1);
            break;
        }
        default:
            break;
    }
}

var coords = {
    x: 0,
    y: 0
};

// move snake
function executePath(coord, semn) {
    disappearTail();

    // saving the coordinates of the snake head
    coords.x = snake[snake.length - 1][0];
    coords.y = snake[snake.length - 1][1];

    moveTail();

    // changing the coordinates if it moves up and down
    if (coord == 1) {
        snake[0][coord] += semn * snakeHeight;
        snake[0][coord] %= playAreaHeight;
    }
    // changing the coordinates if it moves left and right
    else if (coord == 0) {
        snake[0][coord] += semn * snakeWidth;
        snake[0][coord] %= playAreaWidth;
    }
    // check if the snake has etan a piece of food
    if (snake[0][0] == food.x && snake[0][1] == food.y) {
        snake.push([coords.x, coords.y]);
        drawSnake();
        createFood();
    }
    // check if the snake self bumped or bumped in the walls
    switch (matrix[snake[0][1] / snakeHeight][snake[0][0] / snakeWidth]) {
        case 'W':
        case 'S': {
            status = 0;
            gameOver();
            break;
        }
        default:
            break;
    }
    drawSnake();
}

// update the coordinates of the snake
function moveTail() {
    for (var i = snake.length - 1; i >= 1; --i) {
        snake[i][0] = snake[i - 1][0] % playAreaWidth;
        snake[i][1] = snake[i - 1][1] % playAreaHeight;
    }
}

// display a snake part
function drawSnake() {
    if (status == 'OK') {
        // creating a snake part
        let snakeBody = document.createElement('div');
        snakeBody.className = "snake";
        snakeBody.id = "snake" + indexTail;
        snakeBody.style.left = snake[0][0] + 'px';
        snakeBody.style.top = snake[0][1] + 'px';
        playArea.appendChild(snakeBody); // show it

        //matrix[snake[0][1] / snakeWidth][snake[0][0] / snakeHeight] = 'S';
        indexTail++;
        indexTail %= snake.length;
    }
}

// hide a snake part
function disappearTail() {
    if (status == 'OK') {
        // getting the snake part which must be hided
        let snakePart = document.getElementById("snake" + indexTail);
        if(snakePart != null){
            matrix[snakePart.offsetHeight / snakeWidth][snakePart.offsetWidth / snakeHeight] = 0;
            playArea.removeChild(snakePart); // hide it
        }

    }
}

// clear the coordinates array
function deleteAll() {
    while (snake.length > 0)
        snake.pop()
    document.body.removeEventListener("keypress", getDirection);
}

// create wall
function createWall(div) {
    document.getElementById(div).classList.add('tile_wall');
}

// game over procedure
function gameOver() {
    clearInterval(timer);
    disappearTail();

    // creating the game over message
    let text = document.createTextNode("GAME OVER");
    let message = document.createElement('span');
    message.appendChild(text);
    message.className = 'game_text';
    playArea.appendChild(message);

    // creating the retry button
    let retryButton = document.createElement('button');
    text = document.createTextNode('Retry');
    retryButton.appendChild(text);
    retryButton.addEventListener("click", retry);
    retryButton.className = 'retry_button';
    playArea.appendChild(retryButton);

    // creating the quit button
    let quitButton = document.createElement('button');
    text = document.createTextNode('Quit');
    quitButton.appendChild(text);
    quitButton.addEventListener("click", quit);
    quitButton.className = 'quit_button';
    playArea.appendChild(quitButton);

    // showing the objects
    message.classList.add('appear');
    retryButton.classList.add('appear');
    quitButton.classList.add('appear');
    deleteAll();
}

// quit procedure
function quit() {
    document.body.removeChild(document.getElementById("playArea")); // removing the play area
    document.body.removeChild(document.getElementById("controlPanel")); // removing the control panel
    document.body.removeEventListener("keypress", getDirection); // removing the event listener
    clearInterval(timer);
    deleteAll();
}

// retry procedure
function retry() {
    quit();
    startConfig();
}

//create a Queue class
class Queue {
    // array is used to implement a Queue
    constructor() {
        this.items = [];
    }

    qpush(element) {
        // adding element to the queue
        this.items.push(element);
    }

    pop() {
        // removing element from the queue
        // returns underflow when called
        // on empty queue
        if(this.isEmpty())
            return "Underflow";
        return this.items.shift();
    }

    front() {
        // returns the Front element of
        // the queue without removing it.
        if(this.isEmpty())
            return "No elements in Queue";
        return this.items[0];
    }

    isEmpty() {
        // return true if the queue is empty.
        return this.items.length == 0;
    }
}

var queue = new Queue();

var dx = [0, 0, 1, -1];
var dy = [-1, 1, 0, 0];

function Lee() {
    queue.qpush([5, 5]);
    while(!queue.isEmpty()){
        var x1 = queue.front()[0];
        var y1 = queue.front()[1];
        queue.pop();

        if(x1 == food.x && y1 == food.y){
            console.log(matrix[y1][x1]);
            return 1;
        }

        for(var i = 0; i < 4; ++i){
            var x2 = x1 + dx[i];
            var y2 = y1 + dy[i];

            if(x2 > 0 && x2 <= playAreaWidth / snakeWidth  && y2 > 0 && y2 <= playAreaHeight / snakeHeight)
                if(matrix[y2][x2] == 0 || matrix[y2][x2] == 'F' || matrix[y2][x2] > matrix[y1][x1] + 1){
                    matrix[y2][x2] = matrix[y1][x1] + 1;
                    queue.qpush([x2, y2]);
                }
        }
    }
}