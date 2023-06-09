class StatusBarCoins extends DrawableObject {
  IMAGES_Coins = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
  ];
  percentage = 20;
  firstCoint = 10;
  x = 30;
  y = 50;
  width = 200;
  height = 55;

  constructor() {
    super();
    this.loadImages(this.IMAGES_Coins);
    this.setPercentage(0);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_Coins[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 19) {
      return 5;
    } else if (this.percentage > 17) {
      return 4;
    } else if (this.percentage > 15) {
      return 3;
    } else if (this.percentage > 13) {
      return 2;
    } else if (this.percentage > 10) {
      return 1;
    } else {
      return 0;
    }
  }
}
