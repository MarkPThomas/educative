// Template class for backtracking using dfs
export class Backtracking {
  // Initialize state and choices
  constructor(st, ch) {
    this.state = st; // The current state
    this.choices = ch; // Possible next moves based on current state
    this.res = []; // All possible valid states
  }

  // To check the current state is a valid solution or not
  isSolution(state) {
    // Replace this placeholder return statement
    // with your code to check this solution
    return false;
  }

  // To check the current choice is a valid choice or not
  isValid(choice) {
    // Replace this placeholder return statement
    // with your code to check the validity of this choice
    return false;
  }

  // We can use this function to evaluate all the states and store the valid states
  dfs() {
    if (this.isSolution(this.state)) {
      res.push(this.state); // e.g. add a copy of the state to final result list
      return;
    }
    for (let choice in this.choices) {
      if (this.isValid(choice)) {
        this.state.push(choice); // make move
        this.dfs(this.state);
        this.state.pop(); // backtrack
      }
    }
  }
}
