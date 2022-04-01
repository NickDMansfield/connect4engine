const { buildBoard } = require("../utils/utils");

module.exports = {
  boardWithWinAvailable: function () {
    const boardArray = buildBoard();
    boardArray[1][5] = 1;
    boardArray[2][5] = 1;
    boardArray[3][5] = 1;
    boardArray[5][5] = 0;
    return boardArray;
  },
  boardWithVerticalAndHorizontalWinsAvailable: function () {
    const boardArray = buildBoard();
    boardArray[1][5] = 1;
    boardArray[2][5] = 1;
    boardArray[2][4] = 1;
    boardArray[2][3] = 1;
    boardArray[3][5] = 1;
    boardArray[5][5] = 0;
    return boardArray;
  },
  boardWithDiagonalAndHorizontalWinsAvailable: function () {
    const boardArray = buildBoard();
    boardArray[1][5] = 1;
    boardArray[2][5] = 1;
    boardArray[2][4] = 1;
    boardArray[3][4] = 0;
    boardArray[4][5] = 0;
    boardArray[4][4] = 1;
    boardArray[4][3] = 0;
    boardArray[4][2] = 1;
    boardArray[2][3] = 0;
    boardArray[3][5] = 1;
    boardArray[5][5] = 0;
    return boardArray;
  },
  boardWithLossAvailable: function () {
    const boardArray = buildBoard();
    boardArray[1][5] = 1;
    boardArray[2][5] = 0;
    boardArray[5][5] = 0;
    boardArray[1][4] = 0;
    boardArray[2][4] = 0;
    boardArray[4][5] = 0;
    boardArray[4][4] = 0;
    return boardArray;
  },
};
