class StatusBarHealthEndboss extends DrawableObject {
  IMAGES_HEALTH = [
    'img/7_statusbars/2_statusbar_endboss/boss_0.png',
    'img/7_statusbars/2_statusbar_endboss/boss_20.png',
    'img/7_statusbars/2_statusbar_endboss/boss_40.png',
    'img/7_statusbars/2_statusbar_endboss/boss_60.png',
    'img/7_statusbars/2_statusbar_endboss/boss_80.png',
    'img/7_statusbars/2_statusbar_endboss/boss_100.png',
  ];

  x = 530;
  y = -100;
  width = 200;
  height = 55;

  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.setPercentage(100);
  }
}
