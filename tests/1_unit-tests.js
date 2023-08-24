const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();

suite("Unit Tests", () => {
  suite("Sudoku Solver Tests", () => {
    suite("Function validate(puzzleString)", () => {
      test("should return invalid when puzzleString is not 81 characters", () => {
        const invalidPuzzle =
          "1..2..3..4..5..6..7..8..9..1..2..3..4..5..6..7..8";
        const result = solver.validate(invalidPuzzle);
        assert.equal(result.valid, false);
        assert.equal(result.msg, "Expected puzzle to be 81 characters long");
      });

      test("should return invalid when puzzleString contains invalid characters", () => {
        const invalidPuzzle =
          "5.9..6..3.8..2..7....3..4..a..1.7.....5.6.....8.2.....4..9....5..3..2.1..4..6.7..";

        const result = solver.validate(invalidPuzzle);
        assert.equal(result.valid, false);
        assert.equal(result.msg, "Invalid characters in puzzle");
      });

      test("should return valid when puzzleString is a valid puzzle", () => {
        const validPuzzle =
          "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3";
        const result = solver.validate(validPuzzle);

        assert.equal(result.valid, true);
      });
    });
  });

  suite("SudokuSolver", function () {
    const solver = new Solver();

    suite("solve", function () {
      

      test("should return an error for an invalid puzzle", function () {
        const puzzleString =
          "53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....415..5....8..7.";

        const result = solver.solve(puzzleString);

        assert.strictEqual(result.msg, "Invalid puzzle");
      });

      test("Should solve a valid row" , function() {
        const puzzleString =
          "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
        const expectedSolution = "135762984946381257728459613694517832812936745357824196473298561581673429269145378";

        const board = solver.validate(puzzleString).board
        const canPlace = solver.checkRowPlacement(board, 'A', '3');
        assert.strictEqual(canPlace, true);
      })

      test("Should solve a invalid row", function () {
        const puzzleString =
          "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
        const expectedSolution = "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
        const board = solver.validate(puzzleString).board
        const canPlace = solver.checkRowPlacement(board, 'A', '4');
        assert.strictEqual(canPlace, false);
      })


      test("Should solve a valid col", function () {
        const puzzleString =
          "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
        const expectedSolution = "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
        const board = solver.validate(puzzleString).board
        const canPlace = solver.checkColPlacement(board,  1, '4');
        assert.strictEqual(canPlace, true);
      })

      test("Should solve a invalid col", function () {
        const puzzleString =
          "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
        const expectedSolution = "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
        const board = solver.validate(puzzleString).board
        const canPlace = solver.checkColPlacement(board, 1, '9');
        assert.strictEqual(canPlace, false);
      })

      test("Should solve a valid region", function () {
        const puzzleString =
          "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
        const expectedSolution = "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
        const board = solver.validate(puzzleString).board
        const canPlace = solver.checkRegionPlacement(board, 'D', 0, '4');
        assert.strictEqual(canPlace, true);
      })
      test("Should solve a invalid region", function () {
        const puzzleString =
          "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
        const expectedSolution = "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
        const board = solver.validate(puzzleString).board
        const canPlace = solver.checkRegionPlacement(board, 'D', 1, '9');
        assert.strictEqual(canPlace, false);
      })

      test("should solve a valid puzzle", function () {
        const puzzleString =
          "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
        const expectedSolution =
          "135762984946381257728459613694517832812936745357824196473298561581673429269145378";

        const result = solver.solve(puzzleString);

        assert.strictEqual(result, expectedSolution);
      });

        
    });
  });
});
