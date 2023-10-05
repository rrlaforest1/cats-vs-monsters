import Game from "./game.js";
const board = document.querySelector(".board");
const initiateButton = document.querySelector(".initiate-game-btn");
const mondaBox = document.querySelector(".modal-box");
const story1Button = document.querySelector(".story1-next-btn");
const story2Button = document.querySelector(".story2-next-btn");
const story3Button = document.querySelector(".story3-next-btn");
const startButton = document.querySelector(".start-game-btn");
const closetDoors = document.querySelector(".monster-closet");

const gameLvl = 1;
let game = null;

story1Button.addEventListener("click", function (e) {
  e.target.closest(".sto").classList.add("hidden");
  document.querySelector(".sto.story2").classList.remove("hidden");
});
story2Button.addEventListener("click", function (e) {
  e.target.closest(".sto").classList.add("hidden");
  document.querySelector(".sto.story3").classList.remove("hidden");
});
story3Button.addEventListener("click", function (e) {
  e.target.closest(".story").classList.add("hidden");
  document.querySelector(".instructions").classList.remove("hidden");
});

initiateButton.addEventListener("click", function (e) {
  e.target.closest(".instructions").classList.add("hidden");
  document.querySelector(".ready").classList.remove("hidden");
});

startButton.addEventListener("click", function () {
  console.log("click start");
  mondaBox.classList.add("hidden");
  board.classList.add("playing");
  closetDoors.classList.add("open");

  startGame(gameLvl);
});

function startGame(gLvl) {
  //   gameScreen.classList.remove("hidden");
  //   mainScreen.classList.add("hidden");

  game = new Game(gLvl);
  // game.start();
}
