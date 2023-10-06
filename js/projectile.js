class Projectile {
  constructor(position) {
    /**
     * Variables
     * Create the bullet and placeit at the possition passed as a parameter which is the same cat's position
     */
    this.position = position;
    this.left = 70;
    this.element = document.createElement("div");
    this.element.classList.add("bullet");
    this.element.style.position = "absolute";
    this.position.append(this.element);
    this.battleGround = document.querySelector(".battle-ground");
  }

  /**
   * Move the the bullet at the same speed allways from the left to the right
   */
  move() {
    this.left += 5;
  }

  /**
   * Update the left position of the bullet for the movement of the html element
   */
  updatePosition() {
    this.element.style.left = this.left + "px";
  }

  /**
   * Che if the bullet exit the game board
   */
  didGoOut() {
    const bulletBounding = this.element.getBoundingClientRect();
    const boardBounding = this.battleGround.getBoundingClientRect();

    const isInX = boardBounding.right < bulletBounding.right;

    return isInX;
  }
}
export default Projectile;
