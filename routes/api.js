"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    const { puzzle, row, column, value } = req.body;

    if (!puzzle || !row || !column || !value) {
      return res.json("missing required fields");
    }

    const rowConverted = solver.convertRowCharToNum(row);
    const columnConverted = parseInt(column) - 1;
    const valueConverted = parseInt(value)
    if (
      solver.validate(puzzle).msg === "Expected puzzle to be 81 characters long"
    ) {
      return res.json("Expected puzzle to be 81 characters long");
    }

    if (solver.validate(puzzle).msg === "Invalid characters in puzzle") {
      return res.json("Invalid characters in puzzle");
    }
    let conflicts = [];

    if (valueConverted < 1 || valueConverted > 9) {
      conflicts.push("value");
    }

    if (
      !solver.checkRowPlacement(puzzle, rowConverted, columnConverted, value) ||
      rowConverted === -1
    ) {
      conflicts.push("row");
    }

    if (
      !solver.checkColPlacement(puzzle, rowConverted, columnConverted, value) ||
      isNaN(columnConverted) ||
      columnConverted < 0 ||
      columnConverted > 8
    ) {
      conflicts.push("column");
    }

    if (
      !solver.checkRegionPlacement(puzzle, rowConverted, columnConverted, value)
    ) {
      conflicts.push("region");
    }

    if (conflicts.length > 0) {
      return res.json({ valid: false, conflict: conflicts });
    }

    if (!solver.validate(puzzle)) {
      return res.json({ error: "Invalid puzzle" });
    }

    res.json({ valid: true });
  });

  app.route("/api/solve").post((req, res) => {
    const puzzle = req.body.puzzle;

    if (
      solver.validate(puzzle).msg === "Expected puzzle to be 81 characters long"
    ) {
      return res.status(200).json("Expected puzzle to be 81 characters long");
    }

    if (solver.validate(puzzle).msg === "Invalid characters in puzzle") {
      return res.status(200).json("Invalid characters in puzzle");
    }

    if (solver.validate(puzzle).msg === "Invalid puzzle") {
      return res.status(200).json("Cannot be solved");
    }

    try {
      const solution = solver.solve(puzzle);
      return res.status(200).json(solution);
    } catch (error) {
      if (error) {
        return res.status(200).json("Cannot be solved");
      }
    }
  });
};
