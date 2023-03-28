class DrawableObject {
  x = 120;
  y = 280;
  height = 150;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  /**
   * Load image from @param {string} path
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draw rectangle around the object, for collision detection
   * @param {variable} ctx
   */
  drawFrame(ctx) {
    if (this.instanceOfElements()) {
      this.drowRectangleAroundElements();
      ctx.stroke();
    }
  }

  instanceOfElements() {
    this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof SmallChicken ||
      this instanceof Coin ||
      this instanceof Bottle ||
      this instanceof ThrowableObject;
  }

  drowRectangleAroundElements() {
    ctx.beginPath();
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'transparent';
    ctx.rect(
      this.x + this.offset.left,
      this.y + this.offset.top,
      this.width - this.offset.left - this.offset.right,
      this.height - this.offset.top - this.offset.bottom
    );
  }

  /**
   * We load images from 0 to the last, then from 0 again to the last, and repeat from the beginning
   * @param {Array} arr
   */
  loadImages(arr) {
    arr.forEach((path) => {
      this.img = new Image();
      this.img.src = path;
      this.imageCache[path] = this.img;
    });
  }

  /**
   *
   * @param {*} percentage We load the desired image based on a percentage
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * converting the percentage of lifespan into a proportional number of the images available to display the lifespan left,
   * to use the number as index for the position in the IMAGES array
   * @returns {number}
   */
  resolveImageIndex() {
    if (this.percentage == 100) return 5;
    else if (this.percentage >= 80) return 4;
    else if (this.percentage >= 60) return 3;
    else if (this.percentage >= 40) return 2;
    else if (this.percentage >= 20) return 1;
    else return 0;
  }
}
