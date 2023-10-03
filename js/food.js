import Game from "./game.js";

class Curnchies {
  constructor() {
    this.feeder = document.querySelector(".feeder");
    this.element = document.createElement("div");
    this.element.classList.add("crunchie");
    this.element.style.position = "absolute";
    // this.element.addEventListener("click", () => {
    //     Game.food += 5;

    // });
    this.feeder.append(this.element);
  }
}

export default Curnchies;
