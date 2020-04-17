//TODO: minimize code

var id = 0;
let allUsers;

window.onload = function() {
getAll();
}

function submitGreetingKey() {
    if (event.which == 13 || event.keyCode == 13) //call submitGreeting if "Enter" was pressed
        submitGreeting();
}

function submitGreeting() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/user/');
    xhr.setRequestHeader("Content-Type", "application/json");
    var name = document.getElementById("namez").value;

    // Track the state changes of the request.
    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.

        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                ++id;
                let jsonResult = JSON.parse(xhr.responseText);
                getAll();

                document.getElementById("namez").value=''; //refreshing the input form

                let newRow = document.createElement('tr'); //creating a new row for user table
                newRow.id = "user_row" + id;

                let newID = document.createElement('td'); //creating a new table cell for user id
                newID.data = "user_id" + id;
                newID.innerHTML = id;
                newRow.appendChild(newID);

                let newData = document.createElement('td'); //creating a new table cell for username
                newData.id = "user_data" + id;
                newRow.appendChild(newData);

                addNewEvent(newData, "dblclick", editUser); //adding an ondblclick event for the table cell

                let newName = document.createElement('span'); //creating a container for username
                newName.id = "user_name" + id;
                newName.innerHTML = jsonResult.name; //displaying the username
                newData.appendChild(newName);

                //creating a new table cell for buttons
                let newAction = document.createElement('td');

                //creating an edit button
                let newEdit = document.createElement('button');
                var textValue = document.createTextNode("Edit");
                newEdit.appendChild(textValue);
                newEdit.id = "edit_user" + id;

                addNewEvent(newEdit, "click", editUser); //adding an onclick event for the edit button

                //creating a delete button
                let newDelete = document.createElement('button');
                var textValue = document.createTextNode("Delete");
                newDelete.appendChild(textValue);
                newDelete.id = "delete_user" + id;

                addNewEvent(newDelete, "click", deleteUser); //adding an onclick event for the delete button

                newAction.appendChild(newEdit);
                newAction.appendChild(newDelete);
                newRow.appendChild(newAction);

                //adding the row at the table
                let cont = document.getElementById("user_list");
                cont.appendChild(newRow);

                console.log(xhr.responseText); // 'This is the output.'

            } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
            }
        }
    };

    xhr.send("{\"name\": \""+ name + "\"}");
}
//edit username on button click or double click
function editUser(id) {

    var index = this.id.length - 1; //length of the username
    while (this.id[index] >= '0' && this.id[index] <= '9') //finding the first digit of the id
        index--;

    var newId = this.id.substr(index + 1, this.id.length - 1); //creating the new id

    console.info("Editing user: " + document.getElementById("namez").value + " id: " + newId);

    //saving temporally the username in a new input form and deleting the current span container
    var div = document.getElementById("user_name" + newId);
    var row = document.getElementById("user_data" + newId);

    let editInput = document.createElement('input');
    editInput.type = "text";
    editInput.id = "input" + newId;
    editInput.value = div.textContent;

    //adding an onkeypress event for the input form
    if (editInput.addEventListener) { // all browsers except IE before version 9
        editInput.addEventListener("keypress", press, false);
    } else {
        if (editInput.attachEvent) { // IE before version 9
            editInput.attachEvent("keypress", press(newId));
        }
    }
    row.appendChild(editInput);
    row.removeChild(div);
}

//updating the new username and putting it back in the table
function press(id) {

    if (event.which == 13 || event.keyCode == 13) { //if "Enter" was pressed

        var x = new XMLHttpRequest();
        x.open('POST', '/user/update/');
        x.setRequestHeader("Content-Type", "application/json");

        var index = this.id.length - 1; //length of the username
        while (this.id[index] >= '0' && this.id[index] <= '9') //finding the first digit of the id
            index--;

        var newId = this.id.substr(index + 1, this.id.length - 1); //creating the new id

        var editInput = document.getElementById("input" + newId);

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

//deleting the username on button click
function deleteUser(id) {

    var x = new XMLHttpRequest();
    x.open('POST', '/user/delete/');
    x.setRequestHeader("Content-Type", "application/json");

    var index = this.id.length - 1; //length of the username
    while (this.id[index] >= '0' && this.id[index] <= '9') //finding the first digit of the id
        index--;

    var newId = this.id.substr(index + 1, this.id.length - 1); //creating the new id

    console.info("Deleting user: " + document.getElementById("namez").value + " id: " + newId);

    //deleting the row containing the username from the table
    var row = document.getElementById("user_row" + newId);
    row.remove();

    x.send("{\"id\": \""+ newId + "\"}");
}

 //adding a new event listener for a variable
function addNewEvent(variable, action, newFunction){
    if (variable.addEventListener) { // all browsers except IE before version 9
            variable.addEventListener(action, newFunction, false);
        } else {
            if (variable.attachEvent) { // IE before version 9
                variable.attachEvent(action, newFunction(variable.id));
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
                console.log(x.responseText);
            }
        } else console.log('Error: ' + x.status);
    }
    x.send();
}