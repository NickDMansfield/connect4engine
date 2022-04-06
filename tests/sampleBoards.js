const {
  buildBoard,
  getRandomAvailableColumn,
  dropTokenInColumn,
} = require("../utils/utils");
const { isSpotAWinner } = require("../brain/logic");

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
  randomBoard: function (numberOfTokensToPlace, allowWin = false) {
    const boardArray = buildBoard();
    let numberOfTokensPlaced = 0;
    while (numberOfTokensPlaced < numberOfTokensToPlace) {
      let targetColumn = getRandomAvailableColumn(boardArray);
      const tokenValue =
        numberOfTokensPlaced === 0 || numberOfTokensPlaced % 2 === 0 ? 1 : "0";
      if (!allowWin) {
        // We don't want a winning state, so we do a while to ensure it won't happen
        const usedIndices = [targetColumn.index];
        while (
          isSpotAWinner(
            targetColumn.index,
            targetColumn.dropIndex,
            boardArray,
            tokenValue
          )
        ) {
          targetColumn = getRandomAvailableColumn(boardArray, usedIndices);
          if (targetColumn.index === -1) {
            // No available moves that won't end the game, so we term early
            return boardArray;
          }
          // try the column
          usedIndices.push(targetColumn.index);
        }
      }
      dropTokenInColumn(boardArray, targetColumn.index, tokenValue);
      numberOfTokensPlaced++;
    }
    return boardArray;
  },
};
