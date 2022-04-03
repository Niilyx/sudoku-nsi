var numSelected = null;
var hasSetUp = false;

var later = [];
var won = false;
var solution;
var winSound = new Audio("media/victory.mp3")
var bgMusic =  [new Audio("media/bg1.mp3"), new Audio("media/bg2.mp3"),
                new Audio("media/bg3.mp3"), new Audio("media/bg4.mp3")];
var currentMusic;

var pseudo;
var difficulte;
var aide;

var isMuted;
var canCount = false;

var leaderboard = [null, null, null, null, null, null, null, null, null, null];

window.onload = () => {
    // couleur aléatoire
    let randomColor = randomRgb();
    let root = document.querySelector(':root');
    root.style.setProperty('--light', randomColor[0]);
    root.style.setProperty('--dark', randomColor[1]);

    let passedArgs = new URLSearchParams(window.location.search)
    pseudo = passedArgs.get("pseudo")
    difficulte = passedArgs.get("difficulty")
    aide = passedArgs.has("help")
    document.getElementById("help-button").checked = aide

    // obligé de cleanup, au cas où un petit rigolo change l'URL...
    if (pseudo == undefined || pseudo.replaceAll(" ", "") == "") {
        pseudo = choice(["Théophile", "L'anonyme dissident", "Rick Astley", "Bababooey", "The Rock", "Risitas", "xX_SudokuMaster75_Xx", "5UD0KU_PGM", "DarkFlameMaster", "D4RKSaSuke"])
    }

    let isDifficValid = false
    for (let i of Array.apply(null, document.getElementById("time").options)) {
        if (difficulte == i.value) {
            isDifficValid = true
            break
        }
    }
    if (!isDifficValid) document.getElementById("time").value = "15min"
    else document.getElementById("time").value = difficulte
    setUp();
    alert("Bienvenue " + pseudo + "!\n")
    brython();

    document.getElementById("board").oncontextmenu = (event) => {
        pullOut(event.path[0])
        console.log()
        return false
    }
}

function pullOut(a) {

}

function startChrono() {
    secs = 0
    minutes = 0
    Time()
}

function stopChrono() {
    clearTimeout(promise)

    //obligé
    clearTimeout(promise + 1)
}

function randomRgb() {
    let red = Math.floor((1 + Math.random()) * 256 / 2) - 20;
    let green = Math.floor((1 + Math.random()) * 256 / 2) - 20;
    let blue = Math.floor((1 + Math.random()) * 256 / 2) - 20;
    let darkRed = red - 30;
    let darkGreen = green - 30;
    let darkBlue = blue - 30;

    return ["rgb(" + red + ", " + green + ", " + blue + ")", "rgb(" + darkRed + ", " + darkGreen + ", " + darkBlue + ")"];
}


function mute() {
    let muteButton = document.getElementById("iMute")
    if (isMuted) {
        for (let m of bgMusic) {
            m.volume = 0.8
        }

        winSound.volume = 0.3
        muteButton.setAttribute("src", "media/img/unmute.png")
    } else {
        for (let m of bgMusic) {
            m.volume = 0
        }
        winSound.volume = 0
        muteButton.setAttribute("src", "media/img/mute.png")
    }

    isMuted = !isMuted
}

function clearWinAnim() {
    for (const i of later) {
        clearTimeout(i)
    }
}
function toggleInfoDiv() {
    infoDiv = document.getElementById("info");
    if (infoDiv.style.display=="none") {
        infoDiv.style.display = "block";

        let opacity = 0;
        let top = 65;
        var interval = setInterval(()=> {
            if (opacity>=1) {
                clearInterval(interval);
            }
            opacity+=0.2;
            top+=2;
            infoDiv.style.top = top+"px";
            infoDiv.style.opacity = opacity;
        },50)
        
    } else {
        let opacity = 1;
        let top = 75;
        var interval = setInterval(()=> {
            if (opacity<=0) {
                clearInterval(interval)
                infoDiv.style.display = "none";
            }
            opacity-=0.2;
            top -=2;
            infoDiv.style.top = top+"px";
            infoDiv.style.opacity = opacity;
        },30)
    }
}

function wereArgsPassed() {
    return window.location.search != ""
}

function addClass(id, classe) {
    document.getElementById(id).classList.add(classe)
}

function hasClass(element, classe) {
    return element.classList.contains(classe)
}

function removeClass(element, classe) {
    if (element.classList == undefined) { return; }
    element.classList.remove(classe)
}

function choice(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

function music() {
    currentMusic = choice(bgMusic)
    currentMusic.currentTime = 0
    if (isMuted)
        currentMusic.volume = 0
    else
        currentMusic.volume = 0.8
    currentMusic.play()
}

function setUp() {
    for (let mus of bgMusic) {
        mus.onended = () => {
            setTimeout(() => {
                currentMusic = choice(bgMusic)
                currentMusic.play()
            }, 3000)
        }
    }

    music()

    changeBoard(9)
    hasSetUp = true;
}

function selectNumber() {
    if (document.querySelector("body").classList.contains("uneditable")) return
    if (numSelected != null) {
        if (this.classList.contains("number-selected")) {
            numSelected.classList.remove("number-selected");
            return
        }
        numSelected.classList.remove("number-selected");    // on enlève le background si il y'a déjà un nombre de séléctionné
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function changeBoard(newSize) {
    // Cleanup digits
    let e = document.getElementById("digits")
    let child = e.lastElementChild;
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
    // Cleanup board
    e = document.getElementById("board")
    child = e.lastElementChild;
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }

    // Digits
    for (let i = 1; i <= newSize; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    document.getElementById('board').setAttribute("style", "width:" + (newSize * 50).toString() + "px;height:" + (newSize * 50).toString() + "px;");
    document.getElementById('digits').setAttribute("style", "width:" + (newSize * 50).toString() + "px;height: 50px;");

    // Board
    for (let i = 0; i < newSize; i++) {
        for (let j = 0; j < newSize; j++) {
            let cell = document.createElement("div");
            cell.id = i.toString() + ":" + j.toString();    // les id des div seront de la forme i:j (avec i la ligne et j la colonne)

            // Placement des cases de départ
            // if (sudoku[i][j] != 0) {
            //     cell.innerText = sudoku[i][j];
            //     cell.classList.add("start-cell");
            // }

            // Placement d'une ligne verticale et horizontale pour marquer les séparations
            if (newSize == 9) {
                if (i == 2 || i == 5) {
                    cell.classList.add("bottom-horizontal-line");
                } else if (i == 3 || i == 6) {
                    cell.classList.add("top-horizontal-line");
                }
                if (j == 2 || j == 5) {
                    cell.classList.add("right-vertical-line");
                } else if (j == 3 || j == 6) {
                    cell.classList.add("left-vertical-line");
                }
            } else { // ça ne peut être que 4.
                if (i == 1) {
                    cell.classList.add("bottom-horizontal-line");
                } else if (i == 2) {
                    cell.classList.add("top-horizontal-line")
                }
                if (j == 1) {
                    cell.classList.add("right-vertical-line");
                } else if (j == 2) {
                    cell.classList.add("left-vertical-line")
                }
            }

            // cell.addEventListener("click", selectCell);
            cell.classList.add("cell");
            if (!hasSetUp) { cell.classList.add("start-cell") }
            document.getElementById("board").appendChild(cell);
        }
    }
}

function getAllCells() {
    return document.getElementsByClassName("cell")
}

function getAllDigits() {
    return document.getElementsByClassName("number")
}

function win() {
    won = true

    currentMusic.pause()
    currentMusic.currentTime = 0

    if (!isMuted) {
        winSound.currentTime = 0
        winSound.volume = 0.3
        winSound.play()
    }

    document.querySelector("body").classList.add("uneditable")

    //désélectionner le nombre en cours
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }

    for (let i of getAllCells()) {
        i.classList.remove("wrong")
    }

    //anim
    for (let i = 0;i<3;i++) {
        later.push(setTimeout(() => {
            for (let cell of getAllCells()) {
                cell.classList.add("end-cell")
            }
        }, 2200 + (1000 * i)))
        later.push(setTimeout(() => {
            for (let cell of getAllCells()) {
                cell.classList.remove("end-cell")
            }
        }, 2700 + (1000 * i)))
    }
    later.push(setTimeout(() => {
        for (let cell of getAllCells()) {
            cell.classList.add("end-cell")
        }
    }, 5200))

    stopChrono()

    updateLeaderboard()
}

function updateLeaderboard() {
    if (hasSetUp) {
        let dIndex;
        switch (difficulte) {
            case "1min": {
                dIndex = 0
                break
            }
            case "10min": {
                dIndex = 1
                break
            }
            case "15min": {
                dIndex = 2
                break
            }
            case "20min": {
                dIndex = 3
                break
            }

            case "très facile": {
                dIndex = 0
                break
            }
            case "facile": {
                dIndex = 1
                break
            }
            case "moyen": {
                dIndex = 2
                break
            }
            case "difficile": {
                dIndex = 3
                break
            }
        }
        leaderboard.push([pseudo, dIndex, minutes, secs])

        leaderboard.sort((a, b) => {
            if (a == null) return 1
            if (b == null) return -1


            // si le sudoku était plus difficile...
            if (a[1] > b[1]) {
                //mieux classer le résultat
                return -1
            } else if (a[1] < b[1]) {
                return 1
            }

            // sinon, si on a pris moins de minutes...
            if (a[2] < b[2]) {
                // mieux classer
                return -1
            } else if (a[2] > b[2]) {
                return 1
            }

            // sinon, si on a pris moins de secondes...
            if (a[3] < b[3]) {
                // mieux classer
                return -1
            } else if (a[3] > b[3]) {
                return 1
            }

            return 0
        })

        //on coupe le nouveau dernier
        leaderboard.length = 10
    }
    for (let pos in document.getElementsByClassName("lead")) {

        if (JSON.stringify(leaderboard[pos]) == 'null') {
            document.getElementsByClassName("lead")[pos].innerText = ""
            continue
        }
        var e = JSON.parse(JSON.stringify(leaderboard[pos]));

        switch (e[1]) {
            case 0: {
                e[1] = "très facile"
                break
            }
            case 1: {
                e[1] = "facile"
                break
            }
            case 2: {
                e[1] = "moyen"
                break
            }
            case 3: {
                e[1] = "difficile"
                break
            }
        }

        let s = pseudo + ": " + e[1] + " en " + update(e[2]) + "min " + update(e[3]) + "s"

        document.getElementsByClassName("lead")[pos].innerText = s
    }

    for (const el in leaderboard) {
        setCookie("lead" + el, leaderboard[el])
    }
}

function giveUp() {
    document.getElementById("giveup").blur()
    if (won) return
    won = true
    document.querySelector("body").classList.add("uneditable")

    //désélectionner le nombre en cours
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }

    let cells = getAllCells()
    for (let i in cells) {
        cells[i].innerText = solution[i]
        if (cells[i].classList != undefined) cells[i].classList.add("wrong")
    }
    
    stopChrono()
}