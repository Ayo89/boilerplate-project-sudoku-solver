'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

app.route("/api/check").post((req, res) => {
  const { puzzle, row, column, value } = req.body;

  // Validaciones básicas.
  if (
    !puzzle ||
    typeof row === "undefined" ||
    typeof column === "undefined" ||
    !value
  ) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  const validationResult = solver.validate(puzzle);
  if (!validationResult.valid) {
    return res.status(400).json({ error: validationResult.msg });
  }

  if (row < 0 || row > 8 || column < 0 || column > 8) {
    return res.status(400).json({ error: "Invalid placement coordinate" });
  }

  if (value < 1 || value > 9) {
    return res.status(400).json({ error: "Invalid placement value" });
  }

  const isPlacementValid = solver.checkSinglePlacement(
    validationResult.board,
    row,
    column,
    value
  );
  if (isPlacementValid) {
    return res.status(200).json({ valid: true });
  } else {
    return res
      .status(200)
      .json({ valid: false, conflict: ["row", "column", "region"] });
    // Nota: Si quieres identificar específicamente el conflicto (fila, columna o región),
    // puedes modificar el método `checkSinglePlacement` para devolver la información específica.
  }
});

    
  app.route('/api/solve')
    .post((req, res) => {
      const puzzle = req.body.puzzle

      if (solver.validate(puzzle).msg === "Expected puzzle to be 81 characters long") {
        return res.status(200).json("Expected puzzle to be 81 characters long")
      }

      if (solver.validate(puzzle).msg === "Invalid characters in puzzle") {
        return res.status(200).json("Invalid characters in puzzle")
      }

      if (solver.validate(puzzle).msg === "Invalid puzzle") {
        return res.status(200).json("Cannot be solved")
      }

      try {
        const solution = solver.solve(puzzle)
        return res.status(200).json(solution)
      } catch (error) {
        if (error) {
          return res.status(200).json("Cannot be solved")
        }
      }

    });
};



