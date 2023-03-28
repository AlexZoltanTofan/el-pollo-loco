class Chicken extends MovableObject {
  height = 100;
  y = 324;
  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];
  IMAGE_DAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImage(this.IMAGE_DAD);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 300 + Math.random() * 2000 - 10;
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  /**
   * Runs the animations of the chickens
   */
  animate() {
    setInterval(() => this.moveLeft(), 1000 / 60);
    setInterval(() => this.playChicken(), 200);
  }

  playChicken() {
    if (!this.isDead()) this.playAnimation(this.IMAGES_WALKING);
    else if (this.isDead()) {
      this.loadImage(this.IMAGE_DAD);
      this.speed = 0;
    }
  }
}
