function range2(start=0,end,interval=1) {
	var l = []
	for (var i = start; i < end;i += interval) {
		l.push(i)
	}
	return l
}
function range1(end, interval=1) {
	var l = []
	for (var i = 0; i < end;i += interval) {
		l.push(i)
	}
	return l
}
function choose(choices) {
	var index = Math.floor(Math.random() * choices.length);
	return choices[index];
}



class Cell {
	constructor(value,x,y){
		this.value = value;
		this.x =x;
		this.y = y;
	}

	get_square(size) {
		if (size == 4) {
			if (0 <= this.x && this.x <= 1 && 0 <= this.y && this.y <= 1){
                return 1
			}
            else if (2 <= this.x && this.x <= 3 && 0 <= this.y && this.y <= 1){
                return 2
            }
            else if (0 <= this.x && this.x <= 1 && 2 <= this.y && this.y <= 3){
                return 3
            }
            else if (2 <= this.x && this.x <= 3 && 2 <= this.y && this.y <= 3){
                return 4
            }
    	}
	}
}




class Sudoku {
	constructor(size=4) {
		this.size = size;
        this.tableau = this.generate_empty_sudoku();
		this.tableau = this.make();
	}

    // Renvoie les valeurs d'une colonne, ou les cells elle-mêmes.
    get_column(column, values=true) {
        if (column > this.size || column < 1) {
            console.log("Bad column asked: " + column)
            return false
        }

        var l = []

        if (values) {
            for (var i in range1(this.size)) {
                l.push((this.tableau[i][column]).value)
            }
        } else {
            for (var i in range1(this.size)) {
                l.push(this.tableau[i][column])
            }
        }
        return l
    }

    // Renvoie les valeurs d'une ligne, ou les cells elle-mêmes.
    get_row(row, values=true) {
        if (row > this.size || row < 1) {
            console.log("Bad row asked: " + row)
            return false
        }

        var l = []

        if (values) {
            for (var i in range1(this.size)) {
                l.push((this.tableau[i][row]).value)
            }
        } else {
            for (var i in range1(this.size)) {
                l.push(this.tableau[i][row])
            }
        }
        return l
    }

    // Renvoie les valeurs d'un carré, ou les cells elle-mêmes.
    get_square(square, values=true) {
        if (square > this.size || square < 1) {
            console.log("Bad square asked: " + square)
            return false
        }

        var l = []
        var sr_size = Math.sqrt(this.size)   // racine carrée de la taille du sudoku
        var x_min = ((square-1)%sr_size)*sr_size
        // Math.floor(x/y) <=> x//y
        var y_min = (Math.floor((square-1)/sr_size))*sr_size

        if (values){
            for (var j in this.tableau) {
                for (var k in j) {
                    if (x_min <= k.x < x_min+sr_size && y_min <= k.y < y_min*sr_size+sr_size) {
                        l.push(k.value)
                    }
                }        
            }
        }
        else {
            for (var j in this.tableau) {
                for (var k in j) {
                    if (x_min <= k.x < x_min+sr_size && y_min <= k.y < y_min*sr_size+sr_size) {
                        l.push(k)
                    }
                }
            }
        }
        return l
    }

    is_correct() {
        //anciennement is_complete()
        for (var i in range1(this.size)) {
            for (var j in range1(this.size)) {
                var current_cell = this.tableau[i][j]
                if (current_cell.value == 0 || this.get_row(i+1).count(current_cell.value) > 1 || this.get_column(j+1).count(current_cell.value) > 1 || this.get_square(current_cell.get_square(this.size)).count(current_cell.value) > 1) {
                    return false
                }
            }
        }
        return true
    }

    is_good_move(cell, new_cell) {
        //anciennement is_correct()
        var x = cell.x
        var y = cell.y
        var square = cell.get_square(this.size)
        if (this.get_row(y+1).includes(new_cell)) {
            return this.get_row(y+1, false), this.get_row(y+1).findIndex(new_cell)
        }
        else if (this.get_column(x+1).includes(new_cell)) {
            return this.get_column(x+1, false), this.get_column(y+1).findIndex(new_cell)
        }
        else if (this.get_square(square).includes(new_cell)) {
            return this.get_square(square, false), this.get_square(square).findIndex(new_cell)
        }

        return true
    }

    make() {
        /* Commenté: Alexis a trouvé une solution.

        
		// on retire des valeurs une à une de temp, puis on la régénère sur nombres :)
		let nombres = range(this.size**2)
		var temp = nombres;
		for (var i=0;i<this.size;i++){
			for (var j=0;j<this.size;j++){

			}
		}
        */
        while (true) {
            if (this.is_correct()){
                break
            } else {
                this.tableau = this.generate_empty_sudoku()
            }

            for (var i in range1(100)) {
                var random_x = Math.floor(Math.random() * (this.size))
                var random_y = Math.floor(Math.random() * (this.size))
                var random_cell = this.tableau[random_y][random_x]

                if (random_cell.value == 0) {
                    var rand_list = range2(1,5)
                    var new_cell = choose(rand_list)

                    while (true) {
                        var is_good_move = this.is_good_move(random_cell, new_cell)
                        if (is_good_move === true) {
                            random_cell.value = new_cell
                            break
                        } else {
                            // stupide Array.splice()...
                            var could_delete = false
                            for (var i = 0; i < rand_list.length;i++) {
                                if (rand_list[i] === new_cell) {
                                    rand_list.splice(i,1)
                                    could_delete = true
                                }
                            }

                            if (could_delete) {
                                new_cell = choose(rand_list)
                            } else {
                                if (this.is_good_move(random_cell, random_cell.value)) {
                                    var old_cell = is_good_move[0][is_good_move[1]]
                                    old_cell.value = 0
                                    random_cell.value = new_cell
                                }
                                break
                            }
                        }
                    }
                }
            }
            
        }
    }


	generate_empty_sudoku() {
		var l = [];
		var l2 = [];
		for (var y = 0; y < this.size;y++) {
			for (var x = 0; x < this.size;x++) {
				l2.push(new Cell(0,x,y))
			}
			l.push(l2)
			l2 = []
		}
		
		return l
	}
}

var a = new Sudoku(4)
console.log(a.tableau)