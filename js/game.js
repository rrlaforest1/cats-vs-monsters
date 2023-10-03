import Cat from "./cat.js";
import cats from "./data-cats.js";
import Monster from "./monster.js";
import monsters from "./data-monsters.js";
import levels from "./data-levels.js";
import Crunchies from "./food.js";

class Game {
  // code to be added
  constructor(currentLevel) {
    this.currentLevel = currentLevel;
    this.catSelection = document.querySelector(".cat-list");
    this.battleGround = document.querySelector(".battle-ground");
    this.battleGroundSpaces = document.querySelectorAll(
      ".battle-ground-spaces li"
    );
    this.catsData = cats;
    this.levelsData = levels;
    this.monstersData = monsters;
    this.boardReady = false;
    this.catsOnBoard = [];
    this.tempCat = null;
    this.monsters = [];
    this.monsterCounter = 0;
    this.gameIsOver = false;
    this.levelCompleted = false;
    this.gameCompleted = false;
    this.foodCrunchies = [];
    this.food = 5;

    this.start(currentLevel);
  }

  start(lvl) {
    this.startBattle(lvl);
    this.availableCats(lvl);
    this.selectPlacement();
    // this.startFeeder();
  }

  availableCats(lvl) {
    for (const cat of this.catsData) {
      if (cat.level === this.currentLevel) {
        const li = document.createElement("li");
        li.classList.add("availableCat");
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
          }
        });

        this.catSelection.append(li);
      }
    }
  }

  selectPlacement() {
    for (const space of this.battleGroundSpaces) {
      space.addEventListener("click", (e) => {
        if (
          this.boardReady === true &&
          !e.target.classList.contains("occupied")
        ) {
          const position = e.target.id;

          this.catsOnBoard.push(
            new Cat(
              position,
              this.tempCat.level,
              this.tempCat.name,
              this.tempCat.health,
              this.tempCat.strength,
              this.tempCat.type,
              this.tempCat.img
            )
          );

          document.querySelector(".chosen").classList.remove("chosen");
          this.boardReady = false;
          this.battleGround.classList.remove("ready");
          this.tempCat = null;
        }
      });
    }
  }

  startFeeder() {
    let foodInt = setInterval(() => {
      this.foodCrunchies.push(new Crunchies());
      for (const crunchie of this.foodCrunchies) {
        crunchie.addEventListener("click", () => {
          Game.food += 5;
          crunchie.element.style.display = "none";
          crunchie.element.remove();
        });
      }
    }, 5000);
  }

  startBattle(lvl) {
    /**
     * BATTLE SYSTEM
     */
    const currentLevelData = this.levelsData[lvl];
    const numberOfMonstersForLvl = currentLevelData.quantity;

    let monstersFrequency = setInterval(() => {
      for (const monsterType of currentLevelData.monsters) {
        this.monsterCounter++;

        if (this.monsterCounter <= numberOfMonstersForLvl) {
          this.monsters.push(
            new Monster(
              monsters[monsterType.type].level,
              monsters[monsterType.type].name,
              monsters[monsterType.type].health,
              monsters[monsterType.type].strength,
              monsters[monsterType.type].speed,
              monsters[monsterType.type].type,
              monsters[monsterType.type].img
            )
          );
        } else {
          clearInterval(monstersFrequency);
        }
      }
    }, 5000);

    let monsterMovement = setInterval(() => {
      for (const monster of this.monsters) {
        monster.move();
        monster.updatePosition();

        for (const catOnboard of this.catsOnBoard) {
          for (const bullet of catOnboard.projectiles) {
            /**
             * Check if bullets hit the monsters
             */
            if (monster.didCollide(bullet) && monster.health > 0) {
              console.log("It's a HIT!");
              bullet.element.remove();
              monster.health -= catOnboard.strength;
              /**
               * If no more monsters congrats! you've completed the level
               */
              if (monster.health <= 0) {
                monster.element.remove();
                if (this.monsters.length <= 0) {
                  this.levelCompleted = true;
                  /**
                   * If no more levels YOU'VE WON else Start new level
                   */
                  if (!this.levelsData[lvl + 1]) {
                    this.gameCompleted = true;
                    winAnnouncement();
                  } else {
                    startNewLevel(lvl + 1);
                  }
                }
              }
            }
            /**
             * Check if Monsters reaches cats
             */
            if (monster.didCollide(catOnboard) && monster.health > 0) {
              console.log("oh no too late!!");

              // stop monster's movement
              monster.velocity = 0;

              console.log("it's hitting the kitty!! T.T");
              catOnboard.health -= monster.strength;
              console.log("catOnboard.health", catOnboard.health);
              if (catOnboard.health <= 0) {
                // catOnboard.projectiles = null;
                catOnboard.element.remove();
                monster.velocity = monster.speed;
              }

              // continue monster's movement
            }
          }
        }
      }
    }, 100);
  }

  startNewLevel(lvl) {}
  winAnnouncement() {}
  gameOver() {}
}

export default Game;
