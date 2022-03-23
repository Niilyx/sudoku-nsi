function range(start=0,end,interval=1) {
	var l = []
	for (var i = start; i < end;i += interval) {
		l.push(i)
	}
	return l
}
function range(end, interval=1) {
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
			if (0 <= this.x <= 1 && 0 <= this.y <= 1){
                return 1
			}
            else if (2 <= this.x <= 3 && 0 <= this.y <= 1){
                return 2
            }
            else if (0 <= this.x <= 1 && 2 <= this.y <= 3){
                return 3
            }
            else if (2 <= this.x <= 3 && 2 <= this.y <= 3){
                return 4
            }
    	}
	}
}




class Sudoku {
	constructor(size=4) {
		this.size = size;
		this.tableau = this.generate_empty_sudoku();
	}

    // Renvoie les valeurs d'une colonne, ou les cells elle-mêmes.
    get_column(column, values=true) {
        if (column > this.size || column < 1) {
            console.log("Bad column asked: " + column)
            return false
        }

        var l = []

        if (values) {
            for (var i in range(this.size)) {
                l.push(tableau[i][column].value)
            }
        } else {
            for (var i in range(this.size)) {
                l.push(tableau[i][column])
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
            for (var i in range(this.size)) {
                l.push(tableau[i][row].value)
            }
        } else {
            for (var i in range(this.size)) {
                l.push(tableau[i][row])
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
        var sr_size = Math.sqrt(self.size)   // racine carrée de la taille du sudoku
        var x_min = ((square-1)%sr_size)*sr_size
        // Math.floor(x/y) <=> x//y
        var y_min = (Math.floor((square-1)/sr_size))*sr_size

        if (values):
            for (var j in self.tableau) {
                for (var k in j) {
                    if (x_min <= k.x < x_min+sr_size && y_min <= k.y < y_min*sr_size+sr_size) {
                        l.append(k.value)
                    }
                }        
            }
        else {
            for (var j in self.tableau) {
                for (var k in j) {
                    if (x_min <= k.x < x_min+sr_size && y_min <= k.y < y_min*sr_size+sr_size) {
                        l.append(k)
                    }
                }
            }
        }
        return l
    }

    is_correct() {
        for (var i in range(self.size)) {
            for (var j in range(self.size)) {
                current_cell = self.tableau[i][j]
                if (current_cell.value == 0 || self.get_row(i+1).count(current_cell.value) > 1 || self.get_column(j+1).count(current_cell.value) > 1 || self.get_square(current_cell.get_square(self.size)).count(current_cell.value) > 1) {
                    return false
                }
            }
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
                this.generate_empty_sudoku()
            }
        }
    }


	generate_empty_sudoku() {
		var l = [];
		var l2 = [];
		for (var y = 0;i<this.size;i++) {
			for (var x = 0; j<this.size;j++) {
				l2.push(new Cell(1,x,y))
			}
			l.push(l2)
			l2 = []
		}
		
		return l
	}
}

var a = new Sudoku(4)
console.log(a.tableau)