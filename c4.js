const sampleBoards = require("./tests/sampleBoards.js");
const utils = require("./utils/utils.js");
const boardArray = sampleBoards.boardWithLossAvailable();
const logic = require("./brain/logic");

let winningMoves = [];
let losingMoves = [];

function decideMove(boardState) {
  let availableColumns = utils.getFreshColumnArray();
  console.log(availableColumns);
  winningMoves = logic.findWinningMoves(boardState);
  console.log(winningMoves);
  // If you have a winning move, take it
  if (winningMoves.length > 0) {
    return winningMoves;
  }
  // Remove all losing moves
  losingMoves = logic.findLosingMoves(boardState);
  availableColumns = availableColumns.filter((c) => !losingMoves.includes(c));
  console.log(availableColumns);
  // Can my opponent win next turn?
  //    If so, select from block options
  // Can I set up a win for next turn?
  //    Verify that it doesn't create a win condition for the opponent
  //    Does it break one of your captured columns?
  // Can you capture a column/create a deadzone?
}

function analyzeBoardState(boardState) {}

decideMove(boardArray);
//utils.showBoard(boardArray);
