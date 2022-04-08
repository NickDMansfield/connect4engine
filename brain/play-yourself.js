const sampleBoards = require("../tests/sampleBoards.js");
const utils = require("../utils/utils.js");
const boardArray = sampleBoards.boardWithLossAvailable();
const logic = require("./logic");

module.exports = {
  playGame: function (turns) {
    const board = utils.buildBoard();
    for (
      let numberOfTokensPlaced = 0;
      numberOfTokensPlaced < turns;
      ++numberOfTokensPlaced
    ) {
      const tokenValue =
        numberOfTokensPlaced === 0 || numberOfTokensPlaced % 2 === 0 ? 1 : "0";
      utils.dropTokenInColumn(
        board,
        logic.decideMove(board, tokenValue),
        tokenValue
      );
      utils.showBoard(board);
    }
  },
};
