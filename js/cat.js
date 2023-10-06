import Projectile from "./projectile.js";

class Cat {
  /**
   * Variables
   */
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

  /**
   * Create and place the cat with the position
   * @param {*} pos is an li element in the grid
   */
  init(pos) {
    this.element = document.createElement("div");
    this.element.classList.add("cat");
    this.element.style.backgroundImage = this.img;
    pos.append(this.element);
    this.attack(pos);
  }

  /**
   * Create Projectile class that will start the shooting from the cat's position onwards
   * @param {*} pos is the same li as the init
   */
  attack(pos) {
    //Interval for the creation of a bullet
    this.bulletCadence = setInterval(() => {
      this.projectiles.push(new Projectile(pos));
      if (this.health <= 0) {
        clearInterval(this.bulletCadence);
      }
    }, 3000);

    //Interval for the movement of the bullet
    this.bulletMovement = setInterval(() => {
      for (const bullet of this.projectiles) {
        bullet.move();
        bullet.updatePosition();
        if (this.health <= 0) {
          clearInterval(this.bulletMovement);
        }
        if (bullet.didGoOut()) {
          bullet.element.remove();
        }
      }
    }, 30);
  }
}
export default Cat;
