class Cloud extends MovableObject {
  y = 20;
  width = 500;
  height = 250;

  constructor(x) {
    super().loadImage('img/5_background/layers/4_clouds/1.png');
    this.x = x;
    this.animate();
  }

  /**
   * Animates cloud movements
   */
  animate() {
    setInterval(() => this.moveLeft(), 1000 / 60);
  }
}
