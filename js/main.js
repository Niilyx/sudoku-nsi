class Cell {
	constructor(value,x,y){
		this.value = value;
		this.x =x;
		this.y = y;
	}

	get_square(size) {
		if (size == 4) {
			if (0 <= self.x <= 1 && 0 <= self.y <= 1){
                return 1
			}
            else if (2 <= self.x <= 3 && 0 <= self.y <= 1){
                return 2
            }
            else if (0 <= self.x <= 1 && 2 <= self.y <= 3){
                return 3
            }
            else if (2 <= self.x <= 3 && 2 <= self.y <= 3){
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
		var l2 =[];
		for (let i=0;i<=this.size**2;i+=this.size) {
			for (let j=0;j<=this.size;i++) {
				l2.push(new Cell(0,i,parseInt(j/this.size)));
			}
			l.push(l);
		}
		return l
	}
}

var a = new Sudoku(4);
console.log(a.tableau)
