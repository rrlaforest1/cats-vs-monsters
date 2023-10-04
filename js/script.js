import Game from "./game.js";
const board = document.querySelector(".board");
const initiateButton = document.querySelector(".initiate-game-btn");
const mondaBox = document.querySelector(".modal-box");
const startButton = document.querySelector(".start-game-btn");
const battleGround = document.querySelector(".battle-ground-spaces");
const gameLvl = 1;
let game = null;

initiateButton.addEventListener("click", function () {
  mondaBox.classList.add("hidden");
});

startButton.addEventListener("click", function () {
  console.log("click start");
  board.classList.add("playing");
  startGame(gameLvl);
});

function startGame(gLvl) {
  //   gameScreen.classList.remove("hidden");
  //   mainScreen.classList.add("hidden");

  game = new Game(gLvl);
  // game.start();
}
