/* --- Recréations de fonctions utiles --- */

function range2(start = 0, end, interval = 1) {
  var l = []
  for (var i = start; i < end; i += interval) {
    l.push(i)
  }
  return l
}
function range1(end, interval = 1) {
  var l = []
  for (var i = 0; i < end; i += interval) {
    l.push(i)
  }
  return l
}
function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}


/* --- Classes --- */

class Cell {
  constructor(value, x, y) {
    this.value = value;
    this.x = x;
    this.y = y;
  }

    get_square(size) {
        if (size == 4) {
            if (0 <= this.x && this.x <= 1 && 0 <= this.y && this.y <= 1) {
              return 1
            }
            else if (2 <= this.x && this.x <= 3 && 0 <= this.y && this.y <= 1) {
              return 2
            }
            else if (0 <= this.x && this.x <= 1 && 2 <= this.y && this.y <= 3) {
              return 3
            }
            else if (2 <= this.x && this.x <= 3 && 2 <= this.y && this.y <= 3) {
              return 4
            }
        } else if (size == 9) {
            if (0 <= this.x && this.x <= 2 && 0 <= this.y && this.y <= 2 ) {
                return 1
            }
            else if ( 3 <= this.x && this.x <= 5 && 0 <= this.y && this.y <= 2) {
                return 2
            }
            else if ( 6 <= this.x && this.x <= 8 && 0 <= this.y && this.y <= 2) {
                return 3
            }
            else if ( 0 <= this.x && this.x <= 2 && 3 <= this.y && this.y <= 5) {
                return 4
            }
            else if ( 3 <= this.x && this.x <= 5 && 3 <= this.y && this.y <= 5) {
                return 5
            }
            else if ( 6 <= this.x && this.x <= 8 && 3 <= this.y && this.y <= 5) {
                return 6
            }
            else if ( 0 <= this.x && this.x <= 2 && 6 <= this.y && this.y <= 8) {
                return 7
            }
            else if ( 3 <= this.x && this.x <= 5 && 6 <= this.y && this.y <= 8) {
                return 8
            }
            else if ( 6 <= this.x && this.x <= 8 && 6 <= this.y && this.y <= 8) {
                return 9    
            }
    }
  }
}


class Sudoku {
  constructor(size = 4) {
    this.size = size;
    this.tableau = this.generate_empty_sudoku()
    Object.assign(this, this.make(this))
  }

  // Renvoie les valeurs d'une colonne, ou les cells elles-mêmes.
  get_column(column, values = true) {
    if (column > this.size || column < 1) {
      console.log("Bad column asked: " + column)
      return false
    }

    var l = []
    if (values) {
      for (var i in range1(this.size)) {
        l.push((this.tableau[i][column - 1]).value)
      }
    } else {
      for (var i in range1(this.size)) {
        l.push(this.tableau[i][column - 1])
      }
    }
    return l
  }

  // Renvoie les valeurs d'une ligne, ou les cells elles-mêmes.
  get_row(row, values = true) {
    if (row > this.size || row < 1) {
      console.log("Bad row asked: " + row)
      return false
    }

    if (values) {

      var l = []

      for (var i of range1(this.size)) {
        l.push((this.tableau[row - 1][i]).value)
      }
      return l
    }
    return this.tableau[row - 1]

  }

  // Renvoie les valeurs d'un carré, ou les cells elle-mêmes.
  get_square(square, values = true) {
    if (square > this.size || square < 1) {
      console.log("Bad square asked: " + square)
      return false
    }

    var l = []
    var sr_size = Math.sqrt(this.size)   // racine carrée de la taille du sudoku
    var x_min = ((square - 1) % sr_size) * sr_size
    // Math.floor(x/y) <=> x//y
    var y_min = (Math.floor((square - 1) / sr_size)) * sr_size

    if (values) {
      for (var j of this.tableau) {
        for (var k of j) {
          if ((x_min <= k.x && k.x < x_min + sr_size) && (y_min <= k.y && k.y < y_min + sr_size)) {
            l.push(k.value)
          }
        }
      }
    }
    else {
      for (var j of this.tableau) {
        for (var k of j) {
          if (x_min <= k.x < x_min + sr_size && y_min <= k.y < y_min + sr_size) {
            l.push(k)
          }
        }
      }
    }
    return l
  }

    is_correct() {
        if (this.tableau == undefined) return false;
        //anciennement is_complete()
        for (var i of range1(this.size)) {
            for (var j of range1(this.size)) {
                var current_cell = this.tableau[i][j];
                if (current_cell.value == 0 || this.get_row(i + 1).filter((x) => x == current_cell.value).length > 1 || this.get_column(j + 1).filter((x) => x == current_cell.value).length > 1 || this.get_square(current_cell.get_square(this.size)).filter((x) => x == current_cell.value).length > 1) {
                    return false;
                }
            }
        }
        return true;
    }

    is_good_move2(cell, new_cell) {
        //anciennement is_correct()
        var x = cell.x
        var y = cell.y
        var square = cell.get_square(this.size)
        if (this.get_row(y + 1).includes(new_cell)) {
            return [this.get_row(y + 1, false), this.get_row(y + 1).findIndex((element) => element == new_cell)]
        }
        else if (this.get_column(x + 1).includes(new_cell)) {
            return [this.get_column(x + 1, false), this.get_column(y + 1).findIndex((element) => element == new_cell)]
        }
        else if (this.get_square(square).includes(new_cell)) {
            return [this.get_square(square, false), this.get_square(square).findIndex((element) => element == new_cell)]
        }
      
        return true;
    }
  
    /*
    is_good_move(cell, new_cell) {
      //anciennement is_correct()
      console.log(new_cell)
      var x = cell.x
      var y = cell.y
      var square = cell.get_square(this.size)   
      if (this.get_row(y + 1).includes(new_cell)) {
        return false;
      }
      if (this.get_column(x + 1).includes(new_cell)) {
        return false;
      }
      if (this.get_square(square).includes(new_cell)) {
        return false;
      } 
      return true;
    }
    */

    make() {
        while (true) {
            var empty_cell = this.find_empty_cell()
            if (empty_cell == null) { break }

            var numbers = range2(1,this.size+1)
            var new_value = choose(numbers)

            while (true) {
                var correct_move = this.is_good_move2(empty_cell, new_value)

                if (correct_move === true) {
                    empty_cell.value = new_value // je veux rien casser.
                    this.tableau[empty_cell.y][empty_cell.x].value = new_value
                    break
                }

                else {
                    var index = numbers.indexOf(new_value)

                    //si non trouvé...
                    if (index == -1) {
                        var old_cell = correct_move[0][correct_move[1]]
                        this.tableau[old_cell.y][old_cell.x].value = 0
                    } else {
                        new_value = choose(numbers)
                    }
                }
            }
        }
        return this
    }

    find_empty_cell() {
        for (var i of this.tableau) {
            for (var j of i) {
                if (j.value === 0) {
                    return j
                }
            }
        }
        return null
    }

    generate_empty_sudoku() {
        var l = [];
        var l2 = [];
        for (var y = 0; y < this.size; y++) {
            for (var x = 0; x < this.size; x++) {
                l2.push(new Cell(0, x, y))
            }
            l.push(l2)
            l2 = []
        }
        return l
    }

    debug() {
        for (var i of this.tableau) {
            var l = []
            for (var j of range1(i.length)) {
                l.push(i[j].value)
            }
            console.log(l)
        }
    }
}

// returns true if there are two equal numbers in the same row
function duplicateNumberInRow(s, fieldY) {
  numbers = new Array();
  for (var i = 0; i < 9; i++) {
    if (s[i][fieldY] !== 0) {
      if (numbers.includes(s[i][fieldY])) {
        return true;
      } else {
        numbers.push(s[i][fieldY]);
      }
    }
  }
  return false;
}

// returns true if there are two equal numbers in the same col
function duplicateNumberInCol(s, fieldX) {
  numbers = new Array();
  for (var i = 0; i < 9; i++) {
    if (s[fieldX][i] !== 0) {
      if (numbers.includes(s[fieldX][i])) {
        return true;
      } else {
        numbers.push(s[fieldX][i]);
      }
    }
  }
  return false;
}

// returns true if there are two equal numbers in the same box
function duplicateNumberInBox(s, fieldX, fieldY) {
  boxX = Math.floor(fieldX / 3);
  boxY = Math.floor(fieldY / 3);
  numbers = new Array();
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      x = i + 3 * boxX;
      y = j + 3 * boxY;
      if (s[x][y] !== 0) {
        if (numbers.includes(s[x][y])) {
          return true;
        } else {
          numbers.push(s[x][y]);
        }
      }
    }
  }
  return false;
}

// returns true if there are two equal numbers in the same row, col or box
function duplicateNumberExists(s, fieldX, fieldY) {
  if (duplicateNumberInRow(s, fieldY)) {
    return true;
  }
  if (duplicateNumberInCol(s, fieldX)) {
    return true;
  }
  if (duplicateNumberInBox(s, fieldX, fieldY)) {
    return true;
  }
  return false;
}

function sudoku_complete(sudoku) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (sudoku[i][j] === 0) {
        return false;
      }
    }
  }
  return true;
}

//Tests if there are any duplicate numbers in a sudoku
function sudoku_invalid(s) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (duplicateNumberExists(s, i, j)) {
        return true;
      }
    }
  }
  return false;
}


console.log("Program Starting")
var a = new Sudoku(4)
var b = new Sudoku(9)

console.log(a.is_correct());
console.log(b.is_correct());
console.log("End")
