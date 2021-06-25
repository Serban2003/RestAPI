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

function createPanels(stringId){
    let panel = document.createElement("div");
    panel.id = stringId;
    panel.className = "panel";
    document.body.appendChild(panel);
    return panel;
}

function createResultPanels(stringId){
    let resultPanel = document.createElement("div");
    resultPanel.id = "resultPanel";
    resultPanel.className = "result_panel";
    document.body.appendChild(resultPanel);
    return resultPanel;
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

function createMenuButton(menu, stringId, eventName, name){
    let button = document.createElement("button");
    button.id = stringId;
    button.className = "custom_button";
    button.innerHTML = name;
    button.addEventListener("click", eventName);
    menu.appendChild(button);
}

function createButtons(menu) {
    createMenuButton(menu, "randomNumberButton", manageRandomNumberPanel, "Random Number Generator");
    createMenuButton(menu, "sequenceGeneratorButton", manageSequenceGenerator, "Number Sequence Generator");
    createMenuButton(menu, "primeNumbersButton", managePrimeNumbersPanel, "Prime Numbers");
    createMenuButton(menu, "romanNumberButton", manageRomanNumberPanel, "Roman Numbers");
    createMenuButton(menu, "numberSorterButton",  manageNumberSorter, "Number Sorter");
    createMenuButton(menu, "sortButton",  manageSortButton, "Sorting");
    createMenuButton(menu, "matrixButton",  manageMatrixButton, "Matrix");
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

function createRadioInputs(panel, stringId, name){
    let radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.id = stringId;
    radioInput.name = name;
    radioInput.className = "check";
    panel.appendChild(radioInput);
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

function createBrakes(contentDiv){
    let brake = document.createElement("br");
    contentDiv.appendChild(brake);
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

        let panel = createPanels("randomNumberPanel");
        createRadioInputs(panel, "randomNumberRadio", "randomNumbers");
        createTitles(panel, "Random Number Generator");

        let contentDiv = document.createElement("div");
        contentDiv.className = "content";

        createTexts(contentDiv, "Generate number between: ");
        createInputs(contentDiv, "number", "randomNumber1")
        createTexts(contentDiv, " and ");
        createInputs(contentDiv, "number", "randomNumber2")
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

        let panel = createPanels("sequenceGeneratorPanel");
        panel.style.width = "510px"
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

        let output = createOutputs(contentDiv, "textarea", "inputSequenceResult");
        output.style.width = "474px";
        output.style.height = "100px";
        output.style.overflowY = "scroll";
        output.style.resize = "none";

        panel.appendChild(contentDiv);

        createSubmitButtons(panel, submitSequence);
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
        panel.style.width = "370px"

        createRadioInputs(panel, "nPrimeNumbers", "primeNumbers");
        createTitles(panel, "First N Prime Numbers");

        contentDiv = document.createElement("div");
        contentDiv.className = "content";
        createTexts(contentDiv, "Select N: ");

        inputNumber = createInputs(contentDiv, "number", "nPrimeNumber");
        inputNumber.min = "0";

        createBrakes(contentDiv);
        createTexts(contentDiv, "Your first N prime numbers: ");

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

        let panel = createPanels("arabToRomanPanel");
        panel.style.width = "370px"

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
        panel.style.width = "370px"

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
    let resultPanel = createResultPanels();

    let resultSet = createResultSets(resultPanel, "resultSet");
    resultSet.style.height = "98%";

    let resultDiv = createResultDivs(resultSet, "matrixChart");
}

function createAdvertisement(message) {
    let advertisement = document.createElement('div');
    advertisement.id = "advertisement";
    advertisement.className = "advertisement";

    let closeDiv = document.createElement("img");
    closeDiv.src = "/images/close_button.png"
    closeDiv.className = "close_button";
    advertisement.appendChild(closeDiv);

    let title = document.createElement("span");
    title.innerHTML = "Alert!";
    title.className = "title_span";
    advertisement.appendChild(title);

    createBrakes(advertisement);

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

    advertisement.appendChild(textSpan);
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

