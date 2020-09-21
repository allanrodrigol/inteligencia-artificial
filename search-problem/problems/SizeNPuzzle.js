import UninformedSearch, { algorithms } from "../search/UninformedSearch.js";

const actions = {
    MOVEUP: 'move-up',
    MOVEDOWN: 'move-down',
    MOVELEFT: 'move-left',
    MOVERIGHT: 'move-right'  
}

class SizeNPuzzle {
    constructor(matrix) {
        this.matrix = [];

        for (let i = 0; i < matrix.length; i++) {
            this.matrix.push([... matrix[i]]);
        }
    }

    doAction(action) {
        let state = this.clone();
        let i,j;

        for (i = 0; i < this.matrix.length; i++) {
            j = this.matrix[i].findIndex(value => !value);
            
            if (j != -1) {
                break;
            }
        }

        if (action == actions.MOVEDOWN) {
            state.matrix[i][j] = this.matrix[i + 1][j];
            state.matrix[i + 1][j] = null;
        } else if (action == actions.MOVEUP) {
            state.matrix[i][j] = this.matrix[i - 1][j];
            state.matrix[i - 1][j] = null;
        } else if (action == actions.MOVELEFT) {
            state.matrix[i][j] = this.matrix[i][j - 1];
            state.matrix[i][j - 1] = null;
        } else if (action == actions.MOVERIGHT) {
            state.matrix[i][j] = this.matrix[i][j + 1];
            state.matrix[i][j + 1] = null;
        }

        return state;
    }

    getActions() {
        let list = [];

        let i,j;

        for (i = 0; i < this.matrix.length; i++) {
            j = this.matrix[i].findIndex(value => !value);
            
            if (j != -1) {
                break;
            }
        }

        if (i + 1 < this.matrix.length) {
            list.push(actions.MOVEDOWN);
        }

        if (i - 1 >= 0) {
            list.push(actions.MOVEUP);
        }

        if (j + 1 < this.matrix[i].length) {
            list.push(actions.MOVERIGHT);
        }

        if (j - 1 >= 0) {
            list.push(actions.MOVELEFT);
        }

        return list;
    }

    equals(o) {
        if (this.matrix.length != o.matrix.length) {
            return false;
        }

        for (let i = 0; i < this.matrix.length; i++) {
            if (this.matrix[i].length != o.matrix[i].length) {
                return false;
            }
            
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j] != o.matrix[i][j]) {
                    return false;
                }
            }
        }

        return true;
    }

    clone() {
        return new SizeNPuzzle(this.matrix);
    }

    toString() {
        let str = "[\n";
        
        for (let i = 0; i < this.matrix.length; i++){
            str += `  [${this.matrix[i]}]\n`;
        }

        str += "]";
        return str;
    }
}

let initial = new SizeNPuzzle(
    [
        [   4,    2,    7],
        [null,    8,    6],
        [   3,    5,    1]
    ]
);

let finals = [
        new SizeNPuzzle(
            [
                [   1,   4,   7],
                [   2,   5,   8],
                [   3,   6,null]
            ]
        )
    ]

let problem = new UninformedSearch(initial, finals);

let result = problem.search(); //problem.search(algorithms.DSF);

if (result) {
    result.forEach(state => console.log(state.toString()));
}
