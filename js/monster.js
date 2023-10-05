class Monster {
  constructor(level, name, health, strength, speed, type, img) {
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

  move() {
    this.right += this.velocity;
  }

  updatePosition() {
    this.element.style.right = this.right + "px";
  }

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
