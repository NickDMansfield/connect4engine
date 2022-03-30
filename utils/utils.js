module.exports = {
  showBoard: function (boardArray) {
    let boardDisplayString = "";
    for (let rowIndex = 0; rowIndex < 6; ++rowIndex) {
      for (let colIndex = 0; colIndex < 7; ++colIndex) {
        boardDisplayString += boardArray[colIndex][rowIndex] || "*";
      }
      boardDisplayString += "\r\n";
    }
    console.log(boardDisplayString);
  },
  buildBoard: function () {
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
  },
  getFreshColumnArray: function () {
    return [0, 1, 2, 3, 4, 5, 6];
  },
  getIndexOfDropPointInColumn: function (columnArray) {
    for (let i = 0; i < columnArray.length; ++i) {
      if (columnArray[i] !== "*") {
        return i - 1;
      }
    }
    return columnArray.length - 1;
  },
  getValueOfRelativeCell: function (
    boardArray,
    initialColIndex = 0,
    initialRowIndex = 0,
    colIndexMod = 0,
    rowIndexMod = 0
  ) {
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
};
