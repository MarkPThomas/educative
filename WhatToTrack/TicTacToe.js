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
    this.n = n;
    this.movesPlayed = 0;
    this.player1 = {
      rows: Array(n).fill(0),
      cols: Array(n).fill(0),
      diagonal: 0,
      antiDiagonal: 0
    }
    this.player2 = {
      rows: Array(n).fill(0),
      cols: Array(n).fill(0),
      diagonal: 0,
      antiDiagonal: 0
    }
  }

  // T: O(1)
  // S: O(1)
  move(row, col, player) {
    function updateBoard(row, col, board, n) {
      board.cols[col]++;
      board.rows[row]++;
      if (row === col) {
        board.diagonal++;
      } else if (row === n - 1 - col) {
        board.antidiagonal++;
      }
    }

    function isWinning(row, col, board, n) {
      return board.cols[col] === n
        || board.rows[row] === n
        || board.diagonal === n
        || board.antidiagonal === n;
    }

    const playerBoard = player === 1 ? this.player1 : this.player2;
    updateBoard(row, col, playerBoard, this.n);

    this.movesPlayed++;
    if (this.movesPlayed >= 2 * this.n - 1) {
      return isWinning(row, col, playerBoard, this.n) ? player : 0;
    } else {
      return 0;
    }
  }
}

export default TicTacToe