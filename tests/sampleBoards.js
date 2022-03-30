const { buildBoard } = require("../utils/utils");

module.exports = {
  boardWithWinAvailable: function () {
    const boardArray = buildBoard();
    boardArray[1][5] = "o";
    boardArray[2][5] = "o";
    boardArray[3][5] = "o";
    boardArray[5][5] = "x";
    return boardArray;
  },
  boardWithVerticalAndHorizontalWinsAvailable: function () {
    const boardArray = buildBoard();
    boardArray[1][5] = "o";
    boardArray[2][5] = "o";
    boardArray[2][4] = "o";
    boardArray[2][3] = "o";
    boardArray[3][5] = "o";
    boardArray[5][5] = "x";
    return boardArray;
  },
  boardWithDiagonalAndHorizontalWinsAvailable: function () {
    const boardArray = buildBoard();
    boardArray[1][5] = "o";
    boardArray[2][5] = "o";
    boardArray[2][4] = "o";
    boardArray[3][4] = "x";
    boardArray[4][5] = "x";
    boardArray[4][4] = "o";
    boardArray[4][3] = "x";
    boardArray[4][2] = "o";
    boardArray[2][3] = "x";
    boardArray[3][5] = "o";
    boardArray[5][5] = "x";
    return boardArray;
  },
};
