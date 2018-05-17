// JavaScript for Tony Zhang's Website

function showHide(n) {
    // Toggles display between tile info when the tile is clicked
    var infos = document.getElementsByClassName("information");

    for(var i = 0; i < infos.length; i++){
        infos[i].style.display = "none";
    }

    document.getElementById("t"+(n+1)).style.display = "flex";
    document.getElementById("t0").style.display = "flex";
    location.href = "#t"+(n);
}

function hide() {
    var infos = document.getElementsByClassName("information");

    for(var i = 0; i < infos.length; i++){
        infos[i].style.display = "none";
    }

    document.getElementById("t0").style.display = "flex";
    location.href = "#t1";
}