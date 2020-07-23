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
}window.onload = function () {

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