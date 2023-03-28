class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.4;
  energy = 100;
  lastHit = 0;

  /**
   * applies gravity to the character, to get him back down to the ground
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration + 0.1;
      }
    }, 1000 / 25);
  }

  /**
   * checks if an object is above the ground, to apply gravity
   * @returns {boolean}
   * @returns {number}
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      // throwable Objects should always fall
      return true;
    } else {
      return this.y < 75;
    }
  }

  isColliding(mo) {
    return (
      this.rightSideOfCharCollideMoLeft(mo) &&
      this.bottomSideOfCharCollideMoTop(mo) &&
      this.leftSideOfCharCollideMoRight(mo) &&
      this.topSideOfCharCollideMoBottom(mo)
    );
  }

  isCollidingHorizontal(mo) {
    return (
      this.rightSideOfCharCollideMoLeft(mo) &&
      this.leftSideOfCharCollideMoRight(mo)
    );
  }

  isCollidingVerticaly(mo) {
    return (
      this.bottomSideOfCharCollideMoTop(mo) &&
      this.topSideOfCharCollideMoBottom(mo)
    );
  }

  rightSideOfCharCollideMoLeft(mo) {
    return this.isRightSideChar() > this.leftSideFrom(mo);
  }

  isRightSideChar() {
    return this.x + this.width - this.offset.right;
  }

  leftSideFrom(mo) {
    return mo.x + mo.offset.left;
  }

  bottomSideOfCharCollideMoTop(mo) {
    return this.isBottomSideChar() > this.topSideFrom(mo);
  }

  isBottomSideChar() {
    return this.y + this.height - this.offset.bottom;
  }

  topSideFrom(mo) {
    return mo.y + mo.offset.top;
  }

  leftSideOfCharCollideMoRight(mo) {
    return this.isLeftSideChar() < this.rightSideFrom(mo);
  }

  isLeftSideChar() {
    return this.x + this.offset.left;
  }

  rightSideFrom(mo) {
    return mo.x + mo.width - mo.offset.right;
  }

  topSideOfCharCollideMoBottom(mo) {
    return this.isTopSideChar() < this.bottomSideFrom(mo);
  }

  isTopSideChar() {
    return this.y + this.offset.top;
  }

  bottomSideFrom(mo) {
    return mo.y + mo.height - mo.offset.bottom;
  }

  /**
   * checks if an object got hit
   */
  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * checks if an object is hurt
   * @returns {number}
   */
  isHurt(time) {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < time;
  }

  /**
   * checks if an object is dead and sets life energy to 0
   * @returns {number}
   */
  isDead() {
    return this.energy == 0;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * moving object in direction right at it's speed
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * moving object in direction left at it's speed
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * setting the speed in Y direction when the character is jumping
   */
  jump() {
    this.speedY = 25;
  }
}
