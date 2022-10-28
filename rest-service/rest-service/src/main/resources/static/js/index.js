window.onload = function () {
    createLoginForm()
}

function createLoginForm() {
    if (document.body.contains(document.getElementById("register_form")))
        document.body.removeChild(document.getElementById("register_form"));

    let form = document.createElement("form");
    form.id = "login_form";
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
    forgotPasswordLink.href = "#ForgotPassword";
    forgotPasswordLink.style.float = "right";
    forgotPasswordLink.innerHTML = "Forgot Password?";

    span.appendChild(forgotPasswordLink);
    label.appendChild(span);
    form.appendChild(label);

    let submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.value = "Login";
    submitButton.className = "custom_button";
    submitButton.addEventListener("click", loginUser);

    form.appendChild(submitButton);
    createBrakes(form);

    span = document.createElement("span");
    span.style.fontSize = "21px";
    span.style.color = "#EEEEEEFF"
    span.innerHTML = "Not registered yet?";

    let createAccountLink = document.createElement("a");
    createAccountLink.href = "#createAccount";
    createAccountLink.innerHTML = " Create an Account";
    createAccountLink.addEventListener("click", createRegisterForm);

    span.appendChild(createAccountLink);
    form.appendChild(span);

    document.body.appendChild(form);
}

function createRegisterForm() {
    if (document.body.contains(document.getElementById("login_form")))
        document.body.removeChild(document.getElementById("login_form"));

    let form = document.createElement("form");
    form.id = "register_form";
    form.className = "user_form";

    let title = document.createElement("h1");
    title.innerHTML = "Register";
    form.appendChild(title);

    createFormInput(form, "firstname", "text");
    createBrakes(form);
    createFormInput(form, "lastname", "text");
    createBrakes(form);

    createFormInput(form, "email", "email");
    createBrakes(form);
    createFormInput(form, "password", "password");
    createBrakes(form);
    createFormInput(form, "address", "text");
    createBrakes(form);

    let submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.value = "Register";
    submitButton.className = "custom_button";
    submitButton.addEventListener("click", registerUser);

    form.appendChild(submitButton);
    createBrakes(form);

    let span = document.createElement("span");
    span.style.fontSize = "21px";
    span.style.color = "#EEEEEEFF"
    span.innerHTML = "Already have an Account?";

    let loginLink = document.createElement("a");
    loginLink.href = "#login";
    loginLink.innerHTML = " Login";
    loginLink.addEventListener("click", createLoginForm);

    span.appendChild(loginLink);
    form.appendChild(span);

    document.body.appendChild(form);
}

function createFormInput(panel, forString, inputType) {
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

function registerUser() {
    if (document.body.contains(document.getElementById("advertisement")))
        document.body.removeChild(document.getElementById("advertisement"));

    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;

    if (firstname === "") {
        createAdvertisement("firstname", 1);
    } else if (lastname === "") {
        createAdvertisement("lastname", 1);
    } else if (password === "") {
        createAdvertisement("password", 1);
    } else if (email === "") {
        createAdvertisement("email", 1);
    } else if (address === "") {
        createAdvertisement("address", 1);
    } else {
        let xhrUser = new XMLHttpRequest();
        xhrUser.open('POST', '/user/');
        xhrUser.setRequestHeader("Content-Type", "application/json");
        // Track the state changes of the request.
        xhrUser.onreadystatechange = function () {
            const DONE = 4; // readyState 4 means the request is done.
            const OK = 200; // status 200 is a successful return.

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

function loginUser() {

    if (document.body.contains(document.getElementById("advertisement")))
        document.body.removeChild(document.getElementById("advertisement"));

    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;

    if (email === "") {
        createAdvertisement("email", 2);
    } else if (password === "") {
        createAdvertisement("password", 2);
    } else {
        let xhrUser = new XMLHttpRequest();
        xhrUser.open('POST', '/user/connect/');
        xhrUser.setRequestHeader("Content-Type", "application/json");
        // Track the state changes of the request.
        xhrUser.onreadystatechange = function () {
            const DONE = 4; // readyState 4 means the request is done.
            const OK = 200; // status 200 is a successful return.

            if (xhrUser.readyState === DONE) {
                if (xhrUser.status === OK) {

                    let jsonResult = JSON.parse(xhrUser.responseText);
                    //refreshing the input form

                    document.getElementById("password").value = '';
                    document.getElementById("email").value = '';

                    if (jsonResult === 0) createAdvertisement("user doesn't exist", 2);
                    else if (jsonResult === 2) createAdvertisement("wrong password", 2);
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