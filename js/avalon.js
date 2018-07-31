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
var roles = document.getElementById("roles");
var players = document.getElementsByClassName("secret");

function init(p) {
    set = p-1;
    if(set > 3) {
        set = 3;
    }
    results = [1,1,1,1,1];
    main.classList.add("hidden");
    roles.classList.remove("hidden");
    roles.classList.add("reveal");
    for(var j = p; j < 11; j++) {
        players[j+4].classList.add("hidden");
    }
    setTimeout(() => {
        board.classList.remove("hidden");
        board.classList.add("reveal");
    }, 500);

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
    shade.classList.remove("hidden","conceal");
    shade.classList.add("reveal");
    shade.innerText = cardinal(votes);
    board.style.filter = "blur(5px)";
    setTimeout(function() {
        cardbox.classList.add("reveal");
        cardbox.classList.remove("hidden");
    }, 500)
}

function cardinal(v) {
    if (v == (boards[set][mission-1]/1>>0)) {
        return "Result";
    }
    else {
        switch(v) {
            case 0:
                return "1st\nout of "+(boards[set][mission-1]/1>>0);
            case 1:
                return "2nd\nout of "+(boards[set][mission-1]/1>>0);
            case 2:
                return "3rd\nout of "+(boards[set][mission-1]/1>>0);
            case 3:
                return "4th\nout of "+(boards[set][mission-1]/1>>0);
            case 4:
                return "5th\nout of "+(boards[set][mission-1]/1>>0);
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
            setTimeout(function() {
                element.style.background = "darkred";
            }, 500)
        }
        else if (fails >= 1 && (boards[set][mission-1]%1)==0){
            setTimeout(function() {
                element.style.background = "darkred";
            }, 500)
        }
        else {
            setTimeout(function() {
                element.style.background = "darkblue";
            }, 500)
        }
        setTimeout(function() {
            cardbox.classList.add("hidden");
            board.style.filter = "blur(0px)";
        }, 500)
    }

    shade.innerText = cardinal(votes);
    shade.classList.remove("conceal");
    shade.classList.add("reveal");
}

function hide() {
    if (votes>=((boards[set][mission-1])-0.5)) {
        if (fails >=2) {
            shade.style.background = "darkred"
            shade.innerText = "Failure\n("+fails+"x Fails)";
            results[mission-1] = 3;
        }
        else if (fails == 1 && (boards[set][mission-1]%1)==0) {
            shade.style.background = "darkred"
            shade.innerText = "Failure";
            results[mission-1] = 3;
        }
        else {
            shade.style.background = "darkblue"
            if(fails==1) {
                shade.innerText = "Success\n(1 Fail)";
            }
            else {
                shade.innerText = "Success"
            }           
            results[mission-1] = 2;
        }
        
        
        // Game End Condition
        if (product()%8==0) {
            shade.innerText = shade.innerText+"\nVictory";
            board.style.background = "midnightblue"
        }
        else if (product()%27==0) {
            shade.innerText = shade.innerText+"\nDefeat";
            board.style.background = "firebrick"
        }

        votes = 0;
        fails = 0;
    }
    else {
        shade.style.background = "black";
        shade.classList.remove("reveal");  
        shade.classList.add("conceal");
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