window.onload = function () {

    var menuIcon = document.getElementById('menu_icon');
    var menu = document.getElementById('menu');

    menuIcon.addEventListener("click", function () {
        if (menu.classList.contains("menu_expanded")) {
            menu.classList.remove("menu_expanded");
            menuIcon.classList.remove("transition_in");

            menu.classList.add("menu_out")
            menuIcon.classList.add("transition_out");

            setTimeout(function () {
                deleteButtons(menu);
                setTimeout(function () {
                    menuIcon.classList.remove("transition_out");
                    menu.classList.remove("menu_out")

                }, 300);
            }, 200);

        } else {
            menu.classList.add("menu_expanded");
            menuIcon.classList.add("transition_in");
            createButtons(menu);
        }
    });

    var banner = document.getElementById("banner");
    banner.style.width = (screen.width - 6) + "px";
    banner.style.left = "2px";

}

function createButtons(menu) {
    // random number generator button
    let randomNumberButton = document.createElement("button");
    randomNumberButton.id = "randomNumberButton";
    randomNumberButton.className = "custom_button";

    randomNumberButton.addEventListener("click", manageRandomNumberPanel);

    let text = document.createTextNode("Random Number Generator");
    randomNumberButton.appendChild(text);
    menu.appendChild(randomNumberButton);

    // number sequence generator
    let sequenceGeneratorButton = document.createElement("button");
    sequenceGeneratorButton.id = "sequenceGeneratorButton";
    sequenceGeneratorButton.className = "custom_button";

    text = document.createTextNode("Number Sequence Generator");
    sequenceGeneratorButton.appendChild(text);
    menu.appendChild(sequenceGeneratorButton);

    //prime numbers
    let primeNumberButton = document.createElement("button");
    primeNumberButton.id = "primeNumberButton";
    primeNumberButton.className = "custom_button";

    text = document.createTextNode("Prime Numbers");
    primeNumberButton.appendChild(text);
    menu.appendChild(primeNumberButton);

    //roman numbers
    let romanNumberButton = document.createElement("button");
    romanNumberButton.id = "romanNumberButton";
    romanNumberButton.className = "custom_button";

    text = document.createTextNode("Roman Numbers");
    romanNumberButton.appendChild(text);
    menu.appendChild(romanNumberButton);

    //number sorter
    let numberSorterButton = document.createElement("button");
    numberSorterButton.id = "numberSorterButton";
    numberSorterButton.className = "custom_button";

    text = document.createTextNode("Number Sorter");
    numberSorterButton.appendChild(text);
    menu.appendChild(numberSorterButton);

}

function deleteButtons(menu) {
    menu.removeChild(document.getElementById("randomNumberButton"));
    menu.removeChild(document.getElementById("primeNumberButton"));
    menu.removeChild(document.getElementById("sequenceGeneratorButton"));
    menu.removeChild(document.getElementById("romanNumberButton"));
    menu.removeChild(document.getElementById("numberSorterButton"));
}

function manageRandomNumberPanel() {

    if (document.body.contains(document.getElementById("randomNumberPanel"))) {
        document.getElementById("randomNumberPanel").classList.add("hidden_div");

        setTimeout(function () {
            document.body.removeChild(document.getElementById("randomNumberPanel"));
        }, 500);
    } else {
        let panel = document.createElement("div");
        panel.id = "randomNumberPanel";
        panel.className = "panel";
        panel.classList.add("show_div");
        document.body.appendChild(panel);

        let title = document.createElement("h3");
        title.innerHTML = "Random Number Generator"
        title.style.textAlign = "center";
        panel.appendChild(title);

        let closeButton = document.createElement("div");
        closeButton.className = "close_button";
        closeButton.innerHTML = "x";
        panel.appendChild(closeButton);
        closeButton.addEventListener("click", manageRandomNumberPanel);

        let text = document.createElement("span");
        text.innerHTML = "Generate number between: ";
        text.style.paddingLeft = "18px";
        panel.appendChild(text);

        let inputNumber1 = document.createElement("input");
        inputNumber1.type = "number";
        inputNumber1.className = "number_input";
        inputNumber1.id = "randomNumber1";
        panel.appendChild(inputNumber1);

        text = document.createElement("span");
        text.innerHTML = " and ";
        panel.appendChild(text);

        let inputNumber2 = document.createElement("input");
        inputNumber2.type = "number";
        inputNumber2.className = "number_input";
        inputNumber2.id = "randomNumber2";
        panel.appendChild(inputNumber2);

        text = document.createElement("span");
        text.innerHTML = "Your number is: ";
        text.style.paddingLeft = "18px";
        text.style.position = "relative";
        text.style.top = "10px";
        panel.appendChild(text);

        let inputNumberResult = document.createElement("input");
        inputNumberResult.type = "text";
        inputNumberResult.className = "number_input";
        inputNumberResult.id = "randomNumberResult";
        inputNumberResult.style.top = "10px";
        inputNumberResult.style.position = "relative";
        inputNumberResult.readOnly = "true";
        panel.appendChild(inputNumberResult);

        let submitButton = document.createElement("button");
        submitButton.className = "custom_button";
        submitButton.innerHTML = "Submit";
        panel.appendChild(submitButton);

        submitButton.addEventListener("click", submitRandomNumber);
    }
}

function submitRandomNumber() {
    var number1 = document.getElementById("randomNumber1").value;
    var number2 = document.getElementById("randomNumber2").value;

    var xhrRandomNumber = new XMLHttpRequest();
    xhrRandomNumber.open('POST', '/algorithms/randomNumberGenerator?firstNumber='+ number1 + '&secondNumber=' + number2);
    xhrRandomNumber.setRequestHeader("Content-Type", "application/json");
    // Track the state changes of the request.
    xhrRandomNumber.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.

        if (xhrRandomNumber.readyState === DONE) {
            if (xhrRandomNumber.status === OK) {

                let jsonResult = JSON.parse(xhrRandomNumber.responseText);

                document.getElementById("randomNumberResult").value = xhrRandomNumber.responseText;

                console.log(xhrRandomNumber.responseText); // 'This is the output.'
            } else {
                console.log('Error: ' + xhrRandomNumber.status); // An error occurred during the request.
            }
        }
    };

    xhrRandomNumber.send(JSON.stringify({
        firstNumber: number1,
        secondNumber: number2
    }));
}