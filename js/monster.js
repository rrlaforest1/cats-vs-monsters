class Monster {
  constructor(level, name, health, strength, speed, type, img) {
    /**
     * Variables
     */
    this.level = level;
    this.name = name;
    this.health = health;
    this.strength = strength;
    this.speed = speed;
    this.velocity = speed;
    this.type = type;
    this.img = img;
    this.randomRow = Math.floor(Math.random() * 3);
    this.position = document.querySelectorAll(".battle-ground-spaces")[
      this.randomRow
    ];
    this.right = -100;
    this.element = document.createElement("li");
    this.element.classList.add("monster");
    this.element.style.position = "absolute";
    this.position.append(this.element);
    this.element.style.backgroundImage = this.img;
    this.dead = false;
  }

  /**
   * Move the monster with the velocity from the data-monster file
   */
  move() {
    this.right += this.velocity;
  }

  /**
   * Update the right position of the monster for the movement of the html element
   */
  updatePosition() {
    this.element.style.right = this.right + "px";
  }

  /**
   * Check for collitions to the monster can be either a bullet or a cat if the monster reaches one
   */
  didCollide(bulletorcat) {
    const bulletorcatBounding = bulletorcat.element.getBoundingClientRect();
    const monsBounding = this.element.getBoundingClientRect();

    const isInX = monsBounding.left < bulletorcatBounding.right;
    const isInY =
      monsBounding.bottom - 20 > bulletorcatBounding.top &&
      monsBounding.top < bulletorcatBounding.bottom - 20;
    // return isInX;

    return isInX && isInY;
  }
}
export default Monster;
