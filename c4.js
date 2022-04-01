const sampleBoards = require("./tests/sampleBoards.js");
const utils = require("./utils/utils.js");
const boardArray = sampleBoards.boardWithLossAvailable();
const logic = require("./brain/logic");

let winningMoves = [];
let losingMoves = [];
let opponentsWinningMoves = [];

function decideMove(boardState) {
  let availableColumns = utils.getFreshColumnArray();
  console.log(availableColumns);
  winningMoves = logic.findWinningMoves(boardState);
  console.log(winningMoves);
  // If you have a winning move, take it
  if (winningMoves.length > 0) {
    return winningMoves[0];
  }
  // Remove all losing moves
  losingMoves = logic.findLosingMoves(boardState);
  availableColumns = availableColumns.filter((c) => !losingMoves.includes(c));
  console.log(availableColumns);
  // Can my opponent win next turn?
  opponentsWinningMoves = logic.findWinningMoves(boardState, 0);
  //    If so, select from block options
  //        For each blocking move, determine if the opponent can still win afterwards. Elliminate it if so
  let blockingMoves = opponentsWinningMoves.filter((owm) => {
    availableColumns.includes(owm);
  });
  if (blockingMoves.length) {
    if (blockingMoves.length == 1) {
      return blockingMoves[0];
    }
    // We have multiple blocking options
    availableColumns = blockingMoves;
  }
  // Can I set up a win for next turn?
  let winningNextTurnAvailableMoves = availableColumns.filter(
    (ac) =>
      logic.findWinningMoves(
        utils.dropTokenInColumn(JSON.parse(JSON.stringify(boardState)), ac, 1),
        1
      ).length > 0
  );
  if (winningNextTurnAvailableMoves.length) {
    if (winningNextTurnAvailableMoves.length == 1) {
      return winningNextTurnAvailableMoves[0];
    }
    availableColumns = winningNextTurnAvailableMoves;
  }
  //    Does it break one of your captured columns?
  // Can you capture a column/create a deadzone?
}

function analyzeBoardState(boardState) {}

decideMove(boardArray);
//utils.showBoard(boardArray);
