const utils = require("./utils/utils.js");
const boardArray = [];
const boardCols = 6;
const boardRows = 4;

for (let rowIndex = 0; rowIndex < boardRows; ++rowIndex) {
  boardArray.push([]);
  for (let colIndex = 0; colIndex < boardCols; ++colIndex) {
    boardArray[rowIndex].push(["*"]);
  }
}

utils.showBoard(boardArray);
