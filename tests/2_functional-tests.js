const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
const solution = '135762984946381257728459613694517832812936745357824196473298561581673429269145378'
const invalidCharacters = "5.9..6..3.8..2..7....3..4..a..1.7.....5.6.....8.2.....4..9....5..3..2.1..4..6.7.."
const invalidLength = "1..2..3..4..5..6..7..8..9..1..2..3..4..5..6..7..8"
const noSolution = "..12.6...6..7..8..7...5...9..7.1.3......9.2.....4.8.7..9...6...1..6..7..4...4.2.."
suite("Functional Tests", () => {
    suite("POST to /api/solve", () => {
        test("Solve a puzzle with valid puzzle string", done => {
            chai
                .request(server)
                .post("/api/solve")
                .send({ puzzle: puzzleString })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.strictEqual(res.body, solution);
                    done();
                });
        });

        test("Solve a puzzle with invalid character", done => {
            chai
                .request(server)
                .post("/api/solve")
                .send({ puzzle: invalidCharacters })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.strictEqual(res.body, 'Invalid characters in puzzle');
                    done();
                });
        });

        test("Solve a puzzle with invalid length", done => {
            chai
                .request(server)
                .post("/api/solve")
                .send({ puzzle: invalidLength })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.strictEqual(res.body, 'Expected puzzle to be 81 characters long');
                    done();
                });
        });
        
        test("Solve a puzzle with invalid length", done => {
            chai
                .request(server)
                .post("/api/solve")
                .send({ puzzle: noSolution })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.strictEqual(res.body, 'Cannot be solved');
                    done();
                });
        });
    });
});
