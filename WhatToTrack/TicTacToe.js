// Suppose that two players are playing a tic-tac-toe game on an n×n board.

// They’re following specific rules to play and win the game.

// A move is guaranteed to be valid if a mark is placed on an empty block.

// No more moves are allowed once a winning condition is reached.

// A player who succeeds in placing n of their marks in a horizontal, vertical, or diagonal row wins the game.

// Your task is to implement a TicTacToe class, which will be used by two players to play the game and win fairly.

// Keep in mind the following functionalities that need to be implemented:

// The TicTacToe class, which declares an object to create the board.

// Init (n), which initializes the object of TicTacToe to create the board of size n.

// Move (row, col, player) indicates that the player with ID player plays at the board’s cell (row,col).

// The move is guaranteed to be a valid move.

// At each move, this function returns the player ID if any player wins and returns  if no one wins.

// Constraints:
// 3 ≤ n ≤ 9
// The player should be either 1 or 2.
// 0 ≤ row, col < n
// Every call to move() will be with a unique row, col combination.
// The move function will be called at most n^2  times.

// T: O(n)
// S: O(n)
class TicTacToe {
  // T: O(n)
  // S: O(n)
  constructor(n) {
    this.rows = Array(n).fill(0);
    this.cols = Array(n).fill(0);
    this.diagonal = 0;
    this.antiDiagonal = 0;
    this.movesPlayed = 0;
  }

  // T: O(1)
  // S: O(1)
  move(row, col, player) {
    // Use these values to work out balance of scores as this is a zero-sum game
    const currentPlayer = player === 1 ? 1 : -1;
    this.cols[col] += currentPlayer;
    this.rows[row] += currentPlayer;

    const n = this.rows.length;
    if (row === col) {
      this.diagonal += currentPlayer;
    } else if (row === n - 1 - col) {
      this.antidiagonal += currentPlayer;
    }

    this.movesPlayed++;
    if (this.movesPlayed >= 2 * n - 1) {
      return (Math.abs(this.cols[col]) === n
        || Math.abs(this.rows[row]) === n
        || Math.abs(this.diagonal) === n
        || Math.abs(this.antidiagonal) === n) ? player : 0;
    } else {
      return 0;
    }
  }
}

export default TicTacToe