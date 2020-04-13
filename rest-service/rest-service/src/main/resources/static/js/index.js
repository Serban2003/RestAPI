
var id=1;

function submitGreeting(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/greeting?name=' + document.getElementById("namez").value);

    // Track the state changes of the request.
    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.

        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                let jsonResult = JSON.parse(xhr.responseText);

                let newRow = document.createElement('tr');
                let newData = document.createElement('td');
                newData.innerHTML = jsonResult.content;

                let newAction = document.createElement('td');

                let newEdit = document.createElement('button');
                var textValue = document.createTextNode("Edit");
                newEdit.appendChild(textValue);
                newEdit.id = "edit_user" + id;

                let newDelete = document.createElement('button');
                var textValue = document.createTextNode("Delete");
                newDelete.appendChild(textValue);
                newDelete.id = "delete_user" + id;

                newAction.appendChild(newEdit);
                newAction.appendChild(newDelete);

                let cont = document.getElementById("user_list");
                cont.appendChild(newRow);

                newRow.appendChild(newData);
                newRow.appendChild(newAction);

                console.debug("Adding user: " + document.getElementById("namez").value + " "+ id);
                console.log(xhr.responseText); // 'This is the output.'
                ++id;
            } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
            }
        }
    };
    // Send the request to send-ajax-data.php
    xhr.send(null);
}