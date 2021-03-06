const getIndexOfDropPointInColumn = function (colArray) {
  for (let i = 0; i < colArray.length; ++i) {
    if (colArray[i] !== "*") {
      return i - 1;
    }
  }
  return colArray.length - 1;
};
const getFreshColumnArray = function () {
  return [0, 1, 2, 3, 4, 5, 6];
};

const canTokenBeDroppedInColumn = function (columnArray) {
  return getIndexOfDropPointInColumn(columnArray) > -1;
};
const buildBoard = function () {
  const boardArray = [];
  const boardCols = 7;
  const boardRows = 6;
  for (let colIndex = 0; colIndex < boardCols; ++colIndex) {
    boardArray.push([]);
    for (let rowIndex = 0; rowIndex < boardRows; ++rowIndex) {
      boardArray[colIndex].push("*");
    }
  }
  return boardArray;
};

module.exports = {
  reverseShownBoard: function (showBoardString) {
    const shownRows = showBoardString.split("\r\n");
    const boardArray = buildBoard();
    for (let shownRowIndex = 0; shownRowIndex < shownRows.length; ++shownRowIndex) {
      const shownRow = shownRows[shownRowIndex].split("");
      for (let shownColIndex = 0; shownColIndex < shownRow.length; ++shownColIndex) {
        //console.log(shownRow);
        //console.log(boardArray);
        const rowVal = shownRow[shownColIndex];
        boardArray[shownColIndex][shownRowIndex] = !isNaN(rowVal) ? Number(rowVal) : rowVal;
      }
    }
    return boardArray;
  },
  showBoard: function (boardArray) {
    let boardDisplayString = "";
    for (let rowIndex = 0; rowIndex < 6; ++rowIndex) {
      for (let colIndex = 0; colIndex < 7; ++colIndex) {
        boardDisplayString += boardArray[colIndex][rowIndex] + " ";
      }
      boardDisplayString += "\r\n";
    }
    console.log(boardDisplayString);
    return boardDisplayString;
  },
  buildBoard,
  getFreshColumnArray,
  getIndexOfDropPointInColumn,
  canTokenBeDroppedInColumn,
  getAvailableColumns: function (boardState) {
    let availableColumns = getFreshColumnArray();
    availableColumns = availableColumns.filter((ac) => {
      return canTokenBeDroppedInColumn(boardState[ac]);
    });
    return availableColumns;
  },
  getRandomAvailableColumn: function (boardArray, colIndicesToExclude = []) {
    const availableColumnsWithIndex = [];
    for (let zz = 0; zz < boardArray.length; ++zz) {
      const dropIndex = getIndexOfDropPointInColumn(boardArray[zz]);
      if (colIndicesToExclude.indexOf(zz) < 0 && dropIndex > -1) {
        availableColumnsWithIndex.push({
          column: boardArray[zz],
          index: zz,
          dropIndex,
        });
      }
    }
    if (availableColumnsWithIndex.length === 0) {
      return { index: -1 };
    }
    const colToChoose = Math.ceil(Math.random() * (availableColumnsWithIndex.length - 1));
    return availableColumnsWithIndex[colToChoose];
  },
  getValueOfRelativeCell: function (boardArray, initialColIndex = 0, initialRowIndex = 0, colIndexMod = 0, rowIndexMod = 0) {
    if (!boardArray?.length) {
      return [false, undefined];
    }
    let newColIndex = initialColIndex + colIndexMod;
    let newRowIndex = initialRowIndex + rowIndexMod;
    if (newColIndex < 0 || newColIndex > boardArray.length - 1) {
      return [false, undefined];
    }
    if (newRowIndex < 0 || newRowIndex > boardArray[newColIndex].length - 1) {
      return [false, undefined];
    }
    return [true, boardArray[newColIndex][newRowIndex]];
  },
  dropTokenInColumn: function (boardState, colIndex, valueToPlace = 1) {
    let dropIndex = getIndexOfDropPointInColumn(boardState[colIndex]);
    if (dropIndex >= 0) {
      boardState[colIndex][dropIndex] = valueToPlace;
    }
    return boardState;
  },
  getOppositeSymbol: function (symbol) {
    return symbol === 1 ? 0 : 1;
  },
};
