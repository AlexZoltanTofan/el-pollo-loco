class StatusBarBottle extends DrawableObject {
  IMAGES_Bottle = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
  ];
  x = 30;
  y = 95;
  width = 200;
  height = 50;
  percentage = 20;
  theFirstBottle = 10;

  constructor() {
    super();
    this.loadImages(this.IMAGES_Bottle);
    this.setPercentage(0);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_Bottle[this.resolveImageIndex()];
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
    } else if (this.percentage >= 10) {
      return 1;
    } else {
      return 0;
    }
  }
}
