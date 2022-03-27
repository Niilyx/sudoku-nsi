var numSelected = null;

/* Un exemple */
var sudoku = [
    [0, 0, 7, 4, 9, 1, 6, 0, 5],
    [2, 0, 0, 0, 6, 0, 3, 0, 9],
    [0, 0, 0, 0, 0, 7, 0, 1, 0],
    [0, 5, 8, 6, 0, 0, 0, 0, 4],
    [0, 0, 3, 0, 0, 0, 0, 9, 0],
    [0, 0, 6, 2, 0, 0, 1, 8, 7],
    [9, 0, 4, 0, 7, 0, 0, 0, 2],
    [6, 7, 0, 8, 3, 0, 0, 0, 0],
    [8, 1, 0, 0, 4, 5, 0, 0, 0]
]

var solution = [
    [3, 8, 7, 4, 9, 1, 6, 2, 5],
    [2, 4, 1, 5, 6, 8, 3, 7, 9],
    [5, 6, 9, 3, 2, 7, 4, 1, 8],
    [7, 5, 8, 6, 1, 9, 2, 3, 4],
    [1, 2, 3, 7, 8, 4, 5, 9, 6],
    [4, 9, 6, 2, 5, 3, 1, 8, 7],
    [9, 3, 4, 1, 7, 6, 8, 5, 2],
    [6, 7, 5, 8, 3, 2, 9, 4, 1],
    [8, 1, 2, 9, 4, 5, 7, 6, 3]
]

window.onload = function () {
    setUp();
}

function setUp() {

    // Digits
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let cell = document.createElement("div");
            cell.id = i.toString() + ":" + j.toString();    // les id des div seront de la forme i:j (avec i la ligne et j la colonne)

            // Placement des cases de départ
            if (sudoku[i][j] != 0) {
                cell.innerText = sudoku[i][j];
                cell.classList.add("start-cell");
            }
            // Placement d'une ligne verticale et horizontale pour marquer les séparations
            if (i == 2 || i == 5) {
                cell.classList.add("horizontal-line");
            }
            if (j == 2 || j == 5) {
                cell.classList.add("vertical-line");
            }

            cell.addEventListener("click", selectCell);
            cell.classList.add("cell");
            document.getElementById("board").appendChild(cell);
        }
    }
}

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");    // on enlève le background si il y'a déjà un nombre de séléctionné
    }
    // if (numSelected != this) {
    numSelected = this;
    numSelected.classList.add("number-selected");
    // } else {
    //     numSelected = null;
    // }
}

function selectCell() {
    if (numSelected) {  // on vérifie qu'un nombre est séléctionnée
        if (this.innerText != "") { // on vérifie que la case sur laquelle on dépose notre chiffre n'est pas déjà remplie
            return;
        }

        this.innerText = numSelected.id;
        let coords = this.id.split(":");
        let row = parseInt(coords[0]);
        let column = parseInt(coords[1]);
        // to be continued
    }
}