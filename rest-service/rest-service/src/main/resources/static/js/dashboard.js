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
    let primeNumbersButton = document.createElement("button");
    primeNumbersButton.id = "primeNumbersButton";
    primeNumbersButton.className = "custom_button";

    primeNumbersButton.addEventListener("click", managePrimeNumbersPanel);

    text = document.createTextNode("Prime Numbers");
    primeNumbersButton.appendChild(text);
    menu.appendChild(primeNumbersButton);

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
    menu.removeChild(document.getElementById("primeNumbersButton"));
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
    xhrRandomNumber.open('POST', '/algorithms/randomNumberGenerator?firstNumber=' + number1 + '&secondNumber=' + number2);
    xhrRandomNumber.setRequestHeader("Content-Type", "application/json");
    // Track the state changes of the request.
    xhrRandomNumber.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.

        if (xhrRandomNumber.readyState === DONE) {
            if (xhrRandomNumber.status === OK) {

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

function managePrimeNumbersPanel() {
    if (document.body.contains(document.getElementById("nthPrimeNumbersPanel"))) {
        document.getElementById("nthPrimeNumbersPanel").classList.add("hidden_div");

        setTimeout(function () {
            document.body.removeChild(document.getElementById("nthPrimeNumbersPanel"));
        }, 500);
    } else {
        let panel = document.createElement("div");
        panel.id = "nthPrimeNumbersPanel";
        panel.className = "panel";
        panel.classList.add("show_div");
        panel.style.width = "370px"
        document.body.appendChild(panel);

        let title = document.createElement("h3");
        title.innerHTML = "N-th Prime Number"
        title.style.textAlign = "center";
        panel.appendChild(title);

        let closeButton = document.createElement("div");
        closeButton.className = "close_button";
        closeButton.innerHTML = "x";
        panel.appendChild(closeButton);
        closeButton.addEventListener("click", managePrimeNumbersPanel);

        let text = document.createElement("span");
        text.innerHTML = "Select N: ";
        text.style.paddingLeft = "18px";
        panel.appendChild(text);

        let inputNumber = document.createElement("input");
        inputNumber.type = "number";
        inputNumber.className = "number_input";
        inputNumber.id = "primeNumber";
        inputNumber.min = "0";
        panel.appendChild(inputNumber);

        text = document.createElement("div");
        text.innerHTML = "Your N-th prime number is: ";
        text.style.paddingLeft = "18px";
        text.style.position = "relative";
        text.style.top = "15px";
        panel.appendChild(text);

        let inputPrimeNumbersResult = document.createElement("input");
        inputPrimeNumbersResult.type = "text";
        inputPrimeNumbersResult.className = "number_input";
        inputPrimeNumbersResult.id = "inputPrimeNumbersResult";
        inputPrimeNumbersResult.style.top = "-10px";
        inputPrimeNumbersResult.style.left = "237px";
        inputPrimeNumbersResult.style.position = "relative";
        inputPrimeNumbersResult.readOnly = "true";
        panel.appendChild(inputPrimeNumbersResult);

        let submitButton = document.createElement("button");
        submitButton.className = "custom_button";
        submitButton.innerHTML = "Submit";
        submitButton.style.top = "0px";
        panel.appendChild(submitButton);

        submitButton.addEventListener("click", submitPrimeNumber);

        let radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.id = "nthPrimeNumbers";
        radioInput.name = "primeNumbers";
        radioInput.className = "check";
        panel.appendChild(radioInput);


        panel = document.createElement("div");
        panel.id = "primeNumbersPanel";
        panel.className = "panel";
        panel.classList.add("show_div");
        panel.style.width = "370px"
        panel.style.height = "285px";
        panel.style.top = "300px";
        document.body.appendChild(panel);

        title = document.createElement("h3");
        title.innerHTML = "First N Prime Numbers"
        title.style.textAlign = "center";
        panel.appendChild(title);

        closeButton = document.createElement("div");
        closeButton.className = "close_button";
        closeButton.innerHTML = "x";
        panel.appendChild(closeButton);
        closeButton.addEventListener("click", managePrimeNumbersPanel);

        text = document.createElement("span");
        text.innerHTML = "Select N: ";
        text.style.paddingLeft = "18px";
        panel.appendChild(text);

        inputNumber = document.createElement("input");
        inputNumber.type = "number";
        inputNumber.className = "number_input";
        inputNumber.id = "nPrimeNumber";
        inputNumber.min = "0";
        panel.appendChild(inputNumber);

        text = document.createElement("div");
        text.innerHTML = "Your first N prime numbers: ";
        text.style.paddingLeft = "18px";
        text.style.position = "relative";
        text.style.top = "15px";
        panel.appendChild(text);

        inputPrimeNumbersResult = document.createElement("textarea");
        inputPrimeNumbersResult.type = "text";
        inputPrimeNumbersResult.className = "number_input";
        inputPrimeNumbersResult.id = "inputNPrimeNumbersResult";
        inputPrimeNumbersResult.style.width = "334px";
        inputPrimeNumbersResult.style.height = "100px";
        inputPrimeNumbersResult.style.top = "20px";
        inputPrimeNumbersResult.style.left = "18px";
        inputPrimeNumbersResult.style.position = "relative";
        inputPrimeNumbersResult.style.overflowY = "scroll";
        inputPrimeNumbersResult.readOnly = "true";
        inputPrimeNumbersResult.style.resize = "none";
        panel.appendChild(inputPrimeNumbersResult);

        submitButton = document.createElement("button");
        submitButton.className = "custom_button";
        submitButton.innerHTML = "Submit";
        submitButton.style.top = "25px";
        panel.appendChild(submitButton);

        submitButton.addEventListener("click", submitPrimeNumber);

        radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.id = "nPrimeNumbers";
        radioInput.name = "primeNumbers";
        radioInput.className = "check";
        panel.appendChild(radioInput);
    }
}

function submitPrimeNumber() {
    var number, id, path;

    var xhrPrimeNumber = new XMLHttpRequest();
    if (document.body.contains(document.getElementById("advertisement")))
        document.body.removeChild(document.getElementById("advertisement"));
    if (document.getElementById("nthPrimeNumbers").checked) {
        number = document.getElementById("primeNumber").value;
        path = '/algorithms/nthPrimeNumber?number=';
        id = "inputPrimeNumbersResult";
    } else if (document.getElementById("nPrimeNumbers").checked) {
        number = document.getElementById("nPrimeNumber").value;
        path = '/algorithms/primeNumbers?number=';
        id = "inputNPrimeNumbersResult";
    } else {
        createAdvertisement();
        return;
    }

    xhrPrimeNumber.open('POST', path + number);
    xhrPrimeNumber.setRequestHeader("Content-Type", "application/json");

    // Track the state changes of the request.
    xhrPrimeNumber.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.

        if (xhrPrimeNumber.readyState === DONE) {
            if (xhrPrimeNumber.status === OK) {

                document.getElementById(id).value = xhrPrimeNumber.responseText;

                console.log(xhrPrimeNumber.responseText); // 'This is the output.'
            } else {
                console.log('Error: ' + xhrPrimeNumber.status); // An error occurred during the request.
            }
        }
    };

    xhrPrimeNumber.send(JSON.stringify({
        number: number
    }));
}

function createAdvertisement() {
    let advertisement = document.createElement('div');
    advertisement.id = "advertisement";
    advertisement.className = "advertisement";

    let title = document.createTextNode("Alert!")
    let titleSpan = document.createElement("span");
    titleSpan.className = "title_span";
    titleSpan.appendChild(title);

    let text = document.createTextNode("Please select a method by clicking the check circle located at the top-left corner of each method.");
    let textSpan = document.createElement("span");
    textSpan.className = "text_span";
    textSpan.appendChild(text);

    let closeDiv = document.createElement("div");
    closeDiv.innerHTML = "x";
    closeDiv.className = "close_button";

    advertisement.appendChild(titleSpan);
    advertisement.appendChild(textSpan);
    advertisement.appendChild(closeDiv);
    document.body.appendChild(advertisement);

    advertisement.classList.add("appear");

    closeDiv.addEventListener("click", function () {
        closeDiv.removeAttribute("click");
        advertisement.classList.add("disappear");
        setTimeout(function () {
            document.body.removeChild(advertisement);
        }, 600);
    });
}