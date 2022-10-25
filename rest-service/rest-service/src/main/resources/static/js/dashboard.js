let mainPage;

window.onload = function () {

    const collapsedClass = "nav--collapsed";
    const lsKey = "navCollapsed";

    const nav = document.querySelector(".nav");
    const navBorder = document.querySelector(".nav__border");
    const navIcon = document.getElementById("nav-icon");

    mainPage = document.getElementById("main")

    if(localStorage.getItem(lsKey) === "true"){
        nav.classList.add(collapsedClass);
        navIcon.classList.remove("hide_site_icon");
    }
    else navIcon.classList.add("hide_site_icon");

    navBorder.addEventListener("click", () =>{
        nav.classList.toggle(collapsedClass);
        navIcon.classList.toggle("hide_site_icon");
        localStorage.setItem(lsKey, nav.classList.contains(collapsedClass));
    });

    setTimeout(function () {
        document.getElementById("background").classList.add("disappear");
        setTimeout(function () {
            document.body.removeChild(document.getElementById("background"));
        }, 1200);
    }, 3000);
}

function createPanels(stringId){
    let panel = document.createElement("div");
    panel.id = stringId;
    panel.className = "panel";
    mainPage.appendChild(panel);
    return panel;
}

function createResultPanels(){
    let resultPanel = document.createElement("div");
    resultPanel.id = "resultPanel";
    resultPanel.className = "result_panel";
    mainPage.appendChild(resultPanel);
    return resultPanel;
}

function createRadioInputs(panel, stringId, name){
    let radioLabel = document.createElement("label");
    radioLabel.className = "container";

    let radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.id = stringId;
    radioInput.name = name;

    radioLabel.appendChild(radioInput);
    panel.appendChild(radioLabel);
}

function createTitles(panel, content){
    let title = document.createElement("h3");
    title.innerHTML = content;
    title.className = "title";
    panel.appendChild(title);
}

function createTexts(panel, content){
    let text = document.createElement("span");
    text.innerHTML = content;
    text.className = "custom_text";
    panel.appendChild(text);
}

function createInputs(panel, type, stringId){
    let inputNumber = document.createElement("input");
    inputNumber.id = stringId;
    inputNumber.type = type;
    inputNumber.className = "number_input";
    panel.appendChild(inputNumber);

    return inputNumber;
}

function createDropdownList(panel, options, stringId){
    let list = document.createElement("select");
    list.id = stringId;
    list.className = "number_input";
    panel.appendChild(list);

    for(let i = 0; i < options.length; ++i){
        const option = document.createElement("option");
        option.value = options[i];
        option.text = options[i];
        list.appendChild(option);
    }
}

function createOutputs(panel, typeOfInput, stringId){
    let output = document.createElement(typeOfInput);
    output.type = "text";
    output.id = stringId;
    output.className = "number_input";
    output.readOnly = "true";
    panel.appendChild(output);

    return output;
}

function createSubmitButtons(panel, eventName){
    let submitButton = document.createElement("button");
    submitButton.className = "custom_button";
    submitButton.innerHTML = "Submit";
    panel.appendChild(submitButton);

    submitButton.addEventListener("click", eventName);
}

function manageRandomNumberPanel() {

    if (mainPage.contains(document.getElementById("randomNumberPanel"))) {
        document.getElementById("randomNumberPanel").classList.add("disappear");
        document.getElementById("randomPersonPanel").classList.add("disappear");

        setTimeout(function () {
            mainPage.removeChild(document.getElementById("randomNumberPanel"));
            mainPage.removeChild(document.getElementById("randomPersonPanel"));
        }, 500);


    } else {
        verifyExistence();

        let panel = createPanels("randomNumberPanel");
        createRadioInputs(panel, "randomNumberRadio", "randomNumbers");
        createTitles(panel, "Random Number Generator");

        let contentDiv = document.createElement("div");
        contentDiv.className = "content";

        createTexts(contentDiv, "Generate number between: ");
        createInputs(contentDiv, "number", "randomNumber1")
        createTexts(contentDiv, " and ");
        createInputs(contentDiv, "number", "randomNumber2")
        createBrakes(contentDiv);
        createTexts(contentDiv, "Your number is: ");
        createOutputs(contentDiv, "input", "randomNumberResult");
        panel.appendChild(contentDiv);

        createSubmitButtons(panel, submitRandomNumber);

        panel = createPanels("randomPersonPanel");
        createRadioInputs(panel, "randomPersonRadio", "randomNumbers");
        createTitles(panel, "Pick a Random Person");

        contentDiv = document.createElement("div");
        contentDiv.className = "content";
        createTexts(contentDiv, "Your randomly picked person:");

        let output = createOutputs(contentDiv, "input", "randomPersonResult");
        output.style.width = "215px";
        panel.appendChild(contentDiv);

        createSubmitButtons(panel, submitRandomNumber);
    }
}

function submitRandomNumber() {

    if(mainPage.contains(document.getElementById("advertisement")))
            mainPage.removeChild(document.getElementById("advertisement"));

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

    if (mainPage.contains(document.getElementById("sequenceGeneratorPanel"))) {
        document.getElementById("sequenceGeneratorPanel").classList.add("disappear");

        setTimeout(function () {
            mainPage.removeChild(document.getElementById("sequenceGeneratorPanel"));
        }, 500);

    } else {

        verifyExistence();

        let panel = createPanels("sequenceGeneratorPanel");
        createTitles(panel, "Number Sequence Generator");

        contentDiv = document.createElement("div");
        contentDiv.className = "content";

        createTexts(contentDiv, "Select the number of numbers: ");
        let inputNumber = createInputs(contentDiv, "number", "sequenceNumber");
        inputNumber.min = "0";
        inputNumber.max = "10000000";

        createBrakes(contentDiv);
        createTexts(contentDiv, "Generate numbers between: ");
        createInputs(contentDiv, "number", "minimNumber");
        createTexts(contentDiv, " and ");
        createInputs(contentDiv, "number", "maximNumber");
        createBrakes(contentDiv);
        createTexts(contentDiv, "Select the distribution: ");

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

        createTexts(contentDiv, "Select the maximum frequency: ");

        let inputFrequency = document.createElement("input");
        inputFrequency.type = "number";
        inputFrequency.className = "number_input";
        inputFrequency.id = "frequencyNumber";
        inputFrequency.min = "1";
        inputFrequency.max = "10000000";
        inputFrequency.style.width = "95px";
        contentDiv.appendChild(inputFrequency);

        createBrakes(contentDiv);
        createTexts(contentDiv, "Your sequence: ");
        createBrakes(contentDiv);
        let output = createOutputs(contentDiv, "textarea", "inputSequenceResult");
        output.style.width = "100%";
        output.style.height = "100px";
        output.style.overflowY = "scroll";
        output.style.resize = "none";

        panel.appendChild(contentDiv);
        createSubmitButtons(panel, submitSequence);
    }
}

function submitSequence() {

    if(mainPage.contains(document.getElementById("advertisement")))
        mainPage.removeChild(document.getElementById("advertisement"));

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
                if(xhrSequence.responseText === "invalid input")
                    createAdvertisement("invalid input");
                    else document.getElementById("inputSequenceResult").value = xhrSequence.responseText;
            }
    };
    xhrSequence.send(null);
}

function managePrimeNumbersPanel() {

    if (mainPage.contains(document.getElementById("nthPrimeNumbersPanel"))) {
        document.getElementById("nthPrimeNumbersPanel").classList.add("disappear");
        document.getElementById("primeNumbersPanel").classList.add("disappear");

        setTimeout(function () {
            mainPage.removeChild(document.getElementById("nthPrimeNumbersPanel"));
            mainPage.removeChild(document.getElementById("primeNumbersPanel"));
        }, 500);

    } else {
        verifyExistence();

        let panel = createPanels("nthPrimeNumbersPanel");
        createRadioInputs(panel, "nthPrimeNumbers", "primeNumbers");
        createTitles(panel, "N-th Prime Number");

        let contentDiv = document.createElement("div");
        contentDiv.className = "content";

        createTexts(contentDiv, "Select N: ");
        let inputNumber = createInputs(contentDiv, "number",  "primeNumber");
        inputNumber.min = "0";

        createBrakes(contentDiv);
        createTexts(contentDiv, "Your N-th prime number is: ");
        createOutputs(contentDiv, "input", "inputPrimeNumbersResult");
        panel.appendChild(contentDiv);

        createSubmitButtons(panel, submitPrimeNumber);

        panel = createPanels("primeNumbersPanel");

        createRadioInputs(panel, "nPrimeNumbers", "primeNumbers");
        createTitles(panel, "First N Prime Numbers");

        contentDiv = document.createElement("div");
        contentDiv.className = "content";
        createTexts(contentDiv, "Select N: ");

        inputNumber = createInputs(contentDiv, "number", "nPrimeNumber");
        inputNumber.min = "0";

        createBrakes(contentDiv);
        createTexts(contentDiv, "Your first N prime numbers: ");
        createBrakes(contentDiv);

        let output = createOutputs(contentDiv, "textarea", "inputNPrimeNumbersResult");
        output.style.width = "334px";
        output.style.height = "100px";
        output.style.overflowY = "scroll";
        output.style.resize = "none";

        panel.appendChild(contentDiv);

        createSubmitButtons(panel, submitPrimeNumber);
    }
}

function submitPrimeNumber() {

    if(mainPage.contains(document.getElementById("advertisement")))
            mainPage.removeChild(document.getElementById("advertisement"));

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

    if (mainPage.contains(document.getElementById("arabToRomanPanel"))) {
        document.getElementById("arabToRomanPanel").classList.add("disappear");
        document.getElementById("romanToArabPanel").classList.add("disappear");

        setTimeout(function () {
            mainPage.removeChild(document.getElementById("arabToRomanPanel"));
            mainPage.removeChild(document.getElementById("romanToArabPanel"));
        }, 500);

    } else {

        verifyExistence();

        let panel = createPanels("arabToRomanPanel");

        createRadioInputs(panel, "arabNumbers", "romanArabNumbers");
        createTitles(panel, "Arab - Roman Converter");

        let contentDiv = document.createElement("div");
        contentDiv.className = "content";
        createTexts(contentDiv, "Select number: ");

        let inputNumber = createInputs(contentDiv, "number", "arabNumber");
        inputNumber.min = "-5000";
        inputNumber.max = "5000";

        createBrakes(contentDiv);
        createTexts(contentDiv, "Your roman number: ");
        createOutputs(contentDiv, "input", "inputArabNumberResult");
        panel.appendChild(contentDiv);

        createSubmitButtons(panel, submitRomanNumber);

        panel = createPanels("romanToArabPanel");

        createRadioInputs(panel, "romanNumbers", "romanArabNumbers");
        createTitles(panel, "Roman - Arab Converter");

        contentDiv = document.createElement("div");
        contentDiv.className = "content";
        createTexts(contentDiv, "Write number: ");
        createInputs(contentDiv, "text", "romanNumber");
        createBrakes(contentDiv);
        createTexts(contentDiv, "Your arab number: ");
        createOutputs(contentDiv, "input", "inputRomanNumberResult");
        panel.appendChild(contentDiv);

        createSubmitButtons(panel, submitRomanNumber);
    }
}

function submitRomanNumber() {

    if(mainPage.contains(document.getElementById("advertisement")))
            mainPage.removeChild(document.getElementById("advertisement"));

    let number, id, path;

    const xhrRomanNumber = new XMLHttpRequest();
    if (mainPage.contains(document.getElementById("advertisement")))
        mainPage.removeChild(document.getElementById("advertisement"));

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
        const DONE = 4; // readyState 4 means the request is done.
        const OK = 200; // status 200 is a successful return.

        if (xhrRomanNumber.readyState === DONE)
            if (xhrRomanNumber.status === OK) {
                if (xhrRomanNumber.responseText === 0) createAdvertisement("invalid roman input");
                else document.getElementById(id).value = xhrRomanNumber.responseText;
            }
    };
    xhrRomanNumber.send(null);
}

function manageBinaryNumbersPanel(){
    if (mainPage.contains(document.getElementById("binaryNumbersPanel"))) {
        document.getElementById("binaryNumbersPanel").classList.add("disappear");

        setTimeout(function () {
            mainPage.removeChild(document.getElementById("binaryNumbersPanel"));
        }, 500);

    } else {

        verifyExistence();

        let convertTypes = ["Binary", "Octal", "Decimal", "Hexadecimal"];

        let panel = createPanels("binaryNumbersPanel");

       // createRadioInputs(panel, "arabNumbers", "romanArabNumbers");
        createTitles(panel, "Binary Converter");

        let contentDiv = document.createElement("div");
        contentDiv.className = "content";
        createTexts(contentDiv, "Type number: ");
        createInputs(contentDiv, "text", "binaryNumberInput");
        createBrakes(contentDiv);

        createTexts(contentDiv, "Select your number base: ");
        createDropdownList(contentDiv, convertTypes, "primaryBaseNumberInput");
        createBrakes(contentDiv);

        createTexts(contentDiv, "In what base do you want to convert your number? ");
        createDropdownList(contentDiv, convertTypes, "finalBaseNumberInput");
        createBrakes(contentDiv);

        createTexts(contentDiv, "Your converted number: ");
        createOutputs(contentDiv, "input", "inputBinaryNumbersResult");
        panel.appendChild(contentDiv);

        createSubmitButtons(panel, submitBinaryNumber);
    }
}

function submitBinaryNumber(){
    if(mainPage.contains(document.getElementById("advertisement")))
        mainPage.removeChild(document.getElementById("advertisement"));

    var xhrBinaryNumbers = new XMLHttpRequest();
    if (mainPage.contains(document.getElementById("advertisement")))
        mainPage.removeChild(document.getElementById("advertisement"));

    var inputNumber = document.getElementById("binaryNumberInput").value;
    var primaryBase = document.getElementById("primaryBaseNumberInput").value;
    var finalBase = document.getElementById("finalBaseNumberInput").value;

    if(!inputNumber){
        createAdvertisement("type number");
        return;
    }
    if(!primaryBase || !finalBase){
        createAdvertisement("invalid base");
        return;
    }

    xhrBinaryNumbers.open('POST', "/algorithms/binaryConverter?number=" + inputNumber + '&primaryBase=' + primaryBase + '&finalBase=' + finalBase);
    xhrBinaryNumbers.setRequestHeader("Content-Type", "application/json");

    // Track the state changes of the request.
    xhrBinaryNumbers.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.

        if (xhrBinaryNumbers.readyState === DONE)
            if (xhrBinaryNumbers.status === OK) {
                if (xhrBinaryNumbers.responseText === 0) createAdvertisement("error");
                else document.getElementById("inputBinaryNumbersResult").value = xhrBinaryNumbers.responseText;
            }
    };
    xhrBinaryNumbers.send(null);
}

function manageNumberSorter(){
}

function manageSort() {
    if (mainPage.contains(document.getElementById("sortPanel")) && mainPage.contains(document.getElementById("resultPanel"))) {
        document.getElementById("sortPanel").classList.add("disappear");
        document.getElementById("resultPanel").classList.add("disappear");

        setTimeout(function () {
            mainPage.removeChild(document.getElementById("sortPanel"));
            mainPage.removeChild(document.getElementById("resultPanel"));
        }, 500);


    }else if(mainPage.contains(document.getElementById("sortPanel"))){
        document.getElementById("sortPanel").classList.add("disappear");

        setTimeout(function () {
            mainPage.removeChild(document.getElementById("sortPanel"));
        }, 500);
    }
    else {
        verifyExistence();

        let panel = createPanels("sortPanel");
        createTitles(panel, "Sorting");

        let contentDiv = document.createElement("div");
        contentDiv.className = "content";

        createTexts(contentDiv, "Generate sets: ");
        let sortInput = createInputs(contentDiv, "number", "setNumber");
        sortInput.min = 1;
        panel.appendChild(contentDiv);

        createSubmitButtons(panel, submitSort);
     }
}

function submitSort(){
    if(mainPage.contains(document.getElementById("advertisement")))
        mainPage.removeChild(document.getElementById("advertisement"));

    var number = document.getElementById("setNumber").value;

    if(!number){
        createAdvertisement("number");
        return;
    }

    if(mainPage.contains(document.getElementById("resultPanel")))
        mainPage.removeChild(document.getElementById("resultPanel"));

    createSortCanvases();

    var xhrSort = new XMLHttpRequest();
    xhrSort.open('GET', '/sort/' + number);
    xhrSort.setRequestHeader("Content-Type", "application/json");

    xhrSort.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.

        if (xhrSort.readyState === DONE)
            if (xhrSort.status === OK) {
                if(xhrSort.responseText === "invalid input")
                    createAdvertisement("invalid input");
                    else{
                        const response = JSON.parse(xhrSort.responseText);
                        console.log(response);

                        const values = [];
                        const sampleSizes = [];
                        let dataSets = [];

                        for(const i in response){
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

function createResultSets(resultPanel, stringId){
    let resultSet = document.createElement("div");
    resultSet.id = stringId;
    resultSet.className = "result_set";
    resultPanel.appendChild(resultSet);
    return resultSet;
}

function createResultDivs(resultSet, stringId){
    let resultDiv = document.createElement("canvas");
    resultDiv.id = stringId;
    resultSet.appendChild(resultDiv);
    return resultDiv;
}

function createSortCanvases(){
    let resultPanel = createResultPanels();

    let randomResultSet = createResultSets(resultPanel, "randomResultSet");
    let nearlySortedResultSet = createResultSets(resultPanel, "nearlySortedResultSet");
    let reversedResultSet = createResultSets(resultPanel, "reversedResultSet");

    let randomResultDiv = createResultDivs(randomResultSet, "randomSortChart");
    let nearlySortedResultDiv = createResultDivs(nearlySortedResultSet, "nearlySortedSortChart");
    let reversedResultDiv = createResultDivs(reversedResultSet, "reversedSortChart");
}

function manageMatrix(){
    if (mainPage.contains(document.getElementById("matrixPanel")) && mainPage.contains(document.getElementById("resultPanel"))) {
        document.getElementById("matrixPanel").classList.add("disappear");
        document.getElementById("resultPanel").classList.add("disappear");

        setTimeout(function () {
            mainPage.removeChild(document.getElementById("matrixPanel"));
            mainPage.removeChild(document.getElementById("resultPanel"));
        }, 500);


    }else if(mainPage.contains(document.getElementById("matrixPanel"))){
        document.getElementById("matrixPanel").classList.add("disappear");

        setTimeout(function () {
            mainPage.removeChild(document.getElementById("matrixPanel"));
        }, 500);
    }
    else {
        verifyExistence();

        let panel = createPanels("matrixPanel");
        createTitles(panel, "Matrix Product");

        let contentDiv = document.createElement("div");
        contentDiv.className = "content";

        createTexts(contentDiv, "Generate sets: ");
        let matrixInput = createInputs(contentDiv, "number", "setNumber");
        matrixInput.min = 1;
        panel.appendChild(contentDiv);

        createSubmitButtons(panel, submitMatrixProduct);
     }
}

function submitMatrixProduct(){
    if(mainPage.contains(document.getElementById("advertisement")))
        mainPage.removeChild(document.getElementById("advertisement"));

    var number = document.getElementById("setNumber").value;

    if(!number){
        createAdvertisement("number");
        return;
    }

    if(mainPage.contains(document.getElementById("resultPanel")))
        mainPage.removeChild(document.getElementById("resultPanel"));

    createMatrixCanvases();

    var xhrSort = new XMLHttpRequest();
    xhrSort.open('GET', '/matrix/' + number);
    xhrSort.setRequestHeader("Content-Type", "application/json");

    xhrSort.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.

        if (xhrSort.readyState === DONE)
            if (xhrSort.status === OK) {
                if(xhrSort.responseText === "invalid input")
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
    let resultPanel = createResultPanels();

    let resultSet = createResultSets(resultPanel, "resultSet");
    resultSet.style.height = "98%";

    let resultDiv = createResultDivs(resultSet, "matrixChart");
}

function verifyExistence() {
    var main = mainPage;

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
    if (main.contains(document.getElementById("binaryNumbersPanel")))
        main.removeChild(document.getElementById("binaryNumbersPanel"));
    if (main.contains(document.getElementById("sortPanel"))){
        main.removeChild(document.getElementById("sortPanel"));
        if(mainPage.contains(document.getElementById("resultPanel")))
            mainPage.removeChild(document.getElementById("resultPanel"));
    }
    if (main.contains(document.getElementById("matrixPanel"))){
        main.removeChild(document.getElementById("matrixPanel"));
        if(mainPage.contains(document.getElementById("resultPanel")))
            mainPage.removeChild(document.getElementById("resultPanel"));
    }

}

