const sampleBoards = require("./tests/sampleBoards.js");
const utils = require("./utils/utils.js");
const boardArray = sampleBoards.boardWithLossAvailable();
const logic = require("./brain/logic");
const playYourself = require("./brain/play-yourself");
let winningMoves = [];
let losingMoves = [];
let opponentsWinningMoves = [];

function analyzeBoardState(boardState) {}

logic.decideMove(boardArray);
//utils.showBoard(boardArray);
const testRandomBoard = sampleBoards.randomBoard(30);
console.log(testRandomBoard);
console.log(utils.showBoard(testRandomBoard));
console.log(logic.decideMove(testRandomBoard));

playYourself.playGame(30);
