class Projectile {
  constructor(position) {
    this.position = position;
    this.left = 70;
    this.element = document.createElement("div");
    this.element.classList.add("bullet");
    this.element.style.position = "absolute";
    this.position.append(this.element);
  }

  move() {
    this.left += 5;
  }

  updatePosition() {
    this.element.style.left = this.left + "px";
  }

  didCollide(monster) {
    const bulletBounding = this.element.getBoundingClientRect();
    const monsBounding = monster.element.getBoundingClientRect();

    const isInX =
      monsBounding.right > bulletBounding.left &&
      monsBounding.left < bulletBounding.right;
    const isInY =
      monsBounding.bottom > bulletBounding.top &&
      monsBounding.top < bulletBounding.bottom;

    return isInX && isInY;
  }
}
export default Projectile;
