
/***************** User Table *****************/

window.onload = function () {
    getAll();
}

//creating a new table row
function createTable(myObj) {
    let newRow = document.createElement('tr'); //creating a new row for user table
    newRow.id = "user_row" + myObj.id;

    let newID = document.createElement('td'); //creating a new table cell for user id
    newID.data = "user_id" + myObj.id;
    newID.innerHTML = myObj.id;
    newRow.appendChild(newID);

    let firstname = document.createElement('td'); //creating a new table cell for firstname
    firstname.id = "user_firstname" + myObj.id;
    newRow.appendChild(firstname);

    let lastname = document.createElement('td'); //creating a new table cell for lastname
    lastname.id = "user_lastname" + myObj.id;
    newRow.appendChild(lastname);

    let password = document.createElement('td'); //creating a new table cell for password
    password.id = "user_password" + myObj.id;
    newRow.appendChild(password);

    let email = document.createElement('td'); //creating a new table cell for email
    email.id = "user_email" + myObj.id;
    newRow.appendChild(email);

    addNewEvent(firstname, myObj.id, "dblclick", editFirstname); //adding an ondblclick event for the table cell
    addNewEvent(lastname, myObj.id, "dblclick", editLastname);
    addNewEvent(password, myObj.id, "dblclick", editPassword);
    addNewEvent(email, myObj.id, "dblclick", editEmail);

    let newFirstName = document.createElement('span'); //creating a container for username
    newFirstName.id = "user_firstname_span" + myObj.id;
    newFirstName.innerHTML = myObj.firstname; //displaying the username
    firstname.appendChild(newFirstName);

    let newLastName = document.createElement('span'); //creating a container for username
    newLastName.id = "user_lastname_span" + myObj.id;
    newLastName.innerHTML = myObj.lastname; //displaying the username
    lastname.appendChild(newLastName);

    let newPassword = document.createElement('span'); //creating a container for username
    newPassword.id = "user_password_span" + myObj.id;
    newPassword.innerHTML = myObj.password; //displaying the username
    password.appendChild(newPassword);

    let newEmail = document.createElement('span'); //creating a container for username
    newEmail.id = "user_email_span" + myObj.id;
    newEmail.innerHTML = myObj.email; //displaying the username
    email.appendChild(newEmail);

    //creating a new table cell for buttons
    let newAction = document.createElement('td');

    //creating a delete button
    let newDelete = document.createElement('button');
    var textValue = document.createTextNode("Delete");
    newDelete.appendChild(textValue);
    newDelete.id = "delete_user" + myObj.id;

    addNewEvent(newDelete, myObj.id, "click", deleteUser); //adding an onclick event for the delete button

    newAction.appendChild(newDelete);
    newRow.appendChild(newAction);

    //adding the row at the table
    let cont = document.getElementById("user_list");
    cont.appendChild(newRow);
}

//edit username on button click or double click
function editFirstname(id) {
    console.log(id);
   if(typeof id === 'string') var newId = id.match(/\d+/g);
           else var newId = this.id.match(/\d+/g); //creating the new id

    //saving temporally the username in a new input form and deleting the current span container
    var div = document.getElementById("user_firstname_span" + newId);
    var row = document.getElementById("user_firstname" + newId);

    let editInput = document.createElement('input');
    editInput.type = "text";
    editInput.maxLength = 20;
    editInput.id = "input" + newId;
    editInput.value = div.textContent;

    //adding an onkeypress event for the input form
    addNewEvent(editInput, newId, "keypress", pressFirstname)

    row.appendChild(editInput);
    row.removeChild(div);
}

function editLastname(id) {
        if(typeof id === 'string') var newId = id.match(/\d+/g);
        else var newId = this.id.match(/\d+/g); //creating the new id

    //saving temporally the username in a new input form and deleting the current span container
    var div = document.getElementById("user_lastname_span" + newId);
    var row = document.getElementById("user_lastname" + newId);

    let editInput = document.createElement('input');
    editInput.type = "text";
    editInput.maxLength = 20;
    editInput.id = "input" + newId;
    editInput.value = div.textContent;

    //adding an onkeypress event for the input form
    addNewEvent(editInput, newId, "keypress", pressLastname)

    row.appendChild(editInput);
    row.removeChild(div);
}

function editPassword(id) {
if(typeof id === 'string') var newId = id.match(/\d+/g);
           else var newId = this.id.match(/\d+/g); //creating the new id
    //saving temporally the username in a new input form and deleting the current span container
    var div = document.getElementById("user_password_span" + newId);
    var row = document.getElementById("user_password" + newId);

    let editInput = document.createElement('input');
    editInput.type = "text";
    editInput.maxLength = 20;
    editInput.id = "input" + newId;
    editInput.value = div.textContent;

    //adding an onkeypress event for the input form
    addNewEvent(editInput, newId, "keypress", pressPassword)

    row.appendChild(editInput);
    row.removeChild(div);
}

function editEmail(id) {
if(typeof id === 'string') var newId = id.match(/\d+/g);
           else var newId = this.id.match(/\d+/g); //creating the new id

    //saving temporally the username in a new input form and deleting the current span container
    var div = document.getElementById("user_email_span" + newId);
    var row = document.getElementById("user_email" + newId);

    let editInput = document.createElement('input');
    editInput.type = "text";
    editInput.maxLength = 20;
    editInput.id = "input" + newId;
    editInput.value = div.textContent;

    //adding an onkeypress event for the input form
    addNewEvent(editInput, newId, "keypress", pressEmail)

    row.appendChild(editInput);
    row.removeChild(div);
}

//updating the new username and putting it back in the table
function pressFirstname(id) {
    if (event.which == 13 || event.keyCode == 13) { //if "Enter" was pressed

        var newId = this.id.match(/\d+/g); //creating the new id
        var editInput = document.getElementById("input" + newId);
        if (editInput.value != "") {
            var x = new XMLHttpRequest();
            x.open('POST', '/user/update/');
            x.setRequestHeader("Content-Type", "application/json");

            //creating a new span container for the username
            let newSpan = document.createElement('span');
            newSpan.innerHTML = editInput.value;
            newSpan.id = "user_firstname_span" + newId;

            var row = document.getElementById("user_firstname" + newId);
            row.appendChild(newSpan);
            row.removeChild(editInput);

            var data = JSON.stringify({
                "id": newId[0],
                "firstname": editInput.value,
                "lastname": document.getElementById("user_lastname_span" + newId).innerHTML,
                "password": document.getElementById("user_password_span" + newId).innerHTML,
                "email": document.getElementById("user_email_span" + newId).innerHTML
            });
            x.send(data);
        }
    }
}

//updating the new username and putting it back in the table
function pressLastname(id) {
    if (event.which == 13 || event.keyCode == 13) { //if "Enter" was pressed

        var newId = this.id.match(/\d+/g); //creating the new id

        var editInput = document.getElementById("input" + newId);
        if (editInput.value != "") {
            var x = new XMLHttpRequest();
            x.open('POST', '/user/update/');
            x.setRequestHeader("Content-Type", "application/json");

            //creating a new span container for the username
            let newSpan = document.createElement('span');
            newSpan.innerHTML = editInput.value;
            newSpan.id = "user_lastname_span" + newId;

            var row = document.getElementById("user_lastname" + newId);
            row.appendChild(newSpan);
            row.removeChild(editInput);

            var data = JSON.stringify({
                "id": newId[0],
                "firstname": document.getElementById("user_firstname_span" + newId).innerHTML,
                "lastname": editInput.value,
                "password": document.getElementById("user_password_span" + newId).innerHTML,
                "email": document.getElementById("user_email_span" + newId).innerHTML
            });
            x.send(data);
        }
    }
}

function pressPassword(id) {
    if (event.which == 13 || event.keyCode == 13) { //if "Enter" was pressed

        var newId = this.id.match(/\d+/g); //creating the new id

        var editInput = document.getElementById("input" + newId);
        if (editInput.value != "") {
            var x = new XMLHttpRequest();
            x.open('POST', '/user/update/');
            x.setRequestHeader("Content-Type", "application/json");

            //creating a new span container for the username
            let newSpan = document.createElement('span');
            newSpan.innerHTML = editInput.value;
            newSpan.id = "user_password_span" + newId;

            var row = document.getElementById("user_password" + newId);
            row.appendChild(newSpan);
            row.removeChild(editInput);

            var data = JSON.stringify({
                "id": newId[0],
                "firstname": document.getElementById("user_firstname_span" + newId).innerHTML,
                "lastname": document.getElementById("user_lastname_span" + newId).innerHTML,
                "password": editInput.value,
                "email": document.getElementById("user_email_span" + newId).innerHTML
            });
            x.send(data);
        }
    }
}

function pressEmail(id) {
    if (event.which == 13 || event.keyCode == 13) { //if "Enter" was pressed

        var newId = this.id.match(/\d+/g); //creating the new id

        var editInput = document.getElementById("input" + newId);
        if (editInput.value != "") {
            var x = new XMLHttpRequest();
            x.open('POST', '/user/update/');
            x.setRequestHeader("Content-Type", "application/json");

            //creating a new span container for the username
            let newSpan = document.createElement('span');
            newSpan.innerHTML = editInput.value;
            newSpan.id = "user_email_span" + newId;

            var row = document.getElementById("user_email" + newId);
            row.appendChild(newSpan);
            row.removeChild(editInput);

            var data = JSON.stringify({
                "id": newId[0],
                "firstname": document.getElementById("user_firstname_span" + newId).innerHTML,
                "lastname": document.getElementById("user_lastname_span" + newId).innerHTML,
                "password": document.getElementById("user_password_span" + newId).innerHTML,
                "email": editInput.value
            });
            x.send(data);
        }
    }
}
//deleting the username on button click
function deleteUser(id) {
    var newId = this.id.match(/\d+/g); //creating the new id

    var x = new XMLHttpRequest();
    x.open('POST', '/user/delete/');
    x.setRequestHeader("Content-Type", "application/json");

    //deleting the row containing the username from the table
    var row = document.getElementById("user_row" + newId);
    row.remove();

    x.send("{\"id\": \"" + newId[0] + "\"}");
}

// adding a new event listener for a variable
function addNewEvent(variable, objId, action, newFunction) {
    if (variable.addEventListener) { // all browsers except IE before version 9
        variable.addEventListener(action, newFunction, false);
    } else {
        if (variable.attachEvent) { // IE before version 9
            variable.attachEvent(action, newFunction(objId));
        }
    }
}

function getAll() {
    var x = new XMLHttpRequest();
    x.open('GET', '/user/allusers/');

    x.onreadystatechange = function () {
        var DONE = 4;
        var OK = 200;

        if (x.readyState === DONE) {
            if (x.status === OK) {
                var response = x.responseText;
//                console.log(response);
                const obj = JSON.parse(response);

                $("#user_list").empty();
                for (i = 0; i < obj.values.length; i++) {
                    console.log(obj.values[i].nameValuePairs);
                    createTable(obj.values[i].nameValuePairs);
                }

            }
        } else console.log('Error: ' + x.status);
    }
    x.send();
}
