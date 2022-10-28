window.onload = function () {
    createLoginForm()
}

function createLoginForm(){
    let form = document.createElement("form");
    form.className = "user_form";

    let title = document.createElement("h1");
    title.innerHTML = "Login";
    form.appendChild(title);

    createFormInput(form, "email", "email");
    createBrakes(form);
    createFormInput(form, "password", "password");
    createBrakes(form);

    let label = document.createElement("label");
    label.className = "form-control";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    label.appendChild(checkbox);

    let span = document.createElement("span");
    span.style.fontSize = "21px";
    span.innerHTML = "Remember me";

    let forgotPasswordLink = document.createElement("a");
    forgotPasswordLink.href="#ForgotPassword";
    forgotPasswordLink.style.float = "right";
    forgotPasswordLink.innerHTML = "Forgot Password?";

    span.appendChild(forgotPasswordLink);
    label.appendChild(span);
    form.appendChild(label);

    let submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.value = "Login";
    submitButton.className = "custom_button";

    form.appendChild(submitButton);
    createBrakes(form);

    span = document.createElement("span");
    span.style.fontSize = "21px";
    span.style.color = "#EEEEEEFF"
    span.innerHTML = "Not registered yet?";

    let createAccountLink = document.createElement("a");
    createAccountLink.href = "#createAccount";
    createAccountLink.innerHTML = " Create an Account";

    span.appendChild(createAccountLink);
    form.appendChild(span);

    document.body.appendChild(form);
}

function createRegisterForm(){

}

function createFormInput(panel, forString, inputType){
    let forStringC = forString.toUpperCase()[0] + forString.substring(1);

    let label = document.createElement("label");
    label.setAttribute("for", forString);
    label.innerHTML = forStringC;

    createBrakes(label);

    let input = document.createElement("input");
    input.id = forString;
    input.name = forStringC;
    input.type = inputType;

    label.appendChild(input);
    panel.appendChild(label);
}

function createRegistration() {

    if (document.body.contains(document.getElementById("title_span"))) {
        document.body.removeChild(document.getElementById("title_span"))
        document.body.removeChild(document.getElementById("user_form"));
    }

    let title = document.createTextNode("Register");
    let titleSpan = document.createElement("h1");

    titleSpan.appendChild(title);
    titleSpan.className = "register_title";
    titleSpan.id = "title_span"

    document.body.appendChild(titleSpan);

    let panel = document.createElement("div");
    panel.id = "user_form"
    panel.className = "user_form";

    document.body.appendChild(panel);

    createFields("firstname");
    createFields("lastname");
    createFields("password");
    createFields("email");
    createFields("address");

    let submitButton = document.createElement("button");
    submitButton.className = "submit_button";
    submitButton.innerHTML = "Create account";
    submitButton.addEventListener("click", registerUser);
    panel.appendChild(submitButton);

    let message = document.createTextNode("Already have an account? ");
    let link = document.createElement("a");
    link.href = "#";
    link.innerHTML = "Sign in";
    link.addEventListener("click", createSignIn);

    let messageDiv = document.createElement("div");
    messageDiv.className = "message";
    messageDiv.appendChild(message);
    messageDiv.appendChild(link);

    panel.appendChild(messageDiv);
}

function createFields(elem) {

    var panel = document.getElementById("user_form");

    let label = document.createElement("label");
    label.setAttribute("for", elem);
    label.id = "label_" + elem;
    label.innerHTML = elem.charAt(0).toUpperCase() + elem.slice(1) + ":";
    panel.appendChild(label);

    let input = document.createElement("input");

    if (elem == "password") input.type = "password";
    else input.type = "text";

    if (elem == "address") input.setAttribute("maxlength", 200);
    else input.setAttribute("maxlength", 50);

    input.name = elem;
    input.id = elem;
    input.placeholder = "type your " + elem + " here...";
    panel.appendChild(input);
}

function registerUser() {
    if (document.body.contains(document.getElementById("advertisement")))
        document.body.removeChild(document.getElementById("advertisement"));

    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;

    if (firstname == "") {
        createAdvertisement("firstname", 1);
    } else if (lastname == "") {
        createAdvertisement("lastname", 1);
    } else if (password == "") {
        createAdvertisement("password", 1);
    } else if (email == "") {
        createAdvertisement("email", 1);
    } else if (address == "") {
        createAdvertisement("address", 1);
    } else {
        var xhrUser = new XMLHttpRequest();
        xhrUser.open('POST', '/user/');
        xhrUser.setRequestHeader("Content-Type", "application/json");
        // Track the state changes of the request.
        xhrUser.onreadystatechange = function () {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.

            if (xhrUser.readyState === DONE) {
                if (xhrUser.status === OK) {

                    let jsonResult = JSON.parse(xhrUser.responseText);
                    //refreshing the input form
                    document.getElementById("firstname").value = '';
                    document.getElementById("lastname").value = '';
                    document.getElementById("password").value = '';
                    document.getElementById("email").value = '';
                    document.getElementById("address").value = '';

                    if (jsonResult.firstname == null)
                        createAdvertisement("user exist", 1);
                    else window.location.replace("dashboard.html");

                    console.log(xhrUser.responseText); // 'This is the output.'
                } else {
                    console.log('Error: ' + xhrUser.status); // An error occurred during the request.
                }
            }
        };

        xhrUser.send(JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            password: password,
            email: email,
            address: address
        }));
    }
}

function createSignIn() {

    if (document.body.contains(document.getElementById("title_span"))) {
        document.body.removeChild(document.getElementById("title_span"))
        document.body.removeChild(document.getElementById("user_form"));
    }

    let title = document.createTextNode("Sign in");
    let titleSpan = document.createElement("h1");

    titleSpan.appendChild(title);
    titleSpan.className = "register_title";
    titleSpan.id = "title_span"

    document.body.appendChild(titleSpan);

    let panel = document.createElement("div");
    panel.id = "user_form"
    panel.className = "user_form";

    document.body.appendChild(panel);

    createFields("email");
    createFields("password");

    let submitButton = document.createElement("button");
    submitButton.className = "submit_button";
    submitButton.innerHTML = "Login";
    submitButton.addEventListener("click", loginUser);
    panel.appendChild(submitButton);

    let message = document.createTextNode("Don't have an account? ");
    let link = document.createElement("a");
    link.href = "#";
    link.innerHTML = "Register";
    link.addEventListener("click", createRegistration);

    let messageDiv = document.createElement("div");
    messageDiv.className = "message";
    messageDiv.appendChild(message);
    messageDiv.appendChild(link);

    panel.appendChild(messageDiv);
}

function loginUser() {

    if (document.body.contains(document.getElementById("advertisement")))
        document.body.removeChild(document.getElementById("advertisement"));

    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;

    if (email == "") {
        createAdvertisement("email", 2);
    } else if (password == "") {
        createAdvertisement("password", 2);
    } else {

        var xhrUser = new XMLHttpRequest();
        xhrUser.open('POST', '/user/connect/');
        xhrUser.setRequestHeader("Content-Type", "application/json");
        // Track the state changes of the request.
        xhrUser.onreadystatechange = function () {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.

            if (xhrUser.readyState === DONE) {
                if (xhrUser.status === OK) {

                    let jsonResult = JSON.parse(xhrUser.responseText);
                    //refreshing the input form

                    document.getElementById("password").value = '';
                    document.getElementById("email").value = '';

                    if (jsonResult == 0) createAdvertisement("user doesn't exist", 2);
                    else if (jsonResult == 2) createAdvertisement("wrong password", 2);
                    else window.location.replace("dashboard.html");

                    console.log(xhrUser.responseText); // 'This is the output.'
                } else {
                    console.log('Error: ' + xhrUser.status); // An error occurred during the request.
                }
            }
        };

        xhrUser.send(JSON.stringify({
            password: password,
            email: email,
        }));
    }
}