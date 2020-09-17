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
  GOTOROOM1: 'room1',
  GOTOROOM2: 'room2',
  GOTOROOM3: 'room3',
  CLEAR: 'clear'
}

class CandidateState {
  constructor(parent, vacuumPosition, room1State, room2State, room3State) {   
    this.parent = parent;
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

  getSuccessors() {
    let list = this.getActions();
    let successors = [];

    list.forEach(action => {
      let successor;
      
      if (action == actions.GOTOROOM1) {
        successor = new CandidateState(
          this,positions.ROOM1,this.room1State,this.room2State,this.room3State);
      } else if (action == actions.GOTOROOM2) {
        successor = new CandidateState(
          this,positions.ROOM2,this.room1State,this.room2State,this.room3State);
      } else if (action == actions.GOTOROOM3) {
        successor = new CandidateState(
          this,positions.ROOM3,this.room1State,this.room2State,this.room3State);
      } else if (action == actions.CLEAR) {
        if (this.vacuumPosition == positions.ROOM1) {
          successor = new CandidateState(
            this,this.vacuumPosition,states.CLEAN,this.room2State,this.room3State);
        } else if (this.vacuumPosition == positions.ROOM2) {
          successor = new CandidateState(
            this,this.vacuumPosition,this.room1State,states.CLEAN,this.room3State);
        } else {
          successor = new CandidateState(
            this,this.vacuumPosition,this.room1State,this.room2State,states.CLEAN);
        }
      }

      successors.push(successor);
    });

    return successors;
  }

  equals(candidate) {
    return candidate.vacuumPosition == this.vacuumPosition &&
      candidate.room1State == this.room1State &&
      candidate.room2State == this.room2State &&
      candidate.room3State == this.room3State;
  }

  toString() {
    return `[${this.vacuumPosition},${this.room1State},${this.room2State},${this.room3State}]`
  }
}

class VacuumCleanerWorld {
  constructor() {
    this.initialState = new CandidateState(null,positions.ROOM1, states.DIRTY, states.DIRTY, states.DIRTY);
    this.finalStates = [
      new CandidateState(null,positions.ROOM1, states.CLEAN, states.CLEAN, states.CLEAN),
      new CandidateState(null,positions.ROOM2, states.CLEAN, states.CLEAN, states.CLEAN),
      new CandidateState(null,positions.ROOM3, states.CLEAN, states.CLEAN, states.CLEAN)
    ];

    this.visitedStates = [];
  }

  dfs() { //depth-first search
    let candidate = this.initialState;
    let pending = candidate.getSuccessors();

    while (pending.length != 0) {
      candidate = pending.pop();

      if (this.finalStates.find(state => state.equals(candidate))) {
        let result = [];
        
        while (candidate) {
          result.push(candidate);
          candidate = candidate.parent;
        }

        result.reverse().forEach(candidate => console.log(candidate.toString()));
        
        console.log("Solução encontrada!");
        return;
      } else {
        this.visitedStates.push(candidate);

        let successors = candidate.getSuccessors();

        successors.forEach(successor => {
          if (!this.visitedStates.find(state => state.equals(successor))) {
            pending.push(successor);
          }
        });
      }
    }
    
    console.log("Não encontrou uma solução!");
  }

  bfs() { //breath-first search
    let candidate = this.initialState;
    let pending = candidate.getSuccessors();

    while (pending.length != 0) {
      candidate = pending.shift();

      if (this.finalStates.find(state => state.equals(candidate))) {
        let result = [];
        
        while (candidate) {
          result.push(candidate);
          candidate = candidate.parent;
        }

        result.reverse().forEach(candidate => console.log(candidate.toString()));
        
        console.log("Solução encontrada!");
        return;
      } else {
        this.visitedStates.push(candidate);

        let successors = candidate.getSuccessors();

        successors.forEach(successor => {
          if (!this.visitedStates.find(state => state.equals(successor))) {
            pending.push(successor);
          }
        });
      }
    }
    
    console.log("Não encontrou uma solução!");
  }
}

let problem = new VacuumCleanerWorld();
problem.dfs();
problem.bfs();
