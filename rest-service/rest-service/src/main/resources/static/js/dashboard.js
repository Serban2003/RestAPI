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

    createIcons(menu);

    menuIcon.addEventListener("click", function () {
        if (menu.classList.contains("menu_expanded")) {
            menu.classList.remove("menu_expanded");
            menuIcon.classList.remove("transition_in");

            menu.classList.add("menu_out")
            menuIcon.classList.add("transition_out");

            setTimeout(function () {
                menuIcon.style.pointerEvents = "none";
                deleteButtons(menu);
                createIcons(menu);

                setTimeout(function () {
                    menuIcon.classList.remove("transition_out");
                    menu.classList.remove("menu_out");
                    setTimeout(function () {
                         menuIcon.style.pointerEvents = "auto";
                    }, 500);
                }, 300);
            }, 200);

        } else {
            menu.classList.add("menu_expanded");
            menuIcon.style.pointerEvents = "auto";
            menuIcon.classList.add("transition_in");
            createButtons(menu);
            deleteIcons(menu);
        }
    });
}

function createIcons(menu){
    var time = 120;
    createIcon(menu, "random_number_generator_icon", manageRandomNumberPanel);
    setTimeout(function () {
        createIcon(menu, "number_sequence_generator_icon", manageSequenceGenerator);
        setTimeout(function () {
            createIcon(menu, "prime_numbers_icon", managePrimeNumbersPanel);
            setTimeout(function () {
                createIcon(menu, "roman_numbers_icon", manageRomanNumberPanel);
                setTimeout(function () {
                    createIcon(menu, "number_sorter_icon", manageNumberSorter);
                    setTimeout(function () {
                        createIcon(menu, "sorting_icon", manageSortButton);
                        setTimeout(function () {
                            createIcon(menu, "matrix_icon", manageMatrixButton);
                        }, time);
                    }, time);
                }, time);
            }, time);
        }, time);
    }, time);
}

function deleteIcons(menu){
    menu.removeChild(document.getElementById("random_number_generator_icon"));
    menu.removeChild(document.getElementById("number_sequence_generator_icon"));
    menu.removeChild(document.getElementById("prime_numbers_icon"));
    menu.removeChild(document.getElementById("roman_numbers_icon"));
    menu.removeChild(document.getElementById("number_sorter_icon"));
    menu.removeChild(document.getElementById("sorting_icon"));
    menu.removeChild(document.getElementById("matrix_icon"));
}

function createIcon(menu, stringId, eventName){
    let icon = document.createElement("img");
    icon.src = "/images/" + stringId + ".png";
    icon.className = "menu_icon";
    icon.id = stringId;
    menu.appendChild(icon);

    setTimeout(function () {
        document.getElementById(stringId).classList.add("icon_in");
        icon.addEventListener("click", eventName);
    }, 110);
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

    romanNumberButton.addEventListener("click", manageNumberSorter);

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

    //matrix button
    let matrixButton = document.createElement("button");
    matrixButton.id = "matrixButton";
    matrixButton.className = "custom_button";
    matrixButton.innerHTML = "Matrix";
    menu.appendChild(matrixButton);
    matrixButton.addEventListener("click", manageMatrixButton);
}

function deleteButtons(menu) {
    menu.removeChild(document.getElementById("randomNumberButton"));
    menu.removeChild(document.getElementById("primeNumbersButton"));
    menu.removeChild(document.getElementById("sequenceGeneratorButton"));
    menu.removeChild(document.getElementById("romanNumberButton"));
    menu.removeChild(document.getElementById("numberSorterButton"));
    menu.removeChild(document.getElementById("sortButton"));
    menu.removeChild(document.getElementById("matrixButton"));
}

function manageRandomNumberPanel() {

    if (document.body.contains(document.getElementById("randomNumberPanel"))) {
        document.getElementById("randomNumberPanel").classList.add("disappear");
        document.getElementById("randomPersonPanel").classList.add("disappear");

        setTimeout(function () {
            document.body.removeChild(document.getElementById("randomNumberPanel"));
            document.body.removeChild(document.getElementById("randomPersonPanel"));
        }, 500);


    } else {
        verifyExistence();

        let panel = document.createElement("div");
        panel.id = "randomNumberPanel";
        panel.className = "panel";
        document.body.appendChild(panel);

        let radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.id = "randomNumberRadio";
        radioInput.name = "randomNumbers";
        radioInput.className = "check";
        panel.appendChild(radioInput);

        let title = document.createElement("h3");
        title.innerHTML = "Random Number Generator"
        title.className = "title";
        panel.appendChild(title);

        let contentDiv = document.createElement("div");
        contentDiv.className = "content";

        let text = document.createElement("span");
        text.innerHTML = "Generate number between: ";
        contentDiv.appendChild(text);

        let inputNumber1 = document.createElement("input");
        inputNumber1.type = "number";
        inputNumber1.className = "number_input";
        inputNumber1.id = "randomNumber1";
        contentDiv.appendChild(inputNumber1);

        text = document.createElement("span");
        text.innerHTML = " and ";
        contentDiv.appendChild(text);

        let inputNumber2 = document.createElement("input");
        inputNumber2.type = "number";
        inputNumber2.className = "number_input";
        inputNumber2.id = "randomNumber2";
        contentDiv.appendChild(inputNumber2);

        text = document.createElement("span");
        text.innerHTML = "Your number is: ";
        contentDiv.appendChild(text);

        let inputNumberResult = document.createElement("input");
        inputNumberResult.type = "text";
        inputNumberResult.className = "number_input";
        inputNumberResult.id = "randomNumberResult";
        inputNumberResult.readOnly = "true";
        contentDiv.appendChild(inputNumberResult);

        panel.appendChild(contentDiv);

        let submitButton = document.createElement("button");
        submitButton.className = "custom_button";
        submitButton.innerHTML = "Submit";
        panel.appendChild(submitButton);

        submitButton.addEventListener("click", submitRandomNumber);

        panel = document.createElement("div");
        panel.id = "randomPersonPanel";
        panel.className = "panel";
        document.body.appendChild(panel);

        radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.id = "randomPersonRadio";
        radioInput.name = "randomNumbers";
        radioInput.className = "check";
        panel.appendChild(radioInput);

        title = document.createElement("h3");
        title.innerHTML = "Pick a Random Person"
        title.className = "title";
        panel.appendChild(title);

        contentDiv = document.createElement("div");
        contentDiv.className = "content";

        text = document.createElement("span");
        text.innerHTML = "Your randomly picked person:";
        contentDiv.appendChild(text);

        inputNumberResult = document.createElement("input");
        inputNumberResult.type = "text";
        inputNumberResult.className = "number_input";
        inputNumberResult.id = "randomPersonResult";
        inputNumberResult.readOnly = "true";
        inputNumberResult.style.width = "215px";
        contentDiv.appendChild(inputNumberResult);

        panel.appendChild(contentDiv);

        submitButton = document.createElement("button");
        submitButton.className = "custom_button";
        submitButton.innerHTML = "Submit";
        panel.appendChild(submitButton);

        submitButton.addEventListener("click", submitRandomNumber);
    }
}

function submitRandomNumber() {

    if(document.body.contains(document.getElementById("advertisement")))
            document.body.removeChild(document.getElementById("advertisement"));

    if (document.getElementById("randomNumberRadio").checked) {
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

        path = '/algorithms/randomNumberGenerator?minim='  + minim + '&maxim=' + maxim;
        id = "randomNumberResult";

    } else if (document.getElementById("randomPersonRadio").checked) {
        path = '/algorithms/randomPersonPicker';
        id = "randomPersonResult";
    } else {
        createAdvertisement("not checked");
        return;
    }
    var xhrRandomNumber = new XMLHttpRequest();
    xhrRandomNumber.open('POST', path);
    xhrRandomNumber.setRequestHeader("Content-Type", "application/json");

    // Track the state changes of the request.
    xhrRandomNumber.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.

        if (xhrRandomNumber.readyState === DONE)
            if (xhrRandomNumber.status === OK) document.getElementById(id).value = xhrRandomNumber.responseText;

    };
    xhrRandomNumber.send(null);
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
        panel.style.width = "510px"
        document.body.appendChild(panel);

        let title = document.createElement("h3");
        title.innerHTML = "Number Sequence Generator"
        panel.appendChild(title);

        contentDiv = document.createElement("div");
        contentDiv.className = "content";

        let text = document.createElement("span");
        text.innerHTML = "Select the number of numbers: ";
        contentDiv.appendChild(text);

        let inputNumber = document.createElement("input");
        inputNumber.type = "number";
        inputNumber.className = "number_input";
        inputNumber.id = "sequenceNumber";
        inputNumber.min = "0";
        inputNumber.max = "10000000";
        contentDiv.appendChild(inputNumber);

        brake = document.createElement("br");
        contentDiv.appendChild(brake);

        text = document.createElement("span");
        text.innerHTML = "Generate numbers between: ";
        contentDiv.appendChild(text);

        let inputMinim = document.createElement("input");
        inputMinim.type = "number";
        inputMinim.className = "number_input";
        inputMinim.id = "minimNumber";
        contentDiv.appendChild(inputMinim);

        text = document.createElement("span");
        text.innerHTML = " and ";
        contentDiv.appendChild(text);

        let inputMaxim = document.createElement("input");
        inputMaxim.type = "number";
        inputMaxim.className = "number_input";
        inputMaxim.id = "maximNumber";
        contentDiv.appendChild(inputMaxim);

        brake = document.createElement("br");
        contentDiv.appendChild(brake);

        text = document.createElement("span");
        text.innerHTML = "Select the distribution: ";
        contentDiv.appendChild(text);

        let inputDistribution = document.createElement("input");
        inputDistribution.setAttribute('list', "sequenceDistributionData");
        inputDistribution.className = "number_input";
        inputDistribution.id = "sequenceDistribution";
        inputDistribution.style.width = "170px";
        contentDiv.appendChild(inputDistribution);

        let dataList = document.createElement("datalist");
        dataList.id = "sequenceDistributionData";
        contentDiv.appendChild(dataList);

        let option = document.createElement("option");
        option.value = "random";
        dataList.appendChild(option);

        option = document.createElement("option");
        option.value = "nearly sorted";
        dataList.appendChild(option);

        option = document.createElement("option");
        option.value = "reversed";
        dataList.appendChild(option);

        brake = document.createElement("br");
        contentDiv.appendChild(brake);

        text = document.createElement("span");
        text.innerHTML = "Select the maximum frequency: ";
        contentDiv.appendChild(text);

        let inputFrequency = document.createElement("input");
        inputFrequency.type = "number";
        inputFrequency.className = "number_input";
        inputFrequency.id = "frequencyNumber";
        inputFrequency.min = "1";
        inputFrequency.max = "10000000";
        inputFrequency.style.width = "95px";
        contentDiv.appendChild(inputFrequency);

        brake = document.createElement("br");
        contentDiv.appendChild(brake);

        text = document.createElement("span");
        text.innerHTML = "Your sequence: ";
        contentDiv.appendChild(text);

        let inputSequenceResult = document.createElement("textarea");
        inputSequenceResult.type = "text";
        inputSequenceResult.className = "number_input";
        inputSequenceResult.id = "inputSequenceResult";
        inputSequenceResult.style.width = "474px";
        inputSequenceResult.style.height = "100px";
        inputSequenceResult.style.overflowY = "scroll";
        inputSequenceResult.readOnly = "true";
        inputSequenceResult.style.resize = "none";
        contentDiv.appendChild(inputSequenceResult);

        panel.appendChild(contentDiv);

        let submitButton = document.createElement("button");
        submitButton.className = "custom_button";
        submitButton.innerHTML = "Submit";
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
        document.body.appendChild(panel);

        let radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.id = "nthPrimeNumbers";
        radioInput.name = "primeNumbers";
        radioInput.className = "check";
        panel.appendChild(radioInput);

        let title = document.createElement("h3");
        title.innerHTML = "N-th Prime Number"
        title.className = "title";
        panel.appendChild(title);

        let contentDiv = document.createElement("div");
        contentDiv.className = "content";

        let text = document.createElement("span");
        text.innerHTML = "Select N: ";
        contentDiv.appendChild(text);

        let inputNumber = document.createElement("input");
        inputNumber.type = "number";
        inputNumber.className = "number_input";
        inputNumber.id = "primeNumber";
        inputNumber.min = "0";
        contentDiv.appendChild(inputNumber);

        let brake = document.createElement("br");
        contentDiv.appendChild(brake);

        text = document.createElement("span");
        text.innerHTML = "Your N-th prime number is: ";
        contentDiv.appendChild(text);

        let inputPrimeNumbersResult = document.createElement("input");
        inputPrimeNumbersResult.type = "text";
        inputPrimeNumbersResult.className = "number_input";
        inputPrimeNumbersResult.id = "inputPrimeNumbersResult";
        inputPrimeNumbersResult.readOnly = "true";
        contentDiv.appendChild(inputPrimeNumbersResult);

        panel.appendChild(contentDiv);

        let submitButton = document.createElement("button");
        submitButton.className = "custom_button";
        submitButton.innerHTML = "Submit";
        panel.appendChild(submitButton);

        submitButton.addEventListener("click", submitPrimeNumber);

        panel = document.createElement("div");
        panel.id = "primeNumbersPanel";
        panel.className = "panel";
        panel.style.width = "370px"
        document.body.appendChild(panel);

        radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.id = "nPrimeNumbers";
        radioInput.name = "primeNumbers";
        radioInput.className = "check";
        panel.appendChild(radioInput);

        title = document.createElement("h3");
        title.innerHTML = "First N Prime Numbers"
        title.className = "title";
        panel.appendChild(title);

        contentDiv = document.createElement("div");
        contentDiv.className = "content";

        text = document.createElement("span");
        text.innerHTML = "Select N: ";
        contentDiv.appendChild(text);

        inputNumber = document.createElement("input");
        inputNumber.type = "number";
        inputNumber.className = "number_input";
        inputNumber.id = "nPrimeNumber";
        inputNumber.min = "0";
        contentDiv.appendChild(inputNumber);

        brake = document.createElement("br");
        contentDiv.appendChild(brake);

        text = document.createElement("span");
        text.innerHTML = "Your first N prime numbers: ";
        contentDiv.appendChild(text);

        inputPrimeNumbersResult = document.createElement("textarea");
        inputPrimeNumbersResult.type = "text";
        inputPrimeNumbersResult.className = "number_input";
        inputPrimeNumbersResult.id = "inputNPrimeNumbersResult";
        inputPrimeNumbersResult.style.width = "334px";
        inputPrimeNumbersResult.style.height = "100px";
        inputPrimeNumbersResult.style.overflowY = "scroll";
        inputPrimeNumbersResult.readOnly = "true";
        inputPrimeNumbersResult.style.resize = "none";
        contentDiv.appendChild(inputPrimeNumbersResult);

        panel.appendChild(contentDiv);

        submitButton = document.createElement("button");
        submitButton.className = "custom_button";
        submitButton.innerHTML = "Submit";
        panel.appendChild(submitButton);

        submitButton.addEventListener("click", submitPrimeNumber);
    }
}

function submitPrimeNumber() {

    if(document.body.contains(document.getElementById("advertisement")))
            document.body.removeChild(document.getElementById("advertisement"));

    var number, id, path;

    var xhrPrimeNumber = new XMLHttpRequest();

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
        panel.style.width = "370px"
        document.body.appendChild(panel);

        let radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.id = "arabNumbers";
        radioInput.name = "romanArabNumbers";
        radioInput.className = "check";
        panel.appendChild(radioInput);

        let title = document.createElement("h3");
        title.innerHTML = "Arab - Roman Converter";
        title.className = "title";
        panel.appendChild(title);

        let contentDiv = document.createElement("div");
        contentDiv.className = "content";

        let text = document.createElement("span");
        text.innerHTML = "Select number: ";
        contentDiv.appendChild(text);

        let inputNumber = document.createElement("input");
        inputNumber.type = "number";
        inputNumber.className = "number_input";
        inputNumber.id = "arabNumber";
        inputNumber.min = "-5000";
        inputNumber.max = "5000";
        contentDiv.appendChild(inputNumber);

        let brake = document.createElement("br");
        contentDiv.appendChild(brake);

        text = document.createElement("span");
        text.innerHTML = "Your roman number: ";
        contentDiv.appendChild(text);

        let inputRomanNumbersResult = document.createElement("input");
        inputRomanNumbersResult.type = "text";
        inputRomanNumbersResult.className = "number_input";
        inputRomanNumbersResult.id = "inputArabNumberResult";
        inputRomanNumbersResult.readOnly = "true";
        contentDiv.appendChild(inputRomanNumbersResult);

        panel.appendChild(contentDiv);

        let submitButton = document.createElement("button");
        submitButton.className = "custom_button";
        submitButton.innerHTML = "Submit";
        panel.appendChild(submitButton);

        submitButton.addEventListener("click", submitRomanNumber);

        panel = document.createElement("div");
        panel.id = "romanToArabPanel";
        panel.className = "panel";
        panel.style.width = "370px"
        document.body.appendChild(panel);

        radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.id = "romanNumbers";
        radioInput.name = "romanArabNumbers";
        radioInput.className = "check";
        panel.appendChild(radioInput);

        contentDiv = document.createElement("div");
        contentDiv.className = "content";

        title = document.createElement("h3");
        title.innerHTML = "Roman - Arab Converter";
        title.className = "title";
        panel.appendChild(title);

        text = document.createElement("span");
        text.innerHTML = "Write number: ";
        contentDiv.appendChild(text);

        inputNumber = document.createElement("input");
        inputNumber.type = "text";
        inputNumber.className = "number_input";
        inputNumber.id = "romanNumber";
        contentDiv.appendChild(inputNumber);

        brake = document.createElement("br");
        contentDiv.appendChild(brake);

        text = document.createElement("span");
        text.innerHTML = "Your arab number: ";
        contentDiv.appendChild(text);

        inputRomanNumbersResult = document.createElement("input");
        inputRomanNumbersResult.type = "number";
        inputRomanNumbersResult.className = "number_input";
        inputRomanNumbersResult.id = "inputRomanNumberResult";
        inputRomanNumbersResult.readOnly = "true";
        contentDiv.appendChild(inputRomanNumbersResult);

        panel.appendChild(contentDiv);

        submitButton = document.createElement("button");
        submitButton.className = "custom_button";
        submitButton.innerHTML = "Submit";
        panel.appendChild(submitButton);

        submitButton.addEventListener("click", submitRomanNumber);
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

function manageNumberSorter(){
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
        document.body.appendChild(panel);

        let title = document.createElement("h3");
        title.innerHTML = "Sorting"
        title.className = "title";
        panel.appendChild(title);

        let contentDiv = document.createElement("div");
        contentDiv.className = "content";

        let text = document.createElement("span");
        text.innerHTML = "Generate sets: ";
        contentDiv.appendChild(text);

        let inputNumber = document.createElement("input");
        inputNumber.type = "number";
        inputNumber.className = "number_input";
        inputNumber.id = "setNumber";
        contentDiv.appendChild(inputNumber);

        panel.appendChild(contentDiv);

        let submitButton = document.createElement("button");
        submitButton.className = "custom_button";
        submitButton.innerHTML = "Submit";
        panel.appendChild(submitButton);

        submitButton.addEventListener("click", submitSort);
     }
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

    createSortCanvases();

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

function createSortCanvases(){
    let resultPanel = document.createElement("div");
    resultPanel.id = "resultPanel";
    resultPanel.className = "result_panel";
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

function manageMatrixButton(){
    if (document.body.contains(document.getElementById("matrixPanel")) && document.body.contains(document.getElementById("resultPanel"))) {
        document.getElementById("matrixPanel").classList.add("disappear");
        document.getElementById("resultPanel").classList.add("disappear");

        setTimeout(function () {
            document.body.removeChild(document.getElementById("matrixPanel"));
            document.body.removeChild(document.getElementById("resultPanel"));
        }, 500);


    }else if(document.body.contains(document.getElementById("matrixPanel"))){
        document.getElementById("matrixPanel").classList.add("disappear");

        setTimeout(function () {
            document.body.removeChild(document.getElementById("matrixPanel"));
        }, 500);
    }
    else {
        verifyExistence();

        let panel = document.createElement("div");
        panel.id = "matrixPanel";
        panel.className = "panel";
        document.body.appendChild(panel);

        let title = document.createElement("h3");
        title.innerHTML = "Matrix Product"
        title.className = "title";
        panel.appendChild(title);

        let contentDiv = document.createElement("div");
        contentDiv.className = "content";

        let text = document.createElement("span");
        text.innerHTML = "Generate sets: ";
        contentDiv.appendChild(text);

        let inputNumber = document.createElement("input");
        inputNumber.type = "number";
        inputNumber.className = "number_input";
        inputNumber.id = "setNumber";
        contentDiv.appendChild(inputNumber);

        panel.appendChild(contentDiv);

        let submitButton = document.createElement("button");
        submitButton.className = "custom_button";
        submitButton.innerHTML = "Submit";
        panel.appendChild(submitButton);

        submitButton.addEventListener("click", submitMatrixProduct);
     }
}

function submitMatrixProduct(){
        if(document.body.contains(document.getElementById("advertisement")))
            document.body.removeChild(document.getElementById("advertisement"));

        var number = document.getElementById("setNumber").value;

        if(!number){
            createAdvertisement("number");
            return;
        }

        if(document.body.contains(document.getElementById("resultPanel")))
            document.body.removeChild(document.getElementById("resultPanel"));

        createMatrixCanvases();

        var xhrSort = new XMLHttpRequest();
        xhrSort.open('GET', '/matrix/' + number);
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

                                if(typeof values[response[i].algorithm.name] === "undefined")
                                    values[response[i].algorithm.name] = [];
                                values[response[i].algorithm.name].push(response[i].totalTime);
                            }
                            console.log(sampleSizes);

                            dataSets.push(
                                {
                                    label: "Matrix Product",
                                    backgroundColor: "blue",
                                    data: values["Product Set"]
                                }
                             );

                            console.log(dataSets);

                            var ctx = document.getElementById('matrixChart').getContext('2d');
                            var randomChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                        labels: sampleSizes,
                                        datasets: dataSets
                                },
                                options: {
                                    title: {
                                            display: true,
                                            text: 'Matrix Product'
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

function createMatrixCanvases(){
    let resultPanel = document.createElement("div");
    resultPanel.id = "resultPanel";
    resultPanel.className = "result_panel";
    document.body.appendChild(resultPanel);

    let resultSet = document.createElement("div");
    resultSet.id = "resultSet";
    resultSet.className = "result_set";
    resultSet.style.height = "98%";
    resultPanel.appendChild(resultSet);

    let resultDiv = document.createElement("canvas");
    resultDiv.id = "matrixChart";
    resultSet.appendChild(resultDiv);
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

    if (main.contains(document.getElementById("randomNumberPanel"))){
        main.removeChild(document.getElementById("randomNumberPanel"));
        main.removeChild(document.getElementById("randomPersonPanel"));
    }
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
    if (main.contains(document.getElementById("matrixPanel"))){
        main.removeChild(document.getElementById("matrixPanel"));
        if(document.body.contains(document.getElementById("resultPanel")))
            document.body.removeChild(document.getElementById("resultPanel"));
    }

}

function createMatrixCanvases(){
    let resultPanel = document.createElement("div");
    resultPanel.id = "resultPanel";
    resultPanel.className = "result_panel";
    resultPanel.style.height = "200px";
    resultPanel.classList.add("show_div");
    document.body.appendChild(resultPanel);

    let resultSet = document.createElement("div");
    resultSet.id = "resultSet";
    resultSet.className = "result_set";
    resultSet.style.height = "98%";
    resultPanel.appendChild(resultSet);

    let resultDiv = document.createElement("canvas");
    resultDiv.id = "matrixChart";
    resultSet.appendChild(resultDiv);
}

