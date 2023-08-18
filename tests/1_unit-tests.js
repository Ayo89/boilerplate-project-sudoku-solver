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
        console.log(result);
        assert.equal(result.valid, false);
        assert.equal(result.msg, "Expected puzzle to be 81 characters long");
      });

      test("should return invalid when puzzleString contains invalid characters", () => {
        const invalidPuzzle = "1..2..3..4..5..6..7..8..9.1..2..3..4..5..6..7..8..9..a..2..3..4..5";
        const result = solver.validate(invalidPuzzle);
        assert.equal(result.valid, false);
        assert.equal(result.msg, "Invalid characters in puzzle");
      });

      test("should return valid when puzzleString is a valid puzzle", () => {
        const validPuzzle =
          "5.9..6..3.8..2..7....3..4.....1.7.....5.6.....8.2.....4..9....5..3..2.1..4..6.7";
        const result = solver.validate(validPuzzle);
        result.should.have.property("valid").equal(true);
      });
    });
  });
  //Luego de tener el código de prueba listo, ejecuta las pruebas utilizando el comando mocha en la línea de comandos. Si todo está configurado correctamente, verás los resultados de las pruebas en la terminal.
});
