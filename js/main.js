var numSelected = null;
var hasSetUp = false;

var won = false;
var winSound = new Audio("media/victory.mp3")
var bgMusic = [new Audio("media/bg1.mp3"),
               new Audio("media/bg2.mp3"),];
var currentMusic;

var pseudo;
var difficulte;
var aide;

var isMuted;

var leaderboard = [];

window.onload = () => {
    let passedArgs = new URLSearchParams(window.location.search)
    pseudo = passedArgs.get("pseudo")
    difficulte = passedArgs.get("difficulty")
    aide = passedArgs.has("help")
    
    // obligé de cleanup, au cas où un petit rigolo change l'URL...
    if (pseudo == "") {
        pseudo = "L'anonyme dissident"
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
    brython();

    if (document.cookie !== '') {
        leaderboard = document.cookie.split(";")
    }
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

function mute() {
    let muteButton = document.getElementById("iMute")
    if (isMuted) {
        for (let m of bgMusic) {
            m.volume = 0.8
        }
        
        winSound.volume = 0.8
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

function wereArgsPassed() {
    return window.location.search != ""
}

function addClass(id, classe) {
    document.getElementById(id).classList.add(classe)
}

function removeClass(element, classe) {
    if (element.classList == undefined) return
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

    document.getElementById('board').setAttribute("style","width:" + (newSize * 50).toString() +"px;height:" + (newSize * 50).toString() + "px;");
    document.getElementById('digits').setAttribute("style","width:" + (newSize * 50).toString() +"px;height: 50px;");

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
                    cell.classList.add("horizontal-line");
                }
                if (j == 2 || j == 5) {
                    cell.classList.add("vertical-line");
                }
            } else { // ça ne peut être que 4.
                if (i == 1) {
                    cell.classList.add("horizontal-line");
                }
                if (j == 1) {
                    cell.classList.add("vertical-line");
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
    var fadeOut = setInterval(() => {
        let speed = 0.005

        if (currentMusic.volume - speed < 0) {
            currentMusic.volume = 0
            clearInterval(fadeOut)
        } else {
            currentMusic.volume -= speed
        }
    }, 1)

    winSound.currentTime = 0
    winSound.volume = 0.3
    winSound.play()

    document.querySelector("body").classList.add("uneditable")
    document.getElementById("alerts").innerText = "Et c'est la win !"

    //désélectionner le nombre en cours
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }

    //anim
    for (let i = 0;i<3;i++) {
        setTimeout(() => {
            for (let cell of getAllCells()) {
                cell.classList.add("end-cell")
            }
        }, 2200 + (1000 * i))
        setTimeout(() => {
            for (let cell of getAllCells()) {
                cell.classList.remove("end-cell")
            }
        }, 2700 + (1000 * i))
    }
    setTimeout(() => {
        for (let cell of getAllCells()) {
            cell.classList.add("end-cell")
        }
    }, 5200)

	won = true

    stopChrono()

    if (leaderboard.length < 10) {
        leaderboard.push(pseudo + "," + difficulte + "," + minutes + "," + secs)
    }
}