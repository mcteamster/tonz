// JS for Avalon Web Board

// Global Variables
var boards = [[2,3,2,3,3],[2,3,4,3,4],[2,3,3,4.5,4],[3,4,4,5.5,5]];
var set = 0;
var num = 0;
var votes = 0;
var fails = 0;
var mission = 0;
var results = [1,1,1,1,1];
var given = 0;
var startup = false;

// Objects
var shade = document.getElementById("shade");
var cardbox = document.getElementById("cardbox");
var board = document.getElementById("board");
var quests = document.getElementsByClassName("mission");
var main = document.getElementById("main");
var roles = document.getElementById("roles");
var players = document.getElementsByClassName("secret");

// Roles
var characters = [
    {id:1,name:'Loyal Servant',team:0,sorting:0},
    {id:2,name:'Merlin',team:0,sorting:0},
    {id:3,name:'Percival',team:0,sorting:0},
    {id:4,name:'Mordred',team:1,sorting:0},
    {id:5,name:'Morgana',team:1,sorting:0},
    {id:6,name:'Loyal Servant',team:0,sorting:0},
    {id:7,name:'Assassin',team:1,sorting:0},
    {id:8,name:'Loyal Servant',team:0,sorting:0},
    {id:9,name:'Loyal Servant',team:0,sorting:0},
    {id:10,name:'Oberon',team:1,sorting:0},
];
var assignments = [];

function init(p) {
    set = p-1;
    if(set > 3) {
        set = 3;
    }
    num = p+4;
    results = [1,1,1,1,1];
    main.classList.add("hidden");
    roles.classList.remove("hidden");
    roles.classList.add("reveal");

    for (var i = 0; i < quests.length; i++) {
        if ((boards[set][i]%1)==0) {
            quests[i].innerHTML = (boards[set][i]/1>>0);
        }
        else {
            quests[i].innerHTML = (boards[set][i]/1>>0)+"*";
        }
    }

    for (var j = p; j < 11; j++) {
        players[j+4].classList.add("hidden");
    }
}

function skip() {
    roles.classList.remove("reveal");
    roles.classList.add("hidden");
    board.classList.remove("hidden");
    board.classList.add("reveal");
}

function assign() {
    if(given == 0) {
        var pool = characters.slice(0,num);
        for(x = 0; x < num; x++) {
            pool[x].sorting = Math.random();
            players[x].disabled = true;
        }
        pool.sort(function(a,b) {
            return a.sorting - b.sorting;
        });
        assignments = pool;
        given++;
        document.getElementById("skip").style.display = "none";
        document.getElementById("assign").innerText = "Next";
    } 
    else if ((given-1) < num) {
        startup = true;
        shade.classList.remove("hidden","conceal");
        shade.classList.add("reveal");
        shade.innerText = players[given-1].value;

    } 
    else {
        roles.classList.remove("reveal");
        roles.classList.add("hidden");
        board.classList.remove("hidden");
        board.classList.add("reveal");
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
            board.style.background = "midnightblue";
            if(given > 0) {
                document.getElementById("showroles").classList.remove("hidden");
            }
        }
        else if (product()%27==0) {
            shade.innerText = shade.innerText+"\nDefeat";
            board.style.background = "firebrick";
            if(given > 0) {
                document.getElementById("showroles").classList.remove("hidden");
            }
        }

        votes = 0;
        fails = 0;
    }
    else if (startup == true) {
        shade.innerText = assignments[given-1].name;
        if(assignments[given-1].team==0) {
            shade.style.background = "darkblue";
        }
        else if(assignments[given-1].team==1) {
            shade.style.background = "darkred";
        }
        given++;
        startup = false;
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

function showroles () {
    shade.classList.remove("conceal");
    shade.classList.add("reveal");
    shade.innerText = "Reveal Roles"
    setTimeout(() => {
        roles.classList.remove("hidden");
        roles.classList.add("reveal");
        document.getElementById("skip").style.display = "none";
        document.getElementById("assign").style.display = "none";
        for(y=0; y<num; y++) {
            players[y].value += " > "+assignments[y].name;
            players[y].style.color = "white";
            if(assignments[y].team==0) {
                players[y].style.background = "darkblue";
            }
            else if(assignments[y].team==1) {
                players[y].style.background = "darkred";
            }
        }
    }, 500);
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