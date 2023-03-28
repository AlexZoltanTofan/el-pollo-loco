class ThrowableObject extends MovableObject {
  IMAGES_BOTTLE = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];

  IMAGES_BOTTLE_SPLASH = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ];

  botteSplash = false;

  constructor(x, y, otherDirection) {
    super();
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = x;
    this.y = y;
    this.otherDirection = otherDirection;
    this.height = 100;
    this.width = 100;
    this.trow();
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.botteSplash) this.playAnimation(this.IMAGES_BOTTLE);
      if (this.botteSplash) this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
    }, 100);
  }

  /**
   * character is throwing a bottle
   */
  trow() {
    this.speedY = 18;
    this.applyGravity();
    this.trowRight();
    this.trowLeft();
  }

  trowRight() {
    if (!this.otherDirection) {
      setInterval(() => {
        this.x += 10;
      }, 20);
    }
  }

  trowLeft() {
    if (this.otherDirection) {
      setInterval(() => {
        this.x -= 10;
      }, 20);
    }
  }
}
