var winComb = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
];
var symbHu = "X",
  symbPc = "O";
var board, cells;
var arrayHu = [];
var arrayPc = [];

document.addEventListener("DOMContentLoaded", function() {
  whoGetsX();
  cells = document.querySelectorAll(".cell");
  startGame();
});

function whoGetsX() {
  var whoGets = document.querySelector("p");
  symbHu = prompt("Please, enter your sign for this game - X or O", "X");
  if (symbHu == " " || symbHu == null || symbHu != "O") {
    symbHu = "X";
    symbPc = "O";
    whoGets.textContent =
      "Player has " + symbHu + " and computer has " + symbPc;
  } else {
    symbHu = "O";
    symbPc = "X";
    whoGets.textContent =
      "Player has " + symbHu + " and computer has " + symbPc;
  }
}

function startGame() {
  document.querySelector(".endgame").style.display = "none";
  document.querySelector("table").style.opacity = "1";
  board = [];
  arrayHu = [];
  arrayPc = [];
  for (var i = 0; cells.length; i++) {
    cells[i].innerText = "";
    cells[i].addEventListener("click", click, false);
  }
}

function click(square) {
  humanTurn(square.target.id);
}

function humanTurn(squareId) {
  document.getElementById(squareId).innerText = symbHu;
  board.push(parseInt(squareId));
  arrayHu.push(parseInt(squareId));
  if (checkWin(arrayHu)) {
    winner("you!");
  } else {
    pcTurn();
  }
}

function checkWin(xarray) {
  return winComb.some(winPossibility =>
    winPossibility.every(btnIndex => xarray.includes(btnIndex))
  );
}

function pcTurn() {
  var randomCell = Math.floor(Math.random() * 9);
  while (board.includes(randomCell)) {
    randomCell = Math.floor(Math.random() * 9);
  }
  document.getElementById(randomCell).innerText = symbPc;
  board.push(randomCell);
  arrayPc.push(randomCell);
  console.log(board, arrayHu, arrayPc);
  if (checkWin(arrayPc)) {
    winner("pc!");
  }
}

function winner(who){
  document.querySelector(".endgame").style.display = "flex";
  document.querySelector("table").style.opacity = "0.1";
  document.querySelector(".text").innerText = "The winner is " + who;
}