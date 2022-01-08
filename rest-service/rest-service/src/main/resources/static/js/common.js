function createAdvertisement(message) {
    let advertisement = document.createElement('div');
    advertisement.id = "advertisement";
    advertisement.className = "advertisement";



    let title = document.createElement("span");
    title.innerHTML = "Alert!";
    advertisement.appendChild(title);

    let closeDiv = document.createElement("img");
    closeDiv.src = "/images/menuIcons/black/close_icon.png"
    closeDiv.className = "close_button";
    advertisement.appendChild(closeDiv);

    createBrakes(advertisement);

    let text;
    if (message == "user exist")
        text = document.createTextNode("An user with this email is already registered. Please log in to continue.");
    else if (message == "user doesn't exist")
        text = document.createTextNode("No user exists with this email. Please register.");
    else if (message == "wrong password")
        text = document.createTextNode("Wrong password. Please try again.");
    else if (message == "not checked")
        text = "Please select a method by clicking the check circle located at the top-left corner of each method.";
    else if (message == "invalid roman input")
        text = "Please write a valid roman number.";
    else if (message == "invalid input")
        text = "Invalid input. <br> << frequency * ( maxim - minim + 1) >= number of numbers >>"
    else if (message == "minim greater then maxim")
        text = "Invalid input. <br> << " + message + " >>";
    else text = "You need to choose a " + message + ".";

    let textSpan = document.createElement("span");
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

function createBrakes(contentDiv){
    let brake = document.createElement("br");
    contentDiv.appendChild(brake);
}