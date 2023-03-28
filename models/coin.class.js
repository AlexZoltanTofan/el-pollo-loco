class Coin extends MovableObject {
  x = 50;
  y = 150;
  height = 145;
  width = 145;
  IMAGE_COIN = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];
  offset = {
    top: 40,
    left: 40,
    right: 40,
    bottom: 40,
  };

  constructor(x, y) {
    super().loadImages(this.IMAGE_COIN);
    this.x = x;
    this.y = y;
    this.animate();
  }

  animate() {
    setInterval(() => this.playAnimation(this.IMAGE_COIN), 1500);
  }
}
