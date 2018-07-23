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
var board = document.getElementById("board");
var quests = document.getElementsByClassName("mission");
var main = document.getElementById("main");

function init(p) {
    set = p-1;
    main.classList.add("hidden");
    board.classList.remove("hidden");    
    for(var i = 0; i < quests.length; i++){
        quests[i].innerHTML = boards[set][i]/1>>0;
    }
}

function start(n) {
    cardbox.classList.remove("hidden");
    board.style.filter = "blur(5px)"
    votes = 0;
    fails = 0;
    mission = n;
}

function vote(f) {
    votes += 1;

    if (f==1) {
        fails += 1;
    }

    if (votes>=((boards[set][mission-1])-0.5)) {
        var element = document.getElementById("m"+mission);
        if (fails > 0) {
            element.style.background = "darkred";
        }
        else {
            element.style.background = "darkblue";
        }
        cardbox.classList.add("hidden");
        board.style.filter = "blur(0px)"
    }

    shade.innerText = votes+"/"+(boards[set][mission-1]/1>>0);
    shade.classList.remove("hidden");
}

function hide() {
    shade.classList.add("hidden");
}