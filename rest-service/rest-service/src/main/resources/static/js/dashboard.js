window.onload = function() {

    var menuIcon = document.getElementById('menu_icon');
    var menu = document.getElementById('menu');

    menuIcon.addEventListener("click", function(){
        if(menu.classList.contains("menu_expanded")){
            menu.classList.remove("menu_expanded");
            menuIcon.classList.remove("transition_in");

            menu.classList.add("menu_out")
            menuIcon.classList.add("transition_out");


            setTimeout(function(){
                menuIcon.classList.remove("transition_out");
                menu.classList.remove("menu_out")
            }, 600);

        }
        else{
            menu.classList.add("menu_expanded");
            menuIcon.classList.add("transition_in");
        }
    });

    var banner = document.getElementById("banner");
    banner.style.width = (screen.width - 6) + "px";
    banner.style.left = "2px";

}

