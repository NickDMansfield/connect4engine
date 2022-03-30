const sampleBoards = require("./sampleBoards");
const logic = require("../brain/logic");

console.log("Testing findWinningMoves");
console.log("Horizontal wins");
let resultWinningMoves = logic.findWinningMoves(
  sampleBoards.boardWithWinAvailable()
);
console.log(resultWinningMoves);
console.log(
  resultWinningMoves.length === 2 &&
    resultWinningMoves[0] === 0 &&
    resultWinningMoves[1] === 4
);

console.log("Horizontal and vertical wins");
resultWinningMoves = logic.findWinningMoves(
  sampleBoards.boardWithVerticalAndHorizontalWinsAvailable()
);
console.log(resultWinningMoves);
console.log(
  resultWinningMoves.length === 3 &&
    resultWinningMoves[0] === 0 &&
    resultWinningMoves[1] === 2 &&
    resultWinningMoves[2] === 4
);

console.log("Horizontal and Diagonal wins");
resultWinningMoves = logic.findWinningMoves(
  sampleBoards.boardWithDiagonalAndHorizontalWinsAvailable()
);
console.log(resultWinningMoves);
console.log(
  resultWinningMoves.length === 2 &&
    resultWinningMoves[0] === 0 &&
    resultWinningMoves[1] === 3
);
