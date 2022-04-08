const utils = require("../utils/utils");

const isSpotAWinner = function (
  colIndex,
  rowIndex,
  boardState,
  valToCheck = 1
) {
  // Identify all potential wins that could involve the spot
  // Test horizontals
  // console.log("COL IND:" + colIndex);
  // console.log("ROW IND:" + rowIndex);
  let leftIsViable = true;
  let rightIsViable = true;
  let horizontalBounds = [0, 0];

  let verticalIsViable = true;
  let verticalBounds = [0, 0];

  let northwestDiagIsViable = true;
  let southeastDiagIsViable = true;
  let diagNWHorBounds = [0, 0];

  let northEastDiagIsViable = true;
  let southWestDiagIsViable = true;
  let diagNEHorBounds = [0, 0];

  for (let colIndexMod = 1; colIndexMod <= 4; ++colIndexMod) {
    if (leftIsViable) {
      let testCellResult = utils.getValueOfRelativeCell(
        boardState,
        colIndex,
        rowIndex,
        -colIndexMod,
        0
      );
      // console.log(testCellResult);
      if (!testCellResult[0] || testCellResult[1] != valToCheck) {
        leftIsViable = false;
        horizontalBounds[0] = -colIndexMod + 1;
      }
    }
    if (rightIsViable) {
      let testCellResult = utils.getValueOfRelativeCell(
        boardState,
        colIndex,
        rowIndex,
        colIndexMod,
        0
      );
      //console.log(testCellResult);
      if (!testCellResult[0] || testCellResult[1] != valToCheck) {
        rightIsViable = false;
        horizontalBounds[1] = colIndexMod - 1;
      }
    }

    // Test vertical
    if (verticalIsViable) {
      let testCellResult = utils.getValueOfRelativeCell(
        boardState,
        colIndex,
        rowIndex,
        0,
        colIndexMod
      );
      //console.log(testCellResult);
      if (!testCellResult[0] || testCellResult[1] != valToCheck) {
        verticalIsViable = false;
        verticalBounds[1] = colIndexMod - 1;
      }
    }
    // Test Diagonals

    if (northEastDiagIsViable) {
      let testCellResult = utils.getValueOfRelativeCell(
        boardState,
        colIndex,
        rowIndex,
        colIndexMod,
        -colIndexMod
      );
      //console.log(testCellResult);
      if (!testCellResult[0] || testCellResult[1] != valToCheck) {
        northEastDiagIsViable = false;
        diagNEHorBounds[1] = colIndexMod - 1;
      }
    }

    if (northwestDiagIsViable) {
      let testCellResult = utils.getValueOfRelativeCell(
        boardState,
        colIndex,
        rowIndex,
        -colIndexMod,
        -colIndexMod
      );
      //console.log(testCellResult);
      if (!testCellResult[0] || testCellResult[1] != valToCheck) {
        northwestDiagIsViable = false;
        diagNWHorBounds[0] = -colIndexMod + 1;
      }
    }

    if (southeastDiagIsViable) {
      let testCellResult = utils.getValueOfRelativeCell(
        boardState,
        colIndex,
        rowIndex,
        colIndexMod,
        colIndexMod
      );
      //console.log(testCellResult);
      if (!testCellResult[0] || testCellResult[1] != valToCheck) {
        southeastDiagIsViable = false;
        diagNWHorBounds[1] = colIndexMod - 1;
      }
    }

    if (southWestDiagIsViable) {
      let testCellResult = utils.getValueOfRelativeCell(
        boardState,
        colIndex,
        rowIndex,
        -colIndexMod,
        colIndexMod
      );
      //console.log(testCellResult);
      if (!testCellResult[0] || testCellResult[1] != valToCheck) {
        southWestDiagIsViable = false;
        diagNEHorBounds[0] = -colIndexMod + 1;
      }
    }
    //console.log("HORbO:" + horizontalBounds);
    if (
      horizontalBounds[1] - horizontalBounds[0] >= 3 ||
      verticalBounds[1] - verticalBounds[0] >= 3 ||
      diagNEHorBounds[1] - diagNEHorBounds[0] >= 3 ||
      diagNWHorBounds[1] - diagNWHorBounds[0] >= 3
    ) {
      return true;
    }
  }
};
const findWinningMoves = function (boardState, valToCheck = 1) {
  let availableMoves = utils.getAvailableColumns(boardState);
  let winningMoves = [];
  // console.log(utils.showBoard(boardState));
  for (let columnToCheck of availableMoves) {
    //  console.log(columnToCheck);
    // console.log(utils.getIndexOfDropPointInColumn(boardState[columnToCheck]));
    if (
      isSpotAWinner(
        columnToCheck,
        utils.getIndexOfDropPointInColumn(boardState[columnToCheck]),
        boardState,
        valToCheck
      )
    ) {
      winningMoves.push(columnToCheck);
    }
  }
  return winningMoves;
};

const findLosingMoves = function (boardState, opponentsValToCheck = 0) {
  let availableMoves = utils.getFreshColumnArray();
  let losingMoves = [];
  //  console.log(utils.showBoard(boardState));
  for (let columnToCheck of availableMoves) {
    //  console.log(columnToCheck);
    // console.log(utils.getIndexOfDropPointInColumn(boardState[columnToCheck]));
    let dropRow = utils.getIndexOfDropPointInColumn(boardState[columnToCheck]);
    if (
      dropRow > 0 &&
      isSpotAWinner(
        columnToCheck,
        dropRow - 1,
        boardState,
        opponentsValToCheck.toString()
      )
    ) {
      losingMoves.push(columnToCheck);
    }
  }
  return losingMoves;
};

module.exports = {
  decideMove: function (boardState, valToCheck = 1) {
    utils.showBoard(boardState);
    let availableColumns = utils.getAvailableColumns(boardState);
    // Filter out columns which are maxed out
    console.log(availableColumns);
    winningMoves = findWinningMoves(boardState, valToCheck);
    console.log("winning moves:" + winningMoves);
    // If you have a winning move, take it
    if (winningMoves.length > 0) {
      return winningMoves[0];
    }
    // Remove all losing moves
    losingMoves = findLosingMoves(boardState, valToCheck === 1 ? 0 : 1);
    availableColumns = availableColumns.filter((c) => !losingMoves.includes(c));
    console.log("post losing moves:" + availableColumns);
    console.log("type in arr:" + typeof availableColumns[2]);
    // Can my opponent win next turn?
    opponentsWinningMoves = findWinningMoves(
      boardState,
      valToCheck === 1 ? 0 : 1
    );
    console.log("owm: " + opponentsWinningMoves);
    //    If so, select from block options
    //        For each blocking move, determine if the opponent can still win afterwards. Elliminate it if so
    let blockingMoves = opponentsWinningMoves.filter((owm) => {
      console.log("owm type:" + typeof owm);
      console.log(availableColumns.includes(owm));
      return availableColumns.includes(owm);
    });
    console.log("blocking moves:" + blockingMoves);
    if (blockingMoves.length) {
      if (blockingMoves.length == 1) {
        return blockingMoves[0];
      }
      // We have multiple blocking options
      availableColumns = blockingMoves;
    }
    console.log("ac after blocking: " + availableColumns);
    // Can I set up a win for next turn?
    let winningNextTurnAvailableMoves = availableColumns.filter(
      (ac) =>
        findWinningMoves(
          utils.dropTokenInColumn(
            JSON.parse(JSON.stringify(boardState)),
            ac,
            valToCheck
          ),
          valToCheck
        ).length > 0
    );
    console.log("awm:" + winningNextTurnAvailableMoves);
    if (winningNextTurnAvailableMoves.length) {
      if (winningNextTurnAvailableMoves.length == 1) {
        return winningNextTurnAvailableMoves[0];
      }
      availableColumns = winningNextTurnAvailableMoves;
    }
    //    Does it break one of your captured columns?
    // Can you capture a column/create a deadzone?
    return availableColumns.length ? availableColumns[0] : -1;
  },
  findWinningMoves,
  isSpotAWinner,
  findLosingMoves,
};
