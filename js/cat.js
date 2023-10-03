import cats from "./data-cats.js";
import Projectile from "./projectile.js";

class Cat {
  constructor(position, level, name, health, strength, type, img) {
    this.position = document.getElementById(position);
    this.level = level;
    this.name = name;
    this.health = health;
    this.strength = strength;
    this.type = type;
    this.img = img;
    this.projectiles = [];

    this.init(this.position);
  }

  init(pos) {
    this.element = document.createElement("div");
    this.element.classList.add("cat");
    this.element.style.backgroundImage = this.img;
    pos.append(this.element);
    this.attack(pos);
  }

  attack(pos) {
    console.log("attack");

    let bulletCadence = setInterval(() => {
      this.projectiles.push(new Projectile(pos));
    }, 3000);

    let bulletMovement = setInterval(() => {
      for (const bullet of this.projectiles) {
        bullet.move();
        bullet.updatePosition();
      }
    }, 30);
  }
}
export default Cat;
