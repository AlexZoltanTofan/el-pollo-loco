class SmallChicken extends MovableObject {
  height = 70;
  width = 70;
  y = 351;
  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];
  IMAGE_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.x = 300 + Math.random() * 1700; // numar intre 200 si 700
    this.speed = 0.15 + Math.random() * 0.5; // toate se misca  cu un numar diferit
    this.animate();
  }

  /**
   * Runs the animations of the smallchickens
   */
  animate() {
    setInterval(() => this.moveLeft(), 1000 / 60);
    setInterval(() => this.playSmallChicken(), 200);
  }

  playSmallChicken() {
    if (!this.isDead()) this.playAnimation(this.IMAGES_WALKING);
    else if (this.isDead()) {
      this.loadImage(this.IMAGE_DEAD);
      this.speed = 0;
    }
  }
}
