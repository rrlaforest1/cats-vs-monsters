class Monster {
  constructor(level, name, health, strenth, type, img) {
    this.level = level;
    this.name = name;
    this.health = health;
    this.strenth = strenth;
    this.type = type;
    this.img = img;
    this.position = document.querySelector(".battle-ground-spaces");
    this.right = -100;
    this.element = document.createElement("li");
    this.element.classList.add("monster");
    this.element.style.position = "absolute";
    this.position.append(this.element);
    this.element.style.backgroundImage = this.img;
  }

  move() {
    this.right += 5;
  }

  updatePosition() {
    this.element.style.right = this.right + "px";
  }
}
export default Monster;
