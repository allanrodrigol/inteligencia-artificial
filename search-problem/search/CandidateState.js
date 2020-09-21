export default class CandidateState {
    constructor(state, parent = null, action = null) {
        this.state = state;
        this.parent = parent;
        this.action = action;
        this.children = [];
    }

    getSuccessors() {
        let list = this.state.getActions();
        let successors = [];
    
        list.forEach(action => {
            let state = this.state.doAction(action);
            
            let successor = new CandidateState(state,this,action);
            this.children.push(successor);

            successors.push(successor);
        });
    
        return successors;
    }

    toString() {
        if (this.action) {
            return `${this.action} > ${this.state.toString()}`
        } else {
            return `start > ${this.state.toString()}`
        }
    }
}
