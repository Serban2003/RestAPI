let allUsers;

window.onload = function() {
    getAll();
}

function submitGreetingKey() {
    if (event.which == 13 || event.keyCode == 13) //call submitGreeting if "Enter" was pressed
        submitGreeting();
}

function submitGreeting() {

    var name = document.getElementById("namez").value;
    if (name != ""){
        var xhr = new XMLHttpRequest();
            xhr.open('POST', '/user/');
            xhr.setRequestHeader("Content-Type", "application/json");
        // Track the state changes of the request.
        xhr.onreadystatechange = function () {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.

            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {

                    let jsonResult = JSON.parse(xhr.responseText);
                    document.getElementById("namez").value=''; //refreshing the input form

                    getAll();
                    console.log(xhr.responseText); // 'This is the output.'
                } else {
                    console.log('Error: ' + xhr.status); // An error occurred during the request.
                }
            }
        };
        xhr.send("{\"name\": \""+ name + "\"}");
    }
}
//creating a new table row
function createTable(myObj){
    let newRow = document.createElement('tr'); //creating a new row for user table
    newRow.id = "user_row" + myObj.id;

    let newID = document.createElement('td'); //creating a new table cell for user id
    newID.data = "user_id" + myObj.id;
    newID.innerHTML = myObj.id;
    newRow.appendChild(newID);

    let newData = document.createElement('td'); //creating a new table cell for username
    newData.id = "user_data" + myObj.id;
    newRow.appendChild(newData);

    addNewEvent(newRow, myObj.id, "dblclick", editUser); //adding an ondblclick event for the table cell

    let newName = document.createElement('span'); //creating a container for username
    newName.id = "user_name" + myObj.id;
    newName.innerHTML = myObj.name; //displaying the username
    newData.appendChild(newName);

    //creating a new table cell for buttons
    let newAction = document.createElement('td');

    //creating an edit button
    let newEdit = document.createElement('button');
    var textValue = document.createTextNode("Edit");
    newEdit.appendChild(textValue);
    newEdit.id = "edit_user" + myObj.id;

    addNewEvent(newEdit, myObj.id, "click", editUser); //adding an onclick event for the edit button

    //creating a delete button
    let newDelete = document.createElement('button');
    var textValue = document.createTextNode("Delete");
    newDelete.appendChild(textValue);
    newDelete.id = "delete_user" + myObj.id;

    addNewEvent(newDelete, myObj.id, "click", deleteUser); //adding an onclick event for the delete button

    newAction.appendChild(newEdit);
    newAction.appendChild(newDelete);
    newRow.appendChild(newAction);

    //adding the row at the table
    let cont = document.getElementById("user_list");
    cont.appendChild(newRow);
}

//edit username on button click or double click
function editUser(id) {

    var index = this.id.length - 1; //length of the username
         while (this.id[index] >= '0' && this.id[index] <= '9') //finding the first digit of the id
                index--;

    var newId = this.id.substr(index + 1, this.id.length - 1); //creating the new id

    //saving temporally the username in a new input form and deleting the current span container
    var div = document.getElementById("user_name" + newId);
    var row = document.getElementById("user_data" + newId);

    let editInput = document.createElement('input');
    editInput.type = "text";
    editInput.maxLength = 12;
    editInput.id = "input" + newId;
    editInput.value = div.textContent;

    //adding an onkeypress event for the input form
    addNewEvent(editInput, newId, "keypress", press)

    console.info("Editing user: " + document.getElementById("namez").value + " id: " + newId);

    row.appendChild(editInput);
    row.removeChild(div);
}

//updating the new username and putting it back in the table
function press(id) {

    if (event.which == 13 || event.keyCode == 13) { //if "Enter" was pressed

        var index = this.id.length - 1; //length of the username
        while (this.id[index] >= '0' && this.id[index] <= '9') //finding the first digit of the id
                    index--;

        var newId = this.id.substr(index + 1, this.id.length - 1); //creating the new id

        var editInput = document.getElementById("input" + newId);
        if(editInput.value != ""){
            var x = new XMLHttpRequest();
            x.open('POST', '/user/update/');
            x.setRequestHeader("Content-Type", "application/json");

            //creating a new span container for the username
            let newSpan = document.createElement('span');
            newSpan.innerHTML = editInput.value;
            newSpan.id = "user_name" + newId;

            var row = document.getElementById("user_data" + newId);
            row.appendChild(newSpan);
            row.removeChild(editInput);

             var data = JSON.stringify({ "name":editInput.value, "id": newId });
             x.send(data);
         }
    }
}

//deleting the username on button click
function deleteUser(id) {

     var index = this.id.length - 1; //length of the username
     while (this.id[index] >= '0' && this.id[index] <= '9') //finding the first digit of the id
            index--;

     var newId = this.id.substr(index + 1, this.id.length - 1); //creating the new id

    var x = new XMLHttpRequest();
    x.open('POST', '/user/delete/');
    x.setRequestHeader("Content-Type", "application/json");

    console.info("Deleting user: " + document.getElementById("namez").value + " id: " + newId);

    //deleting the row containing the username from the table
    var row = document.getElementById("user_row" + newId);
    row.remove();

    x.send("{\"id\": \""+ newId + "\"}");
}

// adding a new event listener for a variable
function addNewEvent(variable, objId, action, newFunction){
    if (variable.addEventListener) { // all browsers except IE before version 9
            variable.addEventListener(action, newFunction, false);
        } else {
            if (variable.attachEvent) { // IE before version 9
                variable.attachEvent(action, newFunction(objId));
            }
        }
}

function getAll(){
    var x = new XMLHttpRequest();
    x.open('GET', '/user/allusers/');

    x.onreadystatechange = function () {
        var DONE = 4;
        var OK = 200;

        if (x.readyState === DONE) {
            if (x.status === OK){
                var response = x.responseText;
                console.log(response);
                const obj = JSON.parse(response);

//                for (i = 0; i <tr; i++)
//                    document.getElementById("user_list").deleteRow(i);
//                var tr = document.getElementById("user_list").rows.length;
//                 console.log(tr);
                $( "#user_list" ).empty();
                for (i = 0; i < obj.values.length; i++) {
                    console.log(obj.values[i].nameValuePairs);
                    createTable(obj.values[i].nameValuePairs);
                }

            }
        } else console.log('Error: ' + x.status);
    }
    x.send();
}

let playArea;
var snake = [];

var snakeWidth = 20;
var snakeHeight = 20;

var food = { x : 0, y: 0 };

function startSnake(){

    var snakeLength = 1;

    if (document.body.contains(document.getElementById('playArea'))) {
        document.body.removeChild(document.getElementById("playArea"));  // removing the play area
        deleteAll();
        document.body.removeEventListener("keypress", move);
    }
    else {

        playArea = document.createElement('div');
        playArea.id = "playArea";
        playArea.className = "snake_area";
        document.body.appendChild(playArea);

        var x1 = Math.floor(Math.random() * (playArea.offsetHeight - snakeHeight + 1));
        var y1 = Math.floor(Math.random() * (playArea.offsetWidth - snakeWidth + 1));
        snake.push([ x1 - x1 % 20, y1 - y1 % 20]);
        createAll();
        createFood();
        document.body.addEventListener("keypress", getDirection);
    }
}

function createFood(){

    if(playArea.contains(document.getElementById("food"))){
        playArea.removeChild(document.getElementById("food"));
    }

    let foodNew = document.createElement('div');
    foodNew.className = "food";
    foodNew.id = "food";

    var x1 = Math.floor(Math.random() * (playArea.offsetHeight - snakeHeight + 1));
    var y1 = Math.floor(Math.random() * (playArea.offsetWidth - snakeWidth + 1))
    food.x = x1 - x1 % 20;
    food.y = y1 - y1 % 20;

    foodNew.style.left = food.x;
    foodNew.style.top = food.y;

    playArea.appendChild(foodNew);
}

function getDirection(){
    switch (event.keyCode) {
        case 119:{ // w key
            move("up");
            break;
        }
        case 100:{ // d key
            move("right");
            break;
        }
        case 115:{ // s key
            move("down");
            break;
        }
        case 97:{ // a key
            move("left");
            break;
        }
        default:
            break;
    }
}

function createAll(){
    for(var i=0; i<snake.length; ++i){
        let snakeBody = document.createElement('div');
        snakeBody.className = "snake";
        snakeBody.id = "snake" + i;
        snakeBody.style.left = snake[i][0] + 'px';
        snakeBody.style.top = snake[i][1] + 'px';
        playArea.appendChild(snakeBody);
    }
}

function disappearAll(){
    for(var i=0; i<snake.length; ++i)
        playArea.removeChild(document.getElementById("snake"+i));
}

function deleteAll(){
    while(snake.length>0)
        snake.pop()
    document.body.removeEventListener("keypress", getDirection);
}
var coords = {x : 0, y : 0};

function move(finalDirection){

    switch(finalDirection){
        case "up":{
            coords.x = snake[snake.length-1][0];
            coords.y = snake[snake.length-1][1];

            moveDiv();
            snake[0][1]-=snakeHeight;

            if(snake[0][0] == food.x && snake[0][1] == food.y){
                snake.push([coords.x, coords.y]);
                createFood();
            }
            createAll();
            disappearAll();

            if(snake[0][1] < 0)
                gameOver();
            break;
        }
        case "right":{
            coords.x = snake[snake.length-1][0];
            coords.y = snake[snake.length-1][1];

            moveDiv();
            snake[0][0]+=snakeWidth;

            if(snake[0][0] == food.x && snake[0][1] == food.y){
                snake.push([coords.x, coords.y]);
                createFood();
            }
            createAll();
            disappearAll();

            if(snake[0][0] >= playArea.offsetWidth - snakeWidth)
                gameOver();
            break;
        }
        case "down":{
            coords.x = snake[snake.length-1][0];
            coords.y = snake[snake.length-1][1];

            moveDiv();
            snake[0][1]+=snakeHeight;

            if(snake[0][0] == food.x && snake[0][1] == food.y){
                snake.push([coords.x, coords.y]);
                createFood();
            }
            createAll();
            disappearAll();

            if(snake[0][1] >= playArea.offsetHeight - snakeHeight)
                gameOver();
            break;
        }
        case "left":{
            coords.x = snake[snake.length-1][0];
            coords.y = snake[snake.length-1][1];

            moveDiv();
            snake[0][0]-=snakeWidth;

            if(snake[0][0] == food.x && snake[0][1] == food.y){
                snake.push([coords.x, coords.y]);
                createFood();
            }
            createAll();
            disappearAll();

            if(snake[0][0] < 0)
                gameOver();
            break;
        }
        default:
            break;
    }
}

function gameOver(){
    disappearAll();
    let text = document.createTextNode("GAME OVER");
    let message = document.createElement('span');
    message.appendChild(text);
    message.className = 'game_text';
    playArea.appendChild(message);

    let retryButton = document.createElement('button');
    text = document.createTextNode('Retry');
    retryButton.appendChild(text);
    retryButton.addEventListener("click", retry);
    retryButton.className = 'retry_button';
    playArea.appendChild(retryButton);

    let quitButton = document.createElement('button');
    text = document.createTextNode('Quit');
    quitButton.appendChild(text);
    quitButton.addEventListener("click", quit);
    quitButton.className = 'quit_button';
    playArea.appendChild(quitButton);

    message.classList.add('appear');
    retryButton.classList.add('appear');
    quitButton.classList.add('appear');
    deleteAll();
}

function moveDiv(){
    for(var i=snake.length-1; i>=1; --i){
        snake[i][0]=snake[i-1][0];
        snake[i][1]=snake[i-1][1];
    }
}

function quit(){
    document.body.removeChild(document.getElementById("playArea"));  // removing the play area
    document.body.removeEventListener("keypress", getDirection);
}

function retry(){
    quit();
    startSnake();
}