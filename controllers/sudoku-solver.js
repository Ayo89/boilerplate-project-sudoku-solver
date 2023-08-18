class SudokuSolver {
  validate(puzzleString) {
    const regexPuzzle = /^[1-9.]+$/;

    if (puzzleString.length < 81) {
      return { valid: false, msg: "Expected puzzle to be 81 characters long" };
    }

    else if (!regexPuzzle.test(puzzleString)) {
      console.log(puzzleString)
      return { valid: false, msg: "Invalid characters in puzzle" };
    }
    else if (puzzleString === "" || puzzleString === undefined)
      return { valid: false, msg: "Required field missing" };

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
            !this.checkRowPlacement(board, i, j, value) ||
            !this.checkColPlacement(board, i, j, value) ||
            !this.checkRegionPlacement(board, i, j, value)
          ) {
            return "Invalid puzzle";
          }
          board[i][j] = value;
        }
      }
    }
    return { valid: true, board: board };
  }

  checkRowPlacement(puzzleString, row, column, value) {
    for (let i = 0; i < 9; i++) {
      if (puzzleString[row][i] === value) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    for (let i = 0; i < 9; i++) {
      if (puzzleString[i][column] === value) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
