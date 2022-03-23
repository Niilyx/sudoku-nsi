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

	generate_empty_sudoku() {
		var l = [];
		var l2 = [];
		for (var i = 0;i<this.size;i++) {
			for (var j = 0; j<this.size;j++) {
				l2.push(new Cell(1,j,i))
			}
			l.push(l2)
			l2 = []
		}
		
		// on retire des valeurs une à une de temp, puis on la régénère sur nombres :)
		let nombres = range(this.size**2)
		var temp = nombres;
		for (var i=0;i<this.size;i++){
			for (var j=0;j<this.size;j++){

			}
		}
		return l
	}
}

var a = new Sudoku(4)
console.log(a.tableau)