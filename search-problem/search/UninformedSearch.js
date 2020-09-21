import CandidateState from "./CandidateState.js";

export const algorithms = {
    DSF: 'dsf',
    BSF: 'bsf'
}

export default class UninformedSearch {
    constructor(initialState, finalStates) {
        this.initialState = initialState;
        this.finalStates = finalStates; 
    }

    search(type = algorithms.BSF) {
        let visited = [];

        let candidate = new CandidateState(this.initialState);
        let pending = [ candidate ];

        let i = 0;
  
        while (pending.length != 0) {
            candidate = type === algorithms.DSF ? pending.pop() : pending.shift();
            i++;
            
            if (i % 1000 == 0) {
                console.log(i);
            }

            if (this.finalStates.find(state => state.equals(candidate.state))) {
                let result = [];
          
                while (candidate) {
                    result.push(candidate);
                    candidate = candidate.parent;
                }
  
                return result.reverse();
            } else {
                visited.push(candidate.state);
  
                let successors = candidate.getSuccessors();
  
                successors.forEach(successor => {
                    if (!visited.find(state => state.equals(successor.state))) {
                        pending.push(successor);
                    }
                });
            }
        }
      
        return null;
    }
}
