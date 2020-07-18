window.onload = function () {
    createRegistration();
}

function createRegistration(){

    if(document.body.contains(document.getElementById("title_span"))){
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
    panel.style.height = "315px";

    document.body.appendChild(panel);

    createFields("firstname");
    createFields("lastname");
    createFields("password");
    createFields("email");
    createFields("address");

    document.getElementById("label_firstname").style.top = "8px";
    document.getElementById("label_lastname").style.top = "60px";
    document.getElementById("label_password").style.top = "112px";
    document.getElementById("label_email").style.top = "164px";
    document.getElementById("label_address").style.top = "216px";

    document.getElementById("firstname").style.top = "30px";
    document.getElementById("lastname").style.top = "82px";
    document.getElementById("password").style.top = "134px";
    document.getElementById("email").style.top = "186px";
    document.getElementById("address").style.top = "238px";

    let submitButton = document.createElement("button");
    submitButton.className = "submit_button";
    submitButton.style.top ="275px";
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

function createFields(elem){

    var panel = document.getElementById("user_form");

    let label = document.createElement("label");
    label.setAttribute("for",elem);
    label.id = "label_" + elem;
    label.innerHTML = elem.charAt(0).toUpperCase() + elem.slice(1) + ":";
    panel.appendChild(label);

    let input = document.createElement("input");

    if(elem == "password") input.type = "password";
    else input.type = "text";

    if(elem == "address") input.setAttribute("maxlength",200);
    else input.setAttribute("maxlength",50);

    input.name = elem;
    input.id = elem;
    input.placeholder = "type your " + elem + " here...";
    panel.appendChild(input);
}

function registerUser(){
     if(document.body.contains(document.getElementById("advertisement")))
                document.body.removeChild(document.getElementById("advertisement"));

        var firstname = document.getElementById("firstname").value;
        var lastname = document.getElementById("lastname").value;
        var password = document.getElementById("password").value;
        var email = document.getElementById("email").value;
        var address = document.getElementById("address").value;
        //window.location.replace("dashboard.html");
        if(firstname == "") {
            createAdvertisement("firstname", 1);
        }
        else if(lastname == "") {
            createAdvertisement("lastname", 1);
        }
        else if(password == "") {
            createAdvertisement("password", 1);
        }
        else if(email == "") {
            createAdvertisement("email", 1);
        }
        else if(address == "") {
            createAdvertisement("address", 1);
        }
        else {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', '/user/');
                xhr.setRequestHeader("Content-Type", "application/json");
                // Track the state changes of the request.
                xhr.onreadystatechange = function () {
                    var DONE = 4; // readyState 4 means the request is done.
                    var OK = 200; // status 200 is a successful return.

                    if (xhr.readyState === DONE) {
                        if (xhr.status === OK) {

                            let jsonResult = JSON.parse(xhr.responseText);
                            //refreshing the input form
                            document.getElementById("firstname").value = '';
                            document.getElementById("lastname").value = '';
                            document.getElementById("password").value = '';
                            document.getElementById("email").value = '';
                            document.getElementById("billing_address").value = '';
                            document.getElementById("shipping_address").value = '';

                            getAll();
                            console.log(xhr.responseText); // 'This is the output.'
                        } else {
                            console.log('Error: ' + xhr.status); // An error occurred during the request.
                        }
                    }
                };

                xhr.send(JSON.stringify({firstname: firstname, lastname: lastname, password: password, email: email, billingAddress: billingAddress, shippingAddress: shippingAddress}))
            }
}

function createAdvertisement(message, type){
    let advertisement = document.createElement('div');
    advertisement.id = "advertisement";
    advertisement.className = "advertisement";

    let title = document.createTextNode("Alert!")
    let titleSpan = document.createElement("span");
    titleSpan.className = "title_span";
    titleSpan.appendChild(title);


    let text = document.createTextNode("To proceed, please type your " + message +".");
    let textSpan = document.createElement("span");
    textSpan.className = "text_span";
    textSpan.appendChild(text);

    let close = document.createTextNode("x");
    let closeDiv = document.createElement("div");
    closeDiv.className = "close_div";

    if(type == 1)
        advertisement.style.top = "430px";
    else advertisement.style.top = "275px";
    closeDiv.appendChild(close);

    advertisement.appendChild(titleSpan);
    advertisement.appendChild(textSpan);
    advertisement.appendChild(closeDiv);
    document.body.appendChild(advertisement);

    advertisement.classList.add("appear");

    closeDiv.addEventListener("click", function (){
        closeDiv.removeAttribute("click");
        advertisement.classList.add("disappear");
        setTimeout(function(){  document.body.removeChild(advertisement); }, 600);
    });
}

function createSignIn(){

        if(document.body.contains(document.getElementById("title_span"))){
            document.body.removeChild(document.getElementById("title_span"))
            document.body.removeChild(document.getElementById("user_form"));
        }

        let title = document.createTextNode("Sign in");
        let titleSpan = document.createElement("h1");

        titleSpan.appendChild(title);
        titleSpan.className = "register_title";
        titleSpan.style.marginLeft = "-40px";
        titleSpan.id = "title_span"

        document.body.appendChild(titleSpan);

        let panel = document.createElement("div");
        panel.id = "user_form"
        panel.className = "user_form";
        panel.style.height = "159px";

        document.body.appendChild(panel);

        createFields("email");
        createFields("password");

        document.getElementById("label_email").style.top = "8px";
        document.getElementById("label_password").style.top = "60px";

        document.getElementById("email").style.top = "30px";
        document.getElementById("password").style.top = "82px";

        let submitButton = document.createElement("button");
        submitButton.className = "submit_button";
        submitButton.style.top = "119px"
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

function loginUser(){

    if(document.body.contains(document.getElementById("advertisement")))
            document.body.removeChild(document.getElementById("advertisement"));

            var password = document.getElementById("password").value;
            var email = document.getElementById("email").value;

            if(email == "") {
                createAdvertisement("email", 2);
            }
            else if(password == "") {
                createAdvertisement("address", 2);
            }
            else window.location.replace("dashboard.html");
}