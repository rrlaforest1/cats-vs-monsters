import Projectile from "./projectile.js";

class Cat {
  constructor(position, level, name, health, strength, type, img, imgcloseup) {
    this.position = document.getElementById(position);
    this.level = level;
    this.name = name;
    this.health = health;
    this.strength = strength;
    this.type = type;
    this.img = img;
    this.imgcloseup = imgcloseup;
    this.projectiles = [];
    this.bulletCadence = null;
    this.bulletMovement = null;

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

    this.bulletCadence = setInterval(() => {
      this.projectiles.push(new Projectile(pos));
      if (this.health <= 0) {
        clearInterval(bulletCadence);
      }
    }, 3000);

    this.bulletMovement = setInterval(() => {
      for (const bullet of this.projectiles) {
        bullet.move();
        bullet.updatePosition();
        if (this.health <= 0) {
          clearInterval(bulletMovement);
        }
        if (bullet.didGoOut()) {
          bullet.element.remove();
        }
      }
    }, 30);
  }
}
export default Cat;
