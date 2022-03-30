const sampleBoards = require("./tests/sampleBoards.js");
const utils = require("./utils/utils.js");
const boardArray = sampleBoards.boardWithWinAvailable();

let winningMoves = [];
let losingMoves = [];

function decideMove(boardState) {
  let availableColumns = utils.getFreshColumnArray();
  // If you have a winning move, take it
  // Remove all losing moves
  // Can my opponent win next turn?
  //    If so, select from block options
  // Can I set up a win for next turn?
  //    Verify that it doesn't create a win condition for the opponent
  //    Does it break one of your captured columns?
  // Can you capture a column/create a deadzone?
}

function analyzeBoardState(boardState) {}

utils.showBoard(boardArray);
