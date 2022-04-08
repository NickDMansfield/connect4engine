const sampleBoards = require("./sampleBoards");
const logic = require("../brain/logic");
const utils = require("../utils/utils");

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
//console.log(resultWinningMoves);
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
//console.log(resultWinningMoves);
console.log(
  resultWinningMoves.length === 2 &&
    resultWinningMoves[0] === 0 &&
    resultWinningMoves[1] === 3
);

console.log("Testing findLosingMoves");
console.log("Horizontal loss");
let resultLosingMoves = logic.findLosingMoves(
  sampleBoards.boardWithLossAvailable()
);
//console.log(resultLosingMoves);
console.log(resultLosingMoves.length === 1 && resultLosingMoves[0] === 3);

console.log("Testing DecideMoves");

function testDecideMoves() {
  const boardsToTestDecideMoves = [
    {
      board: [
        ["*", "*", "*", "*", "*", "*"],
        ["0", "0", 1, "0", "0", "0"],
        [1, 1, 1, "0", 1, "0"],
        ["0", 1, "0", 1, "0", 1],
        ["*", "*", "0", 1, "0", 1],
        ["0", 1, "0", 1, 1, "0"],
        ["*", "*", "*", "*", 1, 1],
      ],
      expectedColumnIndex: 4,
      behaviorTested: "Wins on 4 and 6. Selects 4",
    },
    {
      board: [
        ["*", "*", "*", "*", "*", "*"],
        [1, 1, "0", 1, 1, "0"],
        [1, 1, "0", "0", 1, "0"],
        ["*", "0", "0", 1, 1, 1],
        ["*", "*", "*", "0", "0", "0"],
        [1, "0", "0", 1, 1, 1],
        ["*", "*", "0", 1, "0", "0"],
      ],
      expectedColumnIndex: 4,
      behaviorTested: "Blocks on 4. No wins available",
    },
  ];
  for (let boardToTest of boardsToTestDecideMoves) {
    let resultColumnIndex = logic.decideMove(boardToTest.board);
    console.log(boardToTest.expectedColumnIndex === resultColumnIndex);
    if (boardToTest.expectedColumnIndex !== resultColumnIndex) {
      console.log("Test failure: " + boardToTest.behaviorTested);
      console.log(
        "Expected: " +
          boardToTest.expectedColumnIndex +
          " Got: " +
          resultColumnIndex
      );
    }
  }
}
testDecideMoves();

console.log("Testing ReverseShownBoard");
const boardToReverse =
  "*11**1*\r\n" +
  "*110*0*\r\n" +
  "*000*00\r\n" +
  "*101011\r\n" +
  "*111010\r\n" +
  "*001010";
const reversedBoard = utils.reverseShownBoard(boardToReverse);
const dereversedBoard = utils.showBoard(reversedBoard);
//console.log("b2re:\r\n" + boardToReverse);
//console.log(reversedBoard);
//console.log("dere:\r\n" + dereversedBoard);
//console.log(boardToReverse == dereversedBoard);
console.log(reversedBoard[5][0] === 1);
console.log(reversedBoard[4][3] === 0);
console.log(reversedBoard[2][2] === 0);
