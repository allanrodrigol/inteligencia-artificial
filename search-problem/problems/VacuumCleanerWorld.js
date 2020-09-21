import UninformedSearch, { algorithms } from "../search/UninformedSearch.js";

const positions = {
    ROOM1: 'room1',
    ROOM2: 'room2',
    ROOM3: 'room3'
}
    
const states = {
    DIRTY: 'dirty',
    CLEAN: 'clean'
}
    
const actions = {
    GOTOROOM1: 'go-to-room-1',
    GOTOROOM2: 'go-to-room-2',
    GOTOROOM3: 'go-to-room-3',
    CLEAR: 'clear-room'
}
    
class VacuumCleanerWorld {
    constructor(vacuumPosition, room1State, room2State, room3State) {   
        this.vacuumPosition = vacuumPosition;
        this.room1State = room1State;
        this.room2State = room2State;
        this.room3State = room3State;
    }
    
    getActions() {
        let list = [];
    
        if (this.vacuumPosition == positions.ROOM1) {
            if (this.room1State == states.DIRTY) {
                list.push(actions.CLEAR);
            }
    
            list.push(actions.GOTOROOM2);
    
        } else if (this.vacuumPosition == positions.ROOM2) {
            if (this.room2State == states.DIRTY) {
                list.push(actions.CLEAR);
            }
    
            list.push(actions.GOTOROOM1);
            list.push(actions.GOTOROOM3);
        } else {
            if (this.room3State == states.DIRTY) {
                list.push(actions.CLEAR);
            }
    
            list.push(actions.GOTOROOM2);
        }
    
        return list;      
    }
    
    doAction(action) {
        let state = this.clone();
        
        if (action == actions.GOTOROOM1) {
            state.vacuumPosition = positions.ROOM1;
        } else if (action == actions.GOTOROOM2) {
            state.vacuumPosition = positions.ROOM2;
        } else if (action == actions.GOTOROOM3) {
            state.vacuumPosition = positions.ROOM3;
        } else if (action == actions.CLEAR) {
            if (this.vacuumPosition == positions.ROOM1) {
                state.room1State = states.CLEAN;
            } else if (this.vacuumPosition == positions.ROOM2) {
                state.room2State = states.CLEAN;
            } else {
                state.room3State = states.CLEAN;
            }
        }

        return state;
    }
    
    equals(o) {
        return o.vacuumPosition == this.vacuumPosition &&
            o.room1State == this.room1State && 
            o.room2State == this.room2State &&
            o.room3State == this.room3State;
    }

    clone() {
        return new VacuumCleanerWorld(
            this.vacuumPosition,
            this.room1State,
            this.room2State,
            this.room3State);
    }
    
    toString() {
        return `[${this.vacuumPosition}, ${this.room1State}, ${this.room2State}, ${this.room3State}]`
    }
}

let initial = new VacuumCleanerWorld(positions.ROOM1, states.DIRTY, states.DIRTY, states.DIRTY);

let finals = [
        new VacuumCleanerWorld(positions.ROOM1, states.CLEAN, states.CLEAN, states.CLEAN),
        new VacuumCleanerWorld(positions.ROOM2, states.CLEAN, states.CLEAN, states.CLEAN),
        new VacuumCleanerWorld(positions.ROOM3, states.CLEAN, states.CLEAN, states.CLEAN)
    ];

let problem = new UninformedSearch(initial, finals);

let result = problem.search(); //problem.search(algorithms.DSF);

if (result) {
    result.forEach(state => console.log(state.toString()));
}
