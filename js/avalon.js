// JS for Avalon Web Board

// Global Variables
var boards = [[2,3,2,3,3],[2,3,4,3,4],[2,3,3,4.5,4],[3,4,4,5.5,5]];
var set = 0;
var votes = 0;
var fails = 0;
var mission = 0;

// Objects
var shade = document.getElementById("shade");
var cardbox = document.getElementById("cardbox");

function init(p) {
    set = p-1;
    var quests = document.getElementsByClassName("mission");
    for(var i = 0; i < quests.length; i++){
        quests[i].innerHTML = boards[set][i]/1>>0;
    }
}

function start(n) {
    cardbox.classList.remove("hidden");
    votes = 0;
    fails = 0;
    mission = n;
}

function fail() {
    shade.classList.remove("hidden");
    votes += 1;
    fails += 1;

    if (votes>=((boards[set][mission-1])-0.5)) {
        var element = document.getElementById("m"+mission);
        if (fails > 0) {
            element.style.background = "darkred";
        }
        else {
            element.style.background = "darkblue";
        }
        cardbox.classList.add("hidden");
    }
}

function pass() {
    shade.classList.remove("hidden");
    votes += 1;

    if (votes>=((boards[set][mission-1])-0.5)) {
        var element = document.getElementById("m"+mission);
        if (fails > 0) {
            element.style.background = "red";
        }
        else {
            element.style.background = "blue";
        }
        cardbox.classList.add("hidden");
    }
}

function hide() {
    shade.classList.add("hidden");
}