import Game from "./game.js";

class Curnchies {
  constructor() {
    /**
     * Variables
     */
    this.feeder = document.querySelector(".feeder");
    this.element = document.createElement("div");
    this.element.classList.add("crunchie");
    this.element.style.position = "absolute";
    this.feeder.append(this.element);
    this.bottom = Math.floor(Math.random() * (100 - 40 + 1) + 20);
    this.left = Math.floor(Math.random() * (100 - 40 + 1) + 20);

    this.init();
  }

  /**
   * Create a single food item and send it flying to a random position in the game board
   */
  init() {
    setTimeout(() => {
      this.element.style.bottom = this.bottom + "%";
      this.element.style.left = this.left + "%";
    }, 500);
  }
}

export default Curnchies;
