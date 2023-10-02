import Cat from "./cat.js";
import cats from "./data-cats.js";
import Monster from "./monster.js";
import monsters from "./data-monsters.js";

class Game {
  // code to be added
  constructor(currentLevel) {
    this.currentLevel = currentLevel;
    this.catSelection = document.querySelector(".cat-list");
    this.battleGround = document.querySelector(".battle-ground");
    this.battleGroundSpaces = document.querySelectorAll(
      ".battle-ground-spaces li"
    );
    this.catData = cats;
    this.boardReady = false;
    this.catsOnBoard = {};
    this.tempCat = null;
    this.monsters = [];

    this.start(currentLevel);
  }

  start(lvl) {
    // this.gameLoop();
    this.monsterswaves(lvl);
    this.availableCats(lvl);
    this.selectPlacement();
  }

  availableCats(lvl) {
    console.log("availableCats", this.catData);
    for (const cat of this.catData) {
      if (cat.level === this.currentLevel) {
        const li = document.createElement("li");
        li.classList.add("availableCat");
        li.setAttribute("data-level", cat.level);
        li.setAttribute("data-name", cat.name);
        li.setAttribute("data-health", cat.health);
        li.setAttribute("data-strength", cat.strength);
        li.setAttribute("data-type", cat.type);
        li.style.backgroundImage = cat.img;

        li.addEventListener("click", (e) => {
          if (e.target.classList.contains("chosen")) {
            e.target.classList.remove("chosen");
            this.tempCat = null;
            this.boardReady = false;
            this.battleGround.classList.remove("ready");
          } else {
            if (document.querySelector(".chosen")) {
              document.querySelector(".chosen").classList.remove("chosen");
            }
            e.target.classList.add("chosen");
            this.tempCat = cat;
            this.boardReady = true;
            this.battleGround.classList.add("ready");

            // alert("chose position");
          }
        });

        this.catSelection.append(li);
        // alert("choose a cat");
      }
    }
  }

  selectPlacement() {
    for (const space of this.battleGroundSpaces) {
      space.addEventListener("click", (e) => {
        console.log("click on space", e.target);
        console.log("this.tempCat", this.tempCat);

        if (
          this.boardReady === true &&
          !e.target.classList.contains("occupied")
        ) {
          const position = e.target.id;

          console.log("position", position);

          const createCat = new Cat(
            position,
            this.tempCat.level,
            this.tempCat.name,
            this.tempCat.health,
            this.tempCat.strength,
            this.tempCat.type,
            this.tempCat.img
          );

          document.querySelector(".chosen").classList.remove("chosen");
          this.boardReady = false;
          this.battleGround.classList.remove("ready");
          this.tempCat = null;
        }
      });
    }
  }

  monsterswaves(lvl) {
    console.log("monsterswaves", monsters);
    let monstersFrequency = setInterval(() => {
      this.monsters.push(
        new Monster(
          monsters[0].level,
          monsters[0].name,
          monsters[0].health,
          monsters[0].strenth,
          monsters[0].type,
          monsters[0].img
        )
      );
    }, 1000 * 15);

    let monsterMovement = setInterval(() => {
      for (const monster of this.monsters) {
        monster.move();
        monster.updatePosition();
      }
    }, 100);
  }

  //   gameLoop() {
  //     if (this.gameIsOver) {
  //       return;
  //     }

  //     this.animationId = requestAnimationFrame(() => this.gameLoop());
  //     this.update();
  //   }

  //   update() {
  //     /**
  //      * Game Engine
  //      */
  //     if (this.counter % 300 === 0) {
  //       this.obstacles.push(new Obstacle(this.gameScreen));
  //       this.counter = 0;
  //     }
  //     this.counter++;

  //     for (const obstacle of this.obstacles) {
  //       obstacle.move();
  //       obstacle.updatePosition();
  //       if (this.player.didCollide(obstacle) && this.canBeHit) {
  //         this.lives--;

  //         this.liveTag.textContent = this.lives;
  //         this.canBeHit = false;
  //         setTimeout(() => {
  //           this.canBeHit = true;
  //         }, 3000);
  //       }
  //     }

  //     const obstaclesToRemove = this.obstacles.filter(
  //       (obstacle) => obstacle.top > this.height
  //     );
  //     obstaclesToRemove.forEach((obstacle) => obstacle.element.remove());
  //     this.obstacles = this.obstacles.filter(
  //       (obstacle) => obstacle.top <= this.height
  //     );

  //     if (this.lives <= 0) {
  //       this.gameIsOver = true;
  //       cancelAnimationFrame(this.animationId);
  //       const animations = this.gameScreen.getAnimations();
  //       animations[0].pause();
  //     }

  //     for (const key in this.pressedKeys) {
  //       if (this.pressedKeys[key]) {
  //         this.player.move(key);
  //       }
  //     }
  //     this.player.updatePosition();
  //   }
}

export default Game;
