window.onload = function () {

    document.getElementById("loader").style.top = window.innerHeight / 2 - 250 + "px";
    document.getElementById("loading_message").style.top = window.innerHeight / 2 - 50 + "px";

    setTimeout(function () {
        document.getElementById("background").classList.add("disappear");
        setTimeout(function () {
            document.body.removeChild(document.getElementById("background"));
        }, 600);
    }, 1000);

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

    sequenceGeneratorButton.addEventListener("click", manageSequenceGenerator);

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

    romanNumberButton.addEventListener("click", manageRomanNumberPanel);

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

    //sort button
    let sortButton = document.createElement("button");
    sortButton.id = "sortButton";
    sortButton.className = "custom_button";
    sortButton.innerHTML = "Sorting";
    menu.appendChild(sortButton);
    sortButton.addEventListener("click", manageSortButton);
}

function deleteButtons(menu) {
    menu.removeChild(document.getElementById("randomNumberButton"));
    menu.removeChild(document.getElementById("primeNumbersButton"));
    menu.removeChild(document.getElementById("sequenceGeneratorButton"));
    menu.removeChild(document.getElementById("romanNumberButton"));
    menu.removeChild(document.getElementById("numberSorterButton"));
    menu.removeChild(document.getElementById("sortButton"));
}

function manageRandomNumberPanel() {

    if (document.body.contains(document.getElementById("randomNumberPanel"))) {
        document.getElementById("randomNumberPanel").classList.add("disappear");

        setTimeout(function () {
            document.body.removeChild(document.getElementById("randomNumberPanel"));
        }, 500);


    } else {
        verifyExistence();

        let panel = document.createElement("div");
        panel.id = "randomNumberPanel";
        panel.className = "panel";
        panel.classList.add("show_div");
        document.body.appendChild(panel);

        let title = document.createElement("h3");
        title.innerHTML = "Random Number Generator"
        title.style.textAlign = "center";
        panel.appendChild(title);

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

    if(document.body.contains(document.getElementById("advertisement")))
            document.body.removeChild(document.getElementById("advertisement"));

    var minim = document.getElementById("randomNumber1").value;
    var maxim = document.getElementById("randomNumber2").value;

    if(!minim){
        createAdvertisement("minim");
        return;
    }
    if(!maxim){
        createAdvertisement("maxim");
        return;
    }
    if(minim > maxim){
        createAdvertisement("minim greater then maxim");
        return;
    }

    var xhrRandomNumber = new XMLHttpRequest();
    xhrRandomNumber.open('POST', '/algorithms/randomNumberGenerator?minim=' + minim + '&maxim=' + maxim);
    xhrRandomNumber.setRequestHeader("Content-Type", "application/json");
    // Track the state changes of the request.
    xhrRandomNumber.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.

        if (xhrRandomNumber.readyState === DONE)
            if (xhrRandomNumber.status === OK) document.getElementById("randomNumberResult").value = xhrRandomNumber.responseText;
    };
    xhrRandomNumber.send(null);
}

function managePrimeNumbersPanel() {

    if (document.body.contains(document.getElementById("nthPrimeNumbersPanel"))) {
        document.getElementById("nthPrimeNumbersPanel").classList.add("disappear");
        document.getElementById("primeNumbersPanel").classList.add("disappear");

        setTimeout(function () {
            document.body.removeChild(document.getElementById("nthPrimeNumbersPanel"));
            document.body.removeChild(document.getElementById("primeNumbersPanel"));
        }, 500);

    } else {

        verifyExistence();

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

    if(document.body.contains(document.getElementById("advertisement")))
            document.body.removeChild(document.getElementById("advertisement"));

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
        createAdvertisement("not checked");
        return;
    }
    if(!number){
        createAdvertisement("number");
        return;
    }
    xhrPrimeNumber.open('POST', path + number);
    xhrPrimeNumber.setRequestHeader("Content-Type", "application/json");

    // Track the state changes of the request.
    xhrPrimeNumber.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.

        if (xhrPrimeNumber.readyState === DONE)
            if (xhrPrimeNumber.status === OK) document.getElementById(id).value = xhrPrimeNumber.responseText;

    };
    xhrPrimeNumber.send(null);
}

function manageRomanNumberPanel() {

    if (document.body.contains(document.getElementById("arabToRomanPanel"))) {
        document.getElementById("arabToRomanPanel").classList.add("disappear");
        document.getElementById("romanToArabPanel").classList.add("disappear");

        setTimeout(function () {
            document.body.removeChild(document.getElementById("arabToRomanPanel"));
            document.body.removeChild(document.getElementById("romanToArabPanel"));
        }, 500);

    } else {

        verifyExistence();

        let panel = document.createElement("div");
        panel.id = "arabToRomanPanel";
        panel.className = "panel";
        panel.classList.add("show_div");
        panel.style.width = "370px"
        document.body.appendChild(panel);

        let title = document.createElement("h3");
        title.innerHTML = "Arab - Roman Converter"
        title.style.textAlign = "center";
        panel.appendChild(title);

        let text = document.createElement("span");
        text.innerHTML = "Select number: ";
        text.style.paddingLeft = "18px";
        panel.appendChild(text);

        let inputNumber = document.createElement("input");
        inputNumber.type = "number";
        inputNumber.className = "number_input";
        inputNumber.id = "arabNumber";
        inputNumber.min = "-5000";
        inputNumber.max = "5000";
        panel.appendChild(inputNumber);

        text = document.createElement("div");
        text.innerHTML = "Your roman number: ";
        text.style.paddingLeft = "18px";
        text.style.position = "relative";
        text.style.top = "15px";
        panel.appendChild(text);

        let inputRomanNumbersResult = document.createElement("input");
        inputRomanNumbersResult.type = "text";
        inputRomanNumbersResult.className = "number_input";
        inputRomanNumbersResult.id = "inputArabNumberResult";
        inputRomanNumbersResult.style.top = "-10px";
        inputRomanNumbersResult.style.left = "185px";
        inputRomanNumbersResult.style.position = "relative";
        inputRomanNumbersResult.readOnly = "true";
        panel.appendChild(inputRomanNumbersResult);

        let submitButton = document.createElement("button");
        submitButton.className = "custom_button";
        submitButton.innerHTML = "Submit";
        submitButton.style.top = "0px";
        panel.appendChild(submitButton);

        submitButton.addEventListener("click", submitRomanNumber);

        let radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.id = "arabNumbers";
        radioInput.name = "romanArabNumbers";
        radioInput.className = "check";
        panel.appendChild(radioInput);

        panel = document.createElement("div");
        panel.id = "romanToArabPanel";
        panel.className = "panel";
        panel.classList.add("show_div");
        panel.style.width = "370px"
        panel.style.top = "300px";
        document.body.appendChild(panel);

        title = document.createElement("h3");
        title.innerHTML = "Roman - Arab Converter"
        title.style.textAlign = "center";
        panel.appendChild(title);

        text = document.createElement("span");
        text.innerHTML = "Write number: ";
        text.style.paddingLeft = "18px";
        panel.appendChild(text);

        inputNumber = document.createElement("input");
        inputNumber.type = "text";
        inputNumber.className = "number_input";
        inputNumber.id = "romanNumber";
        panel.appendChild(inputNumber);

        text = document.createElement("div");
        text.innerHTML = "Your arab number: ";
        text.style.paddingLeft = "18px";
        text.style.position = "relative";
        text.style.top = "15px";
        panel.appendChild(text);

        inputRomanNumbersResult = document.createElement("input");
        inputRomanNumbersResult.type = "number";
        inputRomanNumbersResult.className = "number_input";
        inputRomanNumbersResult.id = "inputRomanNumberResult";
        inputRomanNumbersResult.style.top = "-10px";
        inputRomanNumbersResult.style.left = "172px";
        inputRomanNumbersResult.style.position = "relative";
        inputRomanNumbersResult.readOnly = "true";
        panel.appendChild(inputRomanNumbersResult);

        submitButton = document.createElement("button");
        submitButton.className = "custom_button";
        submitButton.innerHTML = "Submit";
        submitButton.style.top = "0px";
        panel.appendChild(submitButton);

        submitButton.addEventListener("click", submitRomanNumber);

        radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.id = "romanNumbers";
        radioInput.name = "romanArabNumbers";
        radioInput.className = "check";
        panel.appendChild(radioInput);
    }
}

function submitRomanNumber() {

    if(document.body.contains(document.getElementById("advertisement")))
            document.body.removeChild(document.getElementById("advertisement"));

    var number, id, path;

    var xhrRomanNumber = new XMLHttpRequest();
    if (document.body.contains(document.getElementById("advertisement")))
        document.body.removeChild(document.getElementById("advertisement"));

    if (document.getElementById("arabNumbers").checked) {
        number = document.getElementById("arabNumber").value;
        path = '/algorithms/arabToRoman?number=';
        id = "inputArabNumberResult";
    } else if (document.getElementById("romanNumbers").checked) {
        path = '/algorithms/romanToArab?number=';
        id = "inputRomanNumberResult";
        number = document.getElementById("romanNumber").value;
    } else {
        createAdvertisement("not checked");
        return;
    }
     if(!number){
            createAdvertisement("number");
            return;
        }
    xhrRomanNumber.open('POST', path + number);
    xhrRomanNumber.setRequestHeader("Content-Type", "application/json");

    // Track the state changes of the request.
    xhrRomanNumber.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.

        if (xhrRomanNumber.readyState === DONE)
            if (xhrRomanNumber.status === OK) {
                if (xhrRomanNumber.responseText == 0) createAdvertisement("invalid roman input");
                else document.getElementById(id).value = xhrRomanNumber.responseText;
            }
    };
    xhrRomanNumber.send(null);
}

function manageSequenceGenerator() {

    if (document.body.contains(document.getElementById("sequenceGeneratorPanel"))) {
        document.getElementById("sequenceGeneratorPanel").classList.add("disappear");

        setTimeout(function () {
            document.body.removeChild(document.getElementById("sequenceGeneratorPanel"));
        }, 500);

    } else {

        verifyExistence();

        let panel = document.createElement("div");
        panel.id = "sequenceGeneratorPanel";
        panel.className = "panel";
        panel.classList.add("show_div");
        panel.style.width = "510px"
        panel.style.height = "415px";
        document.body.appendChild(panel);

        let title = document.createElement("h3");
        title.innerHTML = "Number Sequence Generator"
        title.style.textAlign = "center";
        panel.appendChild(title);

        let text = document.createElement("span");
        text.innerHTML = "Select the number of numbers: ";
        text.style.paddingLeft = "18px";
        panel.appendChild(text);

        let inputNumber = document.createElement("input");
        inputNumber.type = "number";
        inputNumber.className = "number_input";
        inputNumber.id = "sequenceNumber";
        inputNumber.min = "0";
        inputNumber.max = "10000000";
        panel.appendChild(inputNumber);

        text = document.createElement("span");
        text.innerHTML = "Generate numbers between: ";
        text.style.left = "18px";
        text.style.position = "absolute";
        text.style.top = "110px";
        panel.appendChild(text);

        let inputMinim = document.createElement("input");
        inputMinim.type = "number";
        inputMinim.className = "number_input";
        inputMinim.id = "minimNumber";
        inputMinim.style.position = "absolute";
        inputMinim.style.left = "250px";
        inputMinim.style.top = "105px";
        panel.appendChild(inputMinim);

        text = document.createElement("span");
        text.innerHTML = " and ";
        text.style.position = "absolute";
        text.style.top = "110px";
        text.style.left = "355px";
        panel.appendChild(text);

        let inputMaxim = document.createElement("input");
        inputMaxim.type = "number";
        inputMaxim.className = "number_input";
        inputMaxim.id = "maximNumber";
        inputMaxim.style.position = "absolute";
        inputMaxim.style.left = "390px";
        inputMaxim.style.top = "105px";
        panel.appendChild(inputMaxim);

        text = document.createElement("div");
        text.innerHTML = "Select the distribution: ";
        text.style.paddingLeft = "18px";
        text.style.position = "relative";
        text.style.top = "55px";
        panel.appendChild(text);

        let inputDistribution = document.createElement("input");
        inputDistribution.setAttribute('list', "sequenceDistributionData");
        inputDistribution.className = "number_input";
        inputDistribution.id = "sequenceDistribution";
        inputDistribution.style.position = "absolute";
        inputDistribution.style.left = "200px";
        inputDistribution.style.top = "145px";
        inputDistribution.style.width = "170px";
        panel.appendChild(inputDistribution);

        let dataList = document.createElement("datalist");
        dataList.id = "sequenceDistributionData";
        panel.appendChild(dataList);

        let option = document.createElement("option");
        option.value = "random";
        dataList.appendChild(option);

        option = document.createElement("option");
        option.value = "nearly sorted";
        dataList.appendChild(option);

        option = document.createElement("option");
        option.value = "reversed";
        dataList.appendChild(option);

        text = document.createElement("div");
        text.innerHTML = "Select the maximum frequency: ";
        text.style.paddingLeft = "18px";
        text.style.position = "relative";
        text.style.top = "75px";
        panel.appendChild(text);

        let inputFrequency = document.createElement("input");
        inputFrequency.type = "number";
        inputFrequency.className = "number_input";
        inputFrequency.id = "frequencyNumber";
        inputFrequency.min = "1";
        inputFrequency.max = "10000000";
        inputFrequency.style.position = "absolute";
        inputFrequency.style.top = "187px";
        inputFrequency.style.left = "275px";
        inputFrequency.style.width = "95px";
        panel.appendChild(inputFrequency);

        text = document.createElement("div");
        text.innerHTML = "Your sequence: ";
        text.style.paddingLeft = "18px";
        text.style.position = "relative";
        text.style.top = "95px";
        panel.appendChild(text);

        let inputSequenceResult = document.createElement("textarea");
        inputSequenceResult.type = "text";
        inputSequenceResult.className = "number_input";
        inputSequenceResult.id = "inputSequenceResult";
        inputSequenceResult.style.width = "474px";
        inputSequenceResult.style.height = "100px";
        inputSequenceResult.style.top = "100px";
        inputSequenceResult.style.left = "18px";
        inputSequenceResult.style.position = "relative";
        inputSequenceResult.style.overflowY = "scroll";
        inputSequenceResult.readOnly = "true";
        inputSequenceResult.style.resize = "none";
        panel.appendChild(inputSequenceResult);

        let submitButton = document.createElement("button");
        submitButton.className = "custom_button";
        submitButton.innerHTML = "Submit";
        submitButton.style.top = "110px";
        panel.appendChild(submitButton);

        submitButton.addEventListener("click", submitSequence);
    }
}

function submitSequence() {

    if(document.body.contains(document.getElementById("advertisement")))
        document.body.removeChild(document.getElementById("advertisement"));

    var number = document.getElementById("sequenceNumber").value;
    var distribution = document.getElementById("sequenceDistribution").value;
    var frequency = document.getElementById("frequencyNumber").value;
    var minim = document.getElementById("minimNumber").value;
    var maxim = document.getElementById("maximNumber").value;

    if(!number){
        createAdvertisement("number");
        return;
    }
    if(!distribution){
        createAdvertisement("distribution");
        return;
    }
    if(!frequency){
        createAdvertisement("frequency");
        return;
    }
    if(!minim){
        createAdvertisement("minim");
        return;
    }
    if(!maxim){
        createAdvertisement("maxim");
        return;
    }
    if(minim > maxim){
        createAdvertisement("minim greater then maxim");
        return;
    }

    var xhrSequence = new XMLHttpRequest();
    xhrSequence.open('POST', '/algorithms/sequenceGenerator?number=' + number + '&distribution=' + distribution + '&frequency=' + frequency + '&minim=' + minim + '&maxim=' + maxim);
    xhrSequence.setRequestHeader("Content-Type", "application/json");

    xhrSequence.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.

        if (xhrSequence.readyState === DONE)
            if (xhrSequence.status === OK) {
                if(xhrSequence.responseText == "invalid input")
                    createAdvertisement("invalid input");
                    else document.getElementById("inputSequenceResult").value = xhrSequence.responseText;
            }


    };
    xhrSequence.send(null);
}

function createAdvertisement(message) {
    let advertisement = document.createElement('div');
    advertisement.id = "advertisement";
    advertisement.className = "advertisement";

    let title = document.createTextNode("Alert!")
    let titleSpan = document.createElement("span");
    titleSpan.className = "title_span";
    titleSpan.appendChild(title);

    let text;
    if (message == "not checked")
        text = "Please select a method by clicking the check circle located at the top-left corner of each method.";
    else if (message == "invalid roman input")
        text = "Please write a valid roman number.";
    else if (message == "invalid input")
        text = "Invalid input. <br> << frequency * ( maxim - minim + 1) >= number of numbers >>"
    else if (message == "minim greater then maxim")
        text = "Invalid input. <br> << " + message + " >>";
    else text = "You need to choose a " + message + ".";
    let textSpan = document.createElement("span");
    textSpan.className = "text_span";
    textSpan.innerHTML = text;

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

function verifyExistence() {
    var main = document.body;

    if (main.contains(document.getElementById("randomNumberPanel")))
        main.removeChild(document.getElementById("randomNumberPanel"));
    if (main.contains(document.getElementById("sequenceGeneratorPanel")))
        main.removeChild(document.getElementById("sequenceGeneratorPanel"));
    if (main.contains(document.getElementById("nthPrimeNumbersPanel")))
        main.removeChild(document.getElementById("nthPrimeNumbersPanel"));
    if (main.contains(document.getElementById("primeNumbersPanel")))
        main.removeChild(document.getElementById("primeNumbersPanel"));
    if (main.contains(document.getElementById("romanToArabPanel")))
        main.removeChild(document.getElementById("romanToArabPanel"));
    if (main.contains(document.getElementById("arabToRomanPanel")))
        main.removeChild(document.getElementById("arabToRomanPanel"));
    if (main.contains(document.getElementById("sortPanel"))){
        main.removeChild(document.getElementById("sortPanel"));
        if(document.body.contains(document.getElementById("resultPanel")))
            document.body.removeChild(document.getElementById("resultPanel"));
    }

}

function manageSortButton() {
        if (document.body.contains(document.getElementById("sortPanel")) && document.body.contains(document.getElementById("resultPanel"))) {
            document.getElementById("sortPanel").classList.add("disappear");
            document.getElementById("resultPanel").classList.add("disappear");

            setTimeout(function () {
                document.body.removeChild(document.getElementById("sortPanel"));
                document.body.removeChild(document.getElementById("resultPanel"));
            }, 500);


        }else if(document.body.contains(document.getElementById("sortPanel"))){
            document.getElementById("sortPanel").classList.add("disappear");

            setTimeout(function () {
                document.body.removeChild(document.getElementById("sortPanel"));
            }, 500);
        }
        else {
            verifyExistence();

            let panel = document.createElement("div");
            panel.id = "sortPanel";
            panel.className = "panel";
            panel.classList.add("show_div");
            panel.style.height = "150px";
            document.body.appendChild(panel);

            let title = document.createElement("h3");
            title.innerHTML = "Sorting"
            title.style.textAlign = "center";
            panel.appendChild(title);

            let text = document.createElement("span");
            text.innerHTML = "Generate sets: ";
            text.style.paddingLeft = "18px";
            panel.appendChild(text);

            let inputNumber = document.createElement("input");
            inputNumber.type = "number";
            inputNumber.className = "number_input";
            inputNumber.id = "setNumber";
            panel.appendChild(inputNumber);

            let submitButton = document.createElement("button");
            submitButton.className = "custom_button";
            submitButton.innerHTML = "Submit";
            submitButton.style.top = "10px";
            panel.appendChild(submitButton);

            submitButton.addEventListener("click", submitSort);
         }
}

function createCanvases(){
    let resultPanel = document.createElement("div");
    resultPanel.id = "resultPanel";
    resultPanel.className = "result_panel";
    resultPanel.classList.add("show_div");
    document.body.appendChild(resultPanel);

    let randomResultSet = document.createElement("div");
    randomResultSet.id = "randomResultSet";
    randomResultSet.className = "result_set";
    resultPanel.appendChild(randomResultSet);

    let nearlySortedResultSet = document.createElement("div");
    nearlySortedResultSet.id = "nearlySortedResultSet";
    nearlySortedResultSet.className = "result_set";
    resultPanel.appendChild(nearlySortedResultSet);

    let reversedResultSet = document.createElement("div");
    reversedResultSet.id = "reversedResultSet";
    reversedResultSet.className = "result_set";
    resultPanel.appendChild(reversedResultSet);

    let randomResultDiv = document.createElement("canvas");
    randomResultDiv.id = "randomSortChart";
    randomResultSet.appendChild(randomResultDiv);

    let nearlySortedResultDiv = document.createElement("canvas");
    nearlySortedResultDiv.id = "nearlySortedSortChart";
    nearlySortedResultSet.appendChild(nearlySortedResultDiv);

    let reversedResultDiv = document.createElement("canvas");
    reversedResultDiv.id = "reversedSortChart";
    reversedResultSet.appendChild(reversedResultDiv);
}

function submitSort(){
        if(document.body.contains(document.getElementById("advertisement")))
            document.body.removeChild(document.getElementById("advertisement"));

        var number = document.getElementById("setNumber").value;

        if(!number){
            createAdvertisement("number");
            return;
        }

        if(document.body.contains(document.getElementById("resultPanel")))
            document.body.removeChild(document.getElementById("resultPanel"));

        createCanvases();

        var xhrSort = new XMLHttpRequest();
        xhrSort.open('GET', '/sort/' + number);
        xhrSort.setRequestHeader("Content-Type", "application/json");

        xhrSort.onreadystatechange = function () {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.

            if (xhrSort.readyState === DONE)
                if (xhrSort.status === OK) {
                    if(xhrSort.responseText == "invalid input")
                        createAdvertisement("invalid input");
                        else{
                            var response = JSON.parse(xhrSort.responseText);
                            console.log(response);

                            var values = [];
                            var sampleSizes = [];
                            var dataSets = [];

                            for(var i in response){
                                if(typeof sampleSizes[response[i].sampleSize] === "undefined")
                                    sampleSizes.push(response[i].sampleSize);

                                if(typeof values[response[i].distribution] === "undefined")
                                    values[response[i].distribution] = [];
                                if(typeof values[response[i].distribution][response[i].algorithm.name] === "undefined")
                                    values[response[i].distribution][response[i].algorithm.name] = [];

                                values[response[i].distribution][response[i].algorithm.name].push(response[i].totalTime);
                            }
                            console.log(sampleSizes);

                            dataSets.push(
                                {
                                    label: "Bubble Sort",
                                    backgroundColor: "blue",
                                    data: values["random"]["BubbleSort"]
                                }
                             );
                             dataSets.push(
                                {
                                    label: "Quick Sort",
                                    backgroundColor: "red",
                                    data: values["random"]["QuickSort"]
                                }
                             );
                            dataSets.push(
                                {
                                    label: "Selection Sort",
                                    backgroundColor: "orange",
                                    data: values["random"]["SelectionSort"]
                                }
                            );

                            console.log(dataSets);

                            var ctx = document.getElementById('randomSortChart').getContext('2d');
                            var randomChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                        labels: sampleSizes,
                                        datasets: dataSets
                                },
                                options: {
                                    title: {
                                            display: true,
                                            text: 'Random Numbers Set'
                                    },
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero: true
                                            }
                                        }]
                                    }
                                }
                            });

                             dataSets = [];
                             dataSets.push(
                                 {
                                     label: "Bubble Sort",
                                     backgroundColor: "blue",
                                     data: values["nearlySorted"]["BubbleSort"]
                                 }
                              );
                              dataSets.push(
                                 {
                                     label: "Quick Sort",
                                     backgroundColor: "red",
                                     data: values["nearlySorted"]["QuickSort"]
                                 }
                              );
                             dataSets.push(
                                 {
                                     label: "Selection Sort",
                                     backgroundColor: "orange",
                                     data: values["nearlySorted"]["SelectionSort"]
                                 }
                             );

                           ctx = document.getElementById('nearlySortedSortChart').getContext('2d');
                           var nearlySortedChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: sampleSizes,
                                    datasets: dataSets
                                },
                                options: {
                                    title: {
                                        display: true,
                                        text: 'Nearly-Sorted Numbers Set'
                                    },
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                         yAxes: [{
                                            ticks: {
                                               beginAtZero: true
                                            }
                                         }]
                                    }
                                }
                           });

                             dataSets = [];
                             dataSets.push(
                                 {
                                     label: "Bubble Sort",
                                     backgroundColor: "blue",
                                     data: values["reversed"]["BubbleSort"]
                                 }
                              );
                              dataSets.push(
                                 {
                                     label: "Quick Sort",
                                     backgroundColor: "red",
                                     data: values["reversed"]["QuickSort"]
                                 }
                              );
                             dataSets.push(
                                 {
                                     label: "Selection Sort",
                                     backgroundColor: "orange",
                                     data: values["reversed"]["SelectionSort"]
                                 }
                             );

                           ctx = document.getElementById('reversedSortChart').getContext('2d');
                           var reversedChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: sampleSizes,
                                    datasets: dataSets
                                },
                                options: {
                                    title: {
                                        display: true,
                                        text: 'Reversed Numbers Set'
                                    },
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                         yAxes: [{
                                            ticks: {
                                               beginAtZero: true
                                            }
                                         }]
                                    }
                                }
                           });

                        }
                    }
        };
        xhrSort.send(null);
}
