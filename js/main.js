var numSelected = null;
var hasSetUp = false;

window.onload = function () {
    setUp();
    brython();
}

function addClass(id, classe) {
    document.getElementById(id).classList.add(classe)
}

function removeClass(element, classe) {
    element.classList.remove(classe)
}

function setUp() {
   changeBoard(9)
   hasSetUp = true;
}

function selectNumber() {
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