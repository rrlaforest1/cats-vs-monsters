import Cat from "./cat.js";
import cats from "./data-cats.js";
import Monster from "./monster.js";
import monsters from "./data-monsters.js";
import levels from "./data-levels.js";
import Crunchies from "./food.js";

class Game {
  constructor(currentLevel) {
    /**
     * Variables html elements
     */
    this.currentLevel = currentLevel;
    this.foodCounter = document.querySelector(".foodcounter");
    this.catSelection = document.querySelector(".cat-list");
    this.board = document.querySelector(".board");
    this.battleGround = document.querySelector(".battle-ground");
    this.lvlButton = document.querySelector(".start-level-btn");
    this.restartButton = document.querySelector(".restart-game-btn");
    this.tryAgain = document.querySelector(".tryagain-btn");
    this.mondaBox = document.querySelector(".modal-box");
    this.closetDoors = document.querySelector(".monster-closet");
    this.battleGroundSpaces = document.querySelectorAll(
      ".battle-ground-spaces li"
    );
    /**
     * Variables for game updates states
     */
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
    this.monstersFrequency = null;

    /**
     * Variables sounds and music
     */
    this.music = new Audio("./sounds/spooky-music.mp3");
    this.music.loop = true;
    this.music.volume = 0.4;
    this.meow = new Audio("./sounds/cat-meow2.ogg");
    this.doorSlam = new Audio("./sounds/door.wav");
    this.monsterSound = new Audio("./sounds/monster.wav");
    this.scream = new Audio("./sounds/man-screams.wav");
    this.impact = new Audio("./sounds/bullet2.wav");
    this.stopMusic = document.querySelector(".stop-music");
    this.stopSound = document.querySelector(".stop-sounds");

    this.stopAudios();

    this.start(this.currentLevel);

    /**
     * New level button
     */
    this.lvlButton.addEventListener("click", () => {
      this.mondaBox.classList.add("hidden");
      this.board.classList.add("playing");
      setTimeout(() => {
        this.closetDoors.classList.add("open");
      }, 800);

      this.gameIsOver = false;
      this.start(this.currentLevel);
    });

    /**
     * Restart game button for after loosing or winning
     */
    this.restartButton.addEventListener("click", () => {
      this.mondaBox.classList.add("hidden");
      this.board.classList.add("playing");
      setTimeout(() => {
        this.closetDoors.classList.add("open");
      }, 800);

      this.gameIsOver = false;
      this.start(this.currentLevel);
    });
  }

  /**
   * Manage the audio settings for the game
   */
  stopAudios() {
    this.stopMusic.addEventListener("click", (e) => {
      e.target
        .closest(".settings")
        .querySelector("#settingsCheck").checked = false;
      if (e.target.getAttribute("data-sound") == "true") {
        this.music.muted = true;
        e.target.textContent = "Unmute Music";
        e.target.setAttribute("data-sound", "false");
      } else {
        this.music.muted = false;
        e.target.textContent = "Mute Music";
        e.target.setAttribute("data-sound", "true");
      }
    });
    this.stopSound.addEventListener("click", (e) => {
      e.target
        .closest(".settings")
        .querySelector("#settingsCheck").checked = false;
      if (e.target.getAttribute("data-sound") == "true") {
        e.target.textContent = "Unmute Music";
        this.meow.muted = true;
        this.doorSlam.muted = true;
        this.monsterSound.muted = true;
        this.scream.muted = true;
        this.impact.muted = true;
        this.stopMusic.muted = true;
        this.stopSound.muted = true;
        e.target.setAttribute("data-sound", "false");
      } else {
        e.target.textContent = "Mute Music";
        this.meow.muted = false;
        this.doorSlam.muted = false;
        this.monsterSound.muted = false;
        this.scream.muted = false;
        this.impact.muted = false;
        this.stopMusic.muted = false;
        this.stopSound.muted = false;
        e.target.setAttribute("data-sound", "true");
      }
    });
  }

  /**
   * Start game with the level
   * @param {number} lvl
   */
  start(lvl) {
    this.startBattle(lvl);
    this.availableCats(lvl);
    this.selectPlacement();
    this.startFeeder();
    this.doorSlam.play();
    this.music.play();
  }

  /**
   * Add cats available for the level to the bottom board and add click event listener
   * @param {number} lvl
   */
  availableCats(lvl) {
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

  /**
   * Add click event for the the empty tiles on the boards grid so only after a cat is selected by
   * adding the cat to a place the class cat is created with a position
   */

  selectPlacement() {
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
          this.meow.play();
        }
      });
    }
  }

  /**
   * Initiate interval for the feeder to create food items and make them desapear if not used after a while
   */

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

  /**
   * Most of the interactions and collisions will happend in this method. The management of the monster
   * @param {number} lvl
   */
  startBattle(lvl) {
    /**
     * BATTLE SYSTEM
     */
    const currentLevelData = this.levelsData[lvl];
    const numberOfMonstersForLvl = currentLevelData.quantity;

    //set the frequency with the interval of the creation of the monster with the limit of the quantity given at the data level
    this.monstersFrequency = setInterval(() => {
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
          this.monsterSound.play();
        } else {
          clearInterval(this.monstersFrequency);
        }
      }
    }, 1000 * 7);

    // set the interval for the mosnters' movement to advance on the board
    this.monsterMovement = setInterval(() => {
      for (const monster of this.monsters) {
        monster.move();
        monster.updatePosition();

        for (const catOnboard of this.catsOnBoard) {
          for (const bullet of catOnboard.projectiles) {
            /**
             * Check if bullets hit the monsters
             */
            if (monster.didCollide(bullet) && monster.health > 0) {
              this.impact.play();
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

                if (this.monsters.length <= 0) {
                  this.levelCompleted = true;
                  /**
                   * If no more levels YOU'VE WON else Start new level
                   */
                  if (!this.levelsData[this.currentLevel + 1]) {
                    this.gameCompleted = true;
                    // clearInterval(monsterMovement);
                    this.winOrLoose("win");
                  } else {
                    // clearInterval(monsterMovement);
                    this.startNewLevel(this.currentLevel);
                  }
                }
              }
            }
            /**
             * Check if Monsters reaches cats
             */
            if (monster.didCollide(catOnboard) && monster.health > 0) {
              // stop monster's movement
              monster.velocity = 0;

              catOnboard.health -= monster.strength;
              if (catOnboard.health <= 0) {
                catOnboard.projectiles = [];
                catOnboard.element.closest("li").classList.remove("occupied");
                catOnboard.element.remove();
                clearInterval(catOnboard.bulletMovement);
                clearInterval(catOnboard.bulletCadence);
                for (const bullet of catOnboard.projectiles) {
                  bullet.element.remove();
                }

                monster.velocity = monster.speed;
              }

              // continue monster's movement
            }
          }
        }

        const monsterBounding = monster.element.getBoundingClientRect();
        const boardBounding = this.battleGround.getBoundingClientRect();

        /**
         * If the monsters have arrived to the left, to the bet then you loose the game
         */
        if (
          boardBounding.left > monsterBounding.left &&
          monsterBounding.left !== 0
        ) {
          this.scream.play();
          this.winOrLoose("loose");
        }
      }
    }, 100);
  }

  /**
   * Stop everything that needs to be stoped and reset values to initial setting
   * to either start a new level o a new game
   */
  killSwitch() {
    this.music.pause();
    this.gameIsOver = true;

    for (const monster of this.monsters) {
      monster.element.remove();
    }
    for (const catOnboard of this.catsOnBoard) {
      clearInterval(catOnboard.bulletMovement);
      clearInterval(catOnboard.bulletCadence);
      catOnboard.element.remove();
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

    for (const tile of this.battleGround.querySelectorAll("li")) {
      if (tile.classList.contains("occupied")) {
        tile.classList.remove("occupied");
      }
    }

    this.closetDoors.classList.remove("open");
    this.catSelection;
    clearInterval(this.monsterMovement);
    clearInterval(this.monstersFrequency);
    clearInterval(this.feeder);
    this.monsters = [];
    this.catsOnBoard = [];
    this.food = 5;
    this.foodCounter.textContent = 5;
    this.monsterCounter = 0;
    this.board.classList.remove("playing");
  }

  /**
   * Start a new level passing a level + 1
   * @param {number} lvl
   */
  startNewLevel(lvl) {
    this.killSwitch();
    this.currentLevel = lvl + 1;
    this.mondaBox.classList.remove("hidden");
    this.mondaBox.setAttribute("data-on-lvl", this.currentLevel);
  }

  /**
   * Its the same method to reset everything to start a new game wheather the player wins or looses
   * @param {string} status
   */
  winOrLoose(status) {
    this.killSwitch();
    this.mondaBox.classList.remove("hidden");
    this.mondaBox.setAttribute("data-on-lvl", "");
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
