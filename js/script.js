import Game from "./game.js";
const startButton = document.querySelector(".start-game-btn");
const battleGround = document.querySelector(".battle-ground-spaces");
const gameLvl = 1;
// const liveTag = document.querySelector("#lives");
// const restartButton = document.getElementById("restart-button");
// const mainScreen = document.querySelector("#game-intro");
// const gameScreen = document.querySelector("#game-screen");
// const endScreen = document.querySelector("#game-end");
let game = null;

startButton.addEventListener("click", function () {
  console.log("click start");
  startGame(gameLvl);
});

function startGame(gLvl) {
  //   gameScreen.classList.remove("hidden");
  //   mainScreen.classList.add("hidden");

  game = new Game(gLvl);
  // game.start();
}
