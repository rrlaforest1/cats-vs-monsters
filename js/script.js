import Game from "./game.js";
const board = document.querySelector(".board");
const initiateButton = document.querySelector(".initiate-game-btn");
const mondaBox = document.querySelector(".modal-box");
const landingButton = document.querySelector(".landing-btn");
const story1Button = document.querySelector(".story1-next-btn");
const story2Button = document.querySelector(".story2-next-btn");
const story3Button = document.querySelector(".story3-next-btn");
const startButton = document.querySelector(".start-game-btn");
const closetDoors = document.querySelector(".monster-closet");

const gameLvl = 1;
let game = null;

landingButton.addEventListener("click", function (e) {
  e.target.closest(".landing-page").classList.add("hidden");
  document.querySelector(".board").classList.remove("hidden");
});
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
  mondaBox.classList.add("hidden");
  board.classList.add("playing");
  setTimeout(() => {
    closetDoors.classList.add("open");
  }, 1000);
  startGame(gameLvl);
});

function startGame(gLvl) {
  game = new Game(gLvl);
}
