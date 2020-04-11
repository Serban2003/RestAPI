
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

                let newDiv = document.createElement('div');
                newDiv.innerHTML = jsonResult.content;

                let cont = document.getElementById("greeting-result");
                cont.appendChild(newDiv);

                console.log(xhr.responseText); // 'This is the output.'
            } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
            }
        }
    };

    // Send the request to send-ajax-data.php
    xhr.send(null);
}