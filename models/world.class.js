/**
 * class for the entire playable world
 */
class World {
  character = new Character();
  ctx;
  canvas;
  camera_x = 0;
  statusBarHealth = new StatusBarHealth();
  statusBarBottle = new StatusBarBottle();
  statusBarCoins = new StatusBarCoins();
  level = level1;
  statusBarHealthEndboss = new StatusBarHealthEndboss();
  throwableObject = [];
  bottle = 10;
  collectCoin_sound = new Audio('audio/collect_coin.mp3');
  collectBottle_sound = new Audio('audio/collect_bottle.mp3');
  chicken_sound = new Audio('audio/chicken.mp3');
  start_music = new Audio('audio/backgroundMusic.mp3');
  atackEndBoss_sound = new Audio('audio/EndbossMusic.mp3');
  bottle_break = new Audio('audio/glass_break.mp3');
  allSounds = [
    this.collectCoin_sound,
    this.collectBottle_sound,
    this.chicken_sound,
    this.start_music,
    this.atackEndBoss_sound,
    this.character.hurt_sound,
    this.character.jump_sound,
    this.character.gameOver_sound,
    this.character.walkink_sound,
    this.level.endBoss.win_sound,
    this.bottle_break,
  ];
  soundOnOf = true;
  isCooldown = false;

  constructor(canvas) {
    this.togglesScreen();
    this.ctx = canvas.getContext('2d'); //allows you to "draw" objects on the canvas
    this.canvas = canvas;
    this.draw();
    this.setWorld();
    this.run();
    this.run2();
    this.start_music.play();
  }

  togglesScreen() {
    this.toggleScreen('start-screen', false);
    this.toggleScreen('canvas', true);
    this.toggleScreen('showIconFullscreen', true);
    this.toggleScreen('showIconAudio', true);
    this.toggleScreen('mobile-btnLeft', true);
    this.toggleScreen('mobile-btnRight', true);
  }

  /**
   * Show or hide an HTML element on the page based on the value of the toggle parameter.
   */
  toggleScreen(id, toggle) {
    let element = document.getElementById(id);
    let display = toggle ? 'block' : 'none';
    element.style.display = display;
  }

  pauseAndPlayAudios() {
    const volume = this.soundOnOf ? 0 : 0.4;
    this.allSounds.forEach((sound) => (sound.volume = volume));
    document.getElementById('showIconAudio').src = this.soundOnOf
      ? 'icons/audioOffIcon.png'
      : 'icons/audioOnIcon.png';
    this.soundOnOf = !this.soundOnOf;
  }

  /**
   * the character object now has a reference to the world object
   */
  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkThrowObject();
    }, 20);
  }

  run2() {
    setInterval(() => {
      this.checkCollisions();
      this.checkIfBottleCollidingEnemies();
      this.checkIfBottleisCollidingEndboss();
      this.checkIfBottleIsSplashing();
    }, 100);
    setInterval(() => this.checkIfEndBossCollidingCharacter(), 500);
  }

  checkCollisions() {
    this.checkEnemiesCollisions();
    this.checkIfCharacterJumpAboveChickens();
    this.checkIfCharacterisCollidingCoin();
    this.checkIfCharacterisCollidingBottle();
    this.checkBossCordinates();
  }

  checkBossCordinates() {
    this.startAnimEndboss();
    this.checkPositionOfEndBoss();
  }

  checkPositionOfEndBoss() {
    if (this.EndBossIsOnTheRightSide())
      this.level.endBoss.otherDirection = false;
    if (this.EndBossIsOnTheLeftSide()) {
      this.level.endBoss.otherDirection = true;
      this.level.endBoss.speed += 5;
    }
  }

  EndBossIsOnTheRightSide() {
    return this.character.x < this.level.endBoss.x - 400;
  }

  EndBossIsOnTheLeftSide() {
    return this.character.x > this.level.endBoss.x + 700;
  }

  startAnimEndboss() {
    if (this.characterIsNear()) this.moveLeftEndBoss();
  }

  characterIsNear() {
    return this.character.x > 1500 && !this.level.endBoss.hadFirstContact;
  }

  moveLeftEndBoss() {
    this.level.endBoss.hadFirstContact = true;
    this.statusBarHealthEndboss.y = 40;
    this.start_music.pause();
    this.atackEndBoss_sound.play();
  }

  /**
   * checking for collisions between enemy and character
   */
  checkEnemiesCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.characterIscolliding(enemy)) this.characterIsHit();
    });
  }

  characterIscolliding(enemy) {
    return (
      this.character.isColliding(enemy) &&
      !this.character.isAboveGround() &&
      enemy.energy == 100 &&
      !this.character.isHurt(this.character.immortalTime)
    );
  }

  characterIsHit() {
    this.character.hit();
    this.statusBarHealth.setPercentage(this.character.energy);
  }

  /**
   * checking for collisions between character and bottle
   */
  checkIfCharacterisCollidingBottle() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) this.collectBottles(index);
    });
  }

  collectBottles(index) {
    this.level.bottles.splice(index, 1);
    this.collectBottle_sound.play();
    this.statusBarBottle.setPercentage(this.statusBarBottle.theFirstBottle++);
  }

  /**
   * checking for collisions between character and coin
   */
  checkIfCharacterisCollidingCoin() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) this.colectCoins(index);
    });
  }

  colectCoins(index) {
    this.level.coins.splice(index, 1);
    this.statusBarCoins.setPercentage(this.statusBarCoins.firstCoint++);
    this.collectCoin_sound.play();
  }

  checkIfCharacterJumpAboveChickens() {
    this.level.enemies.forEach((enemy) => {
      if (this.characterIsAboveChicken(enemy)) {
        this.chickenDead(enemy);
      }
    });
  }

  characterIsAboveChicken(enemy) {
    return (
      this.character.isAboveGround() &&
      this.character.isColliding(enemy) &&
      enemy.energy == 100 &&
      this.character.speedY < 0
    );
  }

  chickenDead(enemy) {
    enemy.energy = 0;
    this.chicken_sound.play();
    setTimeout(() => {
      this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
    }, 400);
  }

  checkIfEndBossCollidingCharacter() {
    if (this.endBossCollidingCharacter()) this.characterisHurt();
    else this.level.endBoss.isAttacking = false;
  }

  endBossCollidingCharacter() {
    return (
      this.character.isColliding(this.level.endBoss) &&
      this.level.endBoss.energy > 0
    );
  }

  characterisHurt() {
    this.level.endBoss.isAttacking = true;
    this.character.hit();
    this.statusBarHealth.setPercentage(this.character.energy);
  }

  checkThrowObject() {
    if (this.characterHaveBottle()) {
      this.characterShoot();
    }
  }

  characterHaveBottle() {
    return (
      !this.isCooldown &&
      keyboard.ATTACK &&
      this.statusBarBottle.theFirstBottle >= 11 &&
      this.character.energy > 0
    );
  }

  characterShoot() {
    this.bottle = new ThrowableObject(
      this.character.otherDirection
        ? this.character.x - 50
        : this.character.x + 100,
      this.character.y + 100,
      this.character.otherDirection
    );
    this.throwableObject.push(this.bottle);
    this.statusBarBottle.theFirstBottle--;
    this.statusBarBottle.percentage = this.statusBarBottle.theFirstBottle - 1;
    this.statusBarBottle.setPercentage(this.statusBarBottle.percentage);
    this.isCooldown = true;
    setTimeout(() => (this.isCooldown = false), 400);
  }

  checkIfBottleIsSplashing() {
    this.throwableObject.forEach((bottle) => {
      if (bottle.y > 230) bottle.botteSplash = true;
      if (!bottle.botteSplash) this.bottle_break.play();
    });
  }

  /**
   * Iterate through the throwableObject array where the bottles are located and if a bottle collides with the Endboss, he gets hurt and 10 points will be deducted from his 100 energy.
   */
  checkIfBottleisCollidingEndboss() {
    this.throwableObject.forEach((bottle) => {
      if (this.canBottleCollidingEndboss(bottle)) this.endBossIsHurt();
    });
  }

  canBottleCollidingEndboss(bottle) {
    return (
      this.level.endBoss.isColliding(bottle) &&
      !this.level.endBoss.isHurt(this.level.endBoss.immortalTime)
    );
  }

  endBossIsHurt() {
    this.chicken_sound.play();
    this.level.endBoss.hit();
    this.statusBarHealthEndboss.setPercentage(this.level.endBoss.energy);
  }

  checkIfBottleCollidingEnemies() {
    this.throwableObject.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (enemy.isColliding(bottle) && enemy.energy == 100) {
          this.chicken_sound.play();
          enemy.energy = 0;
          setTimeout(() => {
            this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
          }, 400);
        }
      });
    });
  }

  /**
   * This Function draw all Elements in the Canvas.
   *
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObject);
    this.ctx.translate(-this.camera_x, 0);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.level.endBoss);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObject);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarHealthEndboss);
    let self = this;
    //requestAnimationFrame(this.draw) continuously calls the draw function and draws the character 50 times per second
    requestAnimationFrame(() => {
      //draw - to draw (in this case the character)
      self.draw();
    });
  }

  /**
   * Adding multiple objects to a map in a single call
   * @param {Array} objects
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Drow on a canvas
   * @param {object} mo
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      // we use a function to draw elements everywhere (this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);)
      this.flipImage(mo);
    }
    // we draw the movement image
    mo.draw(this.ctx);
    // we draw the blue box/rectangle; javascript canvas draw rectangle
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBacK(mo);
    }
  }

  flipImage(mo) {
    //canvas mirror image (flip the image) save! only for an element that needs to be flipped
    this.ctx.save(); // ctx= context  (save the initial state)
    this.ctx.translate(mo.width, 0); // (change the way the image is added by 180 degrees in the opposite mirror direction)
    this.ctx.scale(-1, 1); // (change the way the mirror image is added)
    mo.x = mo.x * -1; // (flip the x coordinate for mirror)
  }

  /**
   * // reset the context back because other elements shouldn't be mirrored
   * @param {object} mo
   */
  flipImageBacK(mo) {
    // if we flipped the image in the opposite direction, undo it so the next image won't be flipped
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
