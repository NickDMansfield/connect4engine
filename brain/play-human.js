const logic = require("./logic");
const sampleBoards = require("../tests/sampleBoards.js");
const utils = require("../utils/utils.js");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const executeTurn = function (boardState, turnSymbol) {
  readline.question(`Pick a column 0-6 `, (colIndex) => {
    boardState = utils.dropTokenInColumn(boardState, colIndex, turnSymbol);
    // do PC's move
    const moveIndex = logic.decideMove(boardState, turnSymbol);
    boardState = utils.dropTokenInColumn(boardState, moveIndex, utils.getOppositeSymbol(turnSymbol));
    //readline.close();
    executeTurn(boardState, turnSymbol);
    utils.showBoard(boardState);
  });
};
executeTurn(utils.buildBoard(), 1);
module.exports = {};
