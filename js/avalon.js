// JS for Avalon Web Board

// Global Variables
var boards = [[2,3,2,3,3],[2,3,4,3,4],[2,3,3,4.5,4],[3,4,4,5.5,5]];
var set = 0;
var votes = 0;
var fails = 0;
var mission = 0;
var results = [1,1,1,1,1];

// Objects
var shade = document.getElementById("shade");
var cardbox = document.getElementById("cardbox");
var board = document.getElementById("board");
var quests = document.getElementsByClassName("mission");
var main = document.getElementById("main");

function init(p) {
    set = p-1;
    results = [1,1,1,1,1];
    main.classList.add("hidden");
    board.classList.remove("hidden");

    for(var i = 0; i < quests.length; i++){
        if ((boards[set][i]%1)==0)
            quests[i].innerHTML = boards[set][i]/1>>0;
        else {
            quests[i].innerHTML = (boards[set][i]/1>>0)+"*";
        }
    }
}

function start(n) {
    votes = 0;
    fails = 0;
    mission = n;
    shade.classList.remove("hidden");
    shade.innerText = cardinal(votes);
    cardbox.classList.remove("hidden");
    board.style.filter = "blur(5px)";
}

function cardinal(v) {
    if (v == (boards[set][mission-1]/1>>0)) {
        return "Result";
    }
    else {
        switch(v) {
            case 0:
                return "1st of "+(boards[set][mission-1]/1>>0);
            case 1:
                return "2nd of "+(boards[set][mission-1]/1>>0);
            case 2:
                return "3rd of "+(boards[set][mission-1]/1>>0);
            case 3:
                return "4th of "+(boards[set][mission-1]/1>>0);
            case 4:
                return "5th of "+(boards[set][mission-1]/1>>0);
        }
    }
}

function vote(f) {
    votes += 1;

    if (f==1) {
        fails += 1;
    }

    if (votes>=((boards[set][mission-1])-0.5)) {
        var element = document.getElementById("m"+mission);
        if (fails >= 2) {
            element.style.background = "darkred";
        }
        else if (fails >= 1 && (boards[set][mission-1]%1)==0){
            element.style.background = "darkred";
        }
        else {
            element.style.background = "darkblue";
        }
        cardbox.classList.add("hidden");
        board.style.filter = "blur(0px)";
    }

    shade.innerText = cardinal(votes);
    shade.classList.remove("hidden");
}

function hide() {
    if (votes>=((boards[set][mission-1])-0.5)) {
        if (fails >=2) {
            shade.style.background = "darkred"
            shade.innerText = "Failure\nFail x"+fails;
            results[mission-1] = 3;
        }
        else if (fails >= 1 && (boards[set][mission-1]%1)==0) {
            shade.style.background = "darkred"
            shade.innerText = "Failure\nFail x"+fails;
            results[mission-1] = 3;
        }
        else {
            shade.style.background = "darkblue"
            shade.innerText = "Success\nFail x"+fails;
            results[mission-1] = 2;
        }
        
        
        // Game End Condition
        if (product()%8==0) {
            shade.innerText = "Success\nFail x"+fails+"\n Victory";
            board.style.background = "midnightblue"
        }
        else if (product()%27==0) {
            shade.innerText = "Failure\nFail x"+fails+"\n Defeat";
            board.style.background = "firebrick"
        }

        votes = 0;
        fails = 0;
    }
    else {
        shade.style.background = "black"        
        shade.classList.add("hidden");
    }
}

function product() {
    var product = 1;
    for (var i = 0; i < results.length; i++) { 
        product = product*results[i];
    }
    return product;
}

function back(x) {
    switch(x) {
        case 0:
            location.reload();
            break
        case 1:
            votes = 0;
            fails = 0;
            mission = 0;
            cardbox.classList.add("hidden");
            board.style.filter = "blur(0px)";
            break
    }
}