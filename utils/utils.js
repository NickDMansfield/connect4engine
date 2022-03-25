module.exports = {
  showBoard: function (boardArray) {
    let boardDisplayString = "";
    console.log(boardArray);
    for (let rowIndex = 0; rowIndex < 4; ++rowIndex) {
      for (let colIndex = 0; colIndex < 6; ++colIndex) {
        boardDisplayString += boardArray[rowIndex][colIndex] || "o";
      }
      boardDisplayString += "\r\n";
    }
    console.log(boardDisplayString);
  },
};
