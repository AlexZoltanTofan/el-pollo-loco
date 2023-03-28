class Bottle extends MovableObject {
  x = 50;
  y = 140;
  height = 120;
  width = 120;
  IMAGE_Bottle = ['img/6_salsa_bottle/1_salsa_bottle_on_ground.png'];
  offset = {
    top: 30,
    left: 70,
    right: 68,
    bottom: 100,
  };

  constructor() {
    super();
    this.loadImage(this.IMAGE_Bottle);
    this.x = 300 + Math.random() * 1800;
    this.y = 306;
  }
}
