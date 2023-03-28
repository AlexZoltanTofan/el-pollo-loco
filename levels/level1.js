let level1;

function initLevel1() {
  level1 = new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
    ],
    new Endboss(),

    [
      new Cloud(200),
      new Cloud(1100),
      new Cloud(1900),
      new Cloud(2500),
      new Cloud(3400),
      new Cloud(4400),
    ],
    [
      new Coin(300, 100),
      new Coin(370, 60),
      new Coin(440, 100),
      new Coin(650, 10),
      new Coin(900, 100),
      new Coin(1200, 50),
      new Coin(1370, 10),
      new Coin(1440, 50),
      new Coin(1600, 100),
      new Coin(1900, 30),
    ],

    [
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
    ],

    [
      new BackgroundObject('img/5_background/layers/air.png', -719), // (-719 este axa x ; x este in caest caz -719)
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/2.png',
        -719
      ),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
      new BackgroundObject('img/5_background/layers/air.png', 0), // (0 este axa x ; x este in caest caz o)
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/air.png', 719), // (719 este axa x ; x este in caest caz 719)
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
      new BackgroundObject('img/5_background/layers/air.png', 719 * 2), // (719*2 este axa x ; x este in caest caz 719*2)
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/1.png',
        719 * 2
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/1.png',
        719 * 2
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/1.png',
        719 * 2
      ),
      new BackgroundObject('img/5_background/layers/air.png', 719 * 3), // (719*3 este axa x ; x este in caest caz 719*3)
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/2.png',
        719 * 3
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/2.png',
        719 * 3
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/2.png',
        719 * 3
      ),
    ]
  );
}
