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
    this.foodCounter = document.querySelector(".foodcounter");
    this.catSelection = document.querySelector(".cat-list");
    this.board = document.querySelector(".board");
    this.battleGround = document.querySelector(".battle-ground");
    this.lvlButton = document.querySelector(".start-level-btn");
    this.tryAgain = document.querySelector(".tryagain-btn");
    this.mondaBox = document.querySelector(".modal-box");
    this.closetDoors = document.querySelector(".monster-closet");
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
    this.feeder = null;
    this.monsterMovement = null;

    this.start(this.currentLevel);

    this.lvlButton.addEventListener("click", () => {
      console.log("click New level: " + this.currentLevel);
      this.mondaBox.classList.add("hidden");
      this.board.classList.add("playing");
      this.closetDoors.classList.add("open");

      console.log("this.start on lvlbutton lvl : ", this.currentLevel);
      this.gameIsOver = false;
      this.start(this.currentLevel);
    });
  }

  start(lvl) {
    console.log("start lvl", lvl);
    this.startBattle(lvl);
    this.availableCats(lvl);
    this.selectPlacement();
    this.startFeeder();
  }

  availableCats(lvl) {
    console.log("availableCats");
    for (const cat of this.catsData) {
      if (cat.level <= this.currentLevel) {
        const li = document.createElement("li");
        li.classList.add("availableCat");
        li.style.backgroundImage = cat.imgcloseup;

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
    console.log("selectPlacement");
    for (const space of this.battleGroundSpaces) {
      space.addEventListener("click", (e) => {
        if (
          this.boardReady === true &&
          !e.target.classList.contains("occupied") &&
          this.food >= 5
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
              this.tempCat.img,
              this.tempCat.imgcloseup
            )
          );

          this.food -= 5;
          e.target.classList.add("occupied");
          this.foodCounter.textContent = this.food;
          document.querySelector(".chosen").classList.remove("chosen");
          this.boardReady = false;
          this.battleGround.classList.remove("ready");
          this.tempCat = null;
        }
      });
    }
  }

  startFeeder() {
    this.feeder = setInterval(() => {
      if (!this.gameIsOver) {
        this.foodCrunchies.push(new Crunchies());
        for (const crunchie of this.foodCrunchies) {
          crunchie.element.addEventListener("click", () => {
            this.food += 5;
            this.foodCounter.textContent = this.food;
            crunchie.element.style.display = "none";
            crunchie.element.remove();
          });

          setTimeout(() => {
            crunchie.element.classList.add("desappeaing");
          }, 1000 * 10);

          setTimeout(() => {
            crunchie.element.remove();
          }, 1000 * 20);
        }
      }
    }, 1000 * 10);
  }

  startBattle(lvl) {
    /**
     * BATTLE SYSTEM
     */
    const currentLevelData = this.levelsData[lvl];
    const numberOfMonstersForLvl = currentLevelData.quantity;

    let monstersFrequency = setInterval(() => {
      console.log("monster interval");
      for (const monsterType of currentLevelData.monsters) {
        this.monsterCounter++;

        if (this.monsterCounter <= numberOfMonstersForLvl && !this.gameIsOver) {
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
    }, 1000 * 7);

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
                // this.monsters.remove(monster);
                this.monsters = this.monsters.filter(
                  (monster) => monster.health > 0
                );
                console.log("this.monsters", this.monsters);

                if (this.monsters.length <= 0) {
                  console.log("no more monsters");
                  this.levelCompleted = true;
                  /**
                   * If no more levels YOU'VE WON else Start new level
                   */
                  if (!this.levelsData[this.currentLevel + 1]) {
                    this.gameCompleted = true;
                    clearInterval(monsterMovement);
                    this.winOrLoose("win");
                  } else {
                    clearInterval(monsterMovement);
                    this.startNewLevel(this.currentLevel);
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
                catOnboard.projectiles = [];
                catOnboard.element.closest("li").classList.remove("occupied");
                catOnboard.element.remove();
                this.catsOnboard = this.catsOnboard.filter(
                  (catOnboard) => catOnboard.health > 0
                );
                monster.velocity = monster.speed;
              }

              // continue monster's movement
            }
          }
        }

        const monsterBounding = monster.element.getBoundingClientRect();
        const boardBounding = this.battleGround.getBoundingClientRect();

        if (
          boardBounding.left > monsterBounding.left &&
          monsterBounding.left !== 0
        ) {
          console.log("monsterBounding.left", monsterBounding.left);
          console.log("nooooooo");
          this.winOrLoose("loose");
        }
      }
    }, 100);
  }

  killSwitch() {
    this.gameIsOver = true;
    console.log("STOP EVERYTHING!!!");
    for (const monster of this.monsters) {
      monster.element.remove();
    }
    for (const catOnboard of this.catsOnBoard) {
      clearInterval(catOnboard.bulletMovement);
      clearInterval(catOnboard.bulletCadence);
      catOnboard.element.closest("li").classList.remove("occupied");
      catOnboard.element.remove();
      console.log("catOnboard", catOnboard);
      for (const bullet of catOnboard.projectiles) {
        bullet.element.remove();
      }
    }
    for (const crunchie of this.foodCrunchies) {
      crunchie.element.remove();
    }
    for (const catChoice of this.catSelection.querySelectorAll("li")) {
      catChoice.remove();
    }

    this.catSelection;
    clearInterval(this.feeder);
    this.monsters = [];
    this.catsOnBoard = [];
    this.food = 5;
    this.foodCounter.textContent = 5;
    this.monsterCounter = 0;
    this.board.classList.remove("playing");
  }

  startNewLevel(lvl) {
    console.log("startNewLeve", lvl);
    this.killSwitch();
    this.currentLevel = lvl + 1;
    this.mondaBox.classList.remove("hidden");
    this.mondaBox.classList.add("on-lvl" + this.currentLevel);
  }

  winOrLoose(status) {
    console.log("winOrLoose");
    this.killSwitch();
    this.mondaBox.classList.remove("hidden");
    this.mondaBox.classList.remove("on-lvl" + this.currentLevel);
    this.mondaBox.querySelector(".ready").classList.add("hidden");
    this.mondaBox.querySelector(".winorloose").classList.remove("hidden");
    this.mondaBox
      .querySelector(".winorloose")
      .setAttribute("data-status", status);

    this.currentLevel = 1;
    this.tryAgain.addEventListener("click", () => {
      document.querySelector(".instructions").classList.remove("hidden");
      this.mondaBox.querySelector(".winorloose").classList.add("hidden");
    });
  }
}

export default Game;
