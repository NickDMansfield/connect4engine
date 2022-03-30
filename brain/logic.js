const utils = require("../utils/utils");

module.exports = {
  findWinningMoves: function (boardState) {
    let availableMoves = utils.getFreshColumnArray();
    let winningMoves = [];
    console.log(utils.showBoard(boardState));
    for (let columnToCheck of availableMoves) {
      //  console.log(columnToCheck);
      // console.log(utils.getIndexOfDropPointInColumn(boardState[columnToCheck]));
      if (
        this.isSpotAWinner(
          columnToCheck,
          utils.getIndexOfDropPointInColumn(boardState[columnToCheck]),
          boardState,
          "o"
        )
      ) {
        winningMoves.push(columnToCheck);
      }
    }
    return winningMoves;
  },
  isSpotAWinner(colIndex, rowIndex, boardState, valToCheck = 1) {
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
  },
  findLosingMoves: function (boardState) {
    let availableMoves = utils.getFreshColumnArray();
    let losingMoves = [];
    console.log(utils.showBoard(boardState));
    for (let columnToCheck of availableMoves) {
      //  console.log(columnToCheck);
      // console.log(utils.getIndexOfDropPointInColumn(boardState[columnToCheck]));
      let dropRow = utils.getIndexOfDropPointInColumn(
        boardState[columnToCheck]
      );
      console.log(dropRow);
      if (
        dropRow > 0 &&
        this.isSpotAWinner(columnToCheck, dropRow - 1, boardState, "x")
      ) {
        losingMoves.push(columnToCheck);
      }
    }
    return losingMoves;
  },
};
