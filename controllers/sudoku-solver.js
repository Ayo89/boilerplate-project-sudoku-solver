class SudokuSolver {
  validate(puzzleString) {
    const regexPuzzle = /^[1-9.]+$/;

    if (puzzleString.length !== 81) {
      console.log(puzzleString.length);
      return { valid: false, msg: "Expected puzzle to be 81 characters long" };
    }

    if (!regexPuzzle.test(puzzleString)) {
      console.log(puzzleString.length);
      return { valid: false, msg: "Invalid characters in puzzle" };
    }

    let board = [];

    for (let i = 0; i < 9; i++) {
      board[i] = puzzleString.slice(i * 9, (i + 1) * 9).split("");
    }

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let value = board[i][j];
        if (value !== ".") {
          board[i][j] = ".";
          if (
            !this.checkRowPlacement(board, i, value) ||
            !this.checkColPlacement(board, j, value) ||
            !this.checkRegionPlacement(board, i, j, value)
          ) {
            return { valid: false, msg: "Invalid puzzle" };

          }
          board[i][j] = value;
        }
      }
    }
    console.log(puzzleString);
    return { valid: true, board: board };
  }

  checkRowPlacement(puzzleString, row, value) {
    for (let i = 0; i < 9; i++) {
      if (puzzleString[row][i] === value) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, column, value) {
    for (let i = 0; i < 9; i++) {
      if (puzzleString[i][column] === value) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(column / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (puzzleString[startRow + i][startCol + j] === value) {
          return false;
        }
      }
    }
    return true;
  }

  solve(puzzleString) {
    
      const validation = this.validate(puzzleString);
      if (!validation.valid) {
        return { valid: false, msg: "Invalid puzzle" };

      }
      let board = validation.board;

    function isSafe(row, col, num) {
      for (let i = 0; i < 9; i++) {
        if (board[row][i] == num || board[i][col] == num) {
          return false;
        }
      }
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[startRow + i][startCol + j] == num) {
            return false;
          }
        }
      }
      return true;
    }

    function solveSudoku() {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === '.') {
            for (let num = 1; num <= 9; num++) {
              if (isSafe(row, col, num.toString())) {
                board[row][col] = num.toString();
                if (solveSudoku()) {
                  return true;
                }
                board[row][col] = '.';
              }
            }
            return false;
          }
        }
      }
      return true;
    }

    if (solveSudoku()) {
      return board.map(row => row.join('')).join('');
    } else {
      return { valid: false, msg: "No solution exist" };

    }
  }


}

module.exports = SudokuSolver;
