import UninformedSearch, { algorithms } from "../search/UninformedSearch.js";

const states = {
    EMPTY: 0,
    L1: 1,
    L2: 2,
    L3: 3,
    L4: 4
}
    
const actions = {
    FILL1: 'fill-jar-1',
    FILL2: 'fill-jar-2',
    EMPTY1: 'empty-jar-1',
    EMPTY2: 'empty-jar-2',
    TRANSFER1TO2: 'transfer-jar-1-to-2',
    TRANSFER2TO1: 'transfer-jar-2-to-1'
}
    
class WaterJars {
    constructor(jar1State, jar2State) {   
        this.jar1State = jar1State;
        this.jar2State = jar2State;
    }
    
    getActions() {
        let list = [];
    
        if (this.jar1State < 3) {
            list.push(actions.FILL1);
        }

        if (this.jar1State > 0) {
            list.push(actions.EMPTY1);

            if (this.jar2State < 4) {
                list.push(actions.TRANSFER1TO2);
            }
        }

        if (this.jar2State < 4) {
            list.push(actions.FILL2);
        }

        if (this.jar2State > 0) {
            list.push(actions.EMPTY2);

            if (this.jar1State < 3) {
                list.push(actions.TRANSFER2TO1);
            }
        }
    
        return list;      
    }
    
    doAction(action) {
        
        let state = this.clone();
        
        if (action == actions.EMPTY1) {
            state.jar1State = states.EMPTY;
        } else if (action == actions.EMPTY2) {
            state.jar2State = states.EMPTY;
        } else if (action == actions.FILL1) {
            state.jar1State = states.L3;
        } else if (action == actions.FILL2) {
            state.jar2State = states.L4;
        } else if (action == actions.TRANSFER1TO2) {
            let transfer = Math.min(state.jar1State,4 - state.jar2State);

            state.jar1State -= transfer;
            state.jar2State += transfer;
        } else if (action == actions.TRANSFER2TO1) {
            let transfer = Math.min(state.jar2State,3 - state.jar1State);

            state.jar1State += transfer;
            state.jar2State -= transfer;
        }

        return state;
    }
    
    equals(o) {
        return o.jar1State == this.jar1State && o.jar2State == this.jar2State;
    }

    clone() {
        return new WaterJars(this.jar1State,this.jar2State);
    }
    
    toString() {
        return `[${this.jar1State}, ${this.jar2State}]`
    }
}

let initial = new WaterJars(states.EMPTY, states.EMPTY);

let finals = [
        new WaterJars(states.EMPTY, states.L2),
        new WaterJars(states.L1, states.L2),
        new WaterJars(states.L2, states.L2),
        new WaterJars(states.L3, states.L2)
    ];

let problem = new UninformedSearch(initial, finals);

let result = problem.search(); //problem.search(algorithms.DSF);

if (result) {
    result.forEach(state => console.log(state.toString()));
}
