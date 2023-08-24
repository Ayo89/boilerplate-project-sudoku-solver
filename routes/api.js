'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

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



