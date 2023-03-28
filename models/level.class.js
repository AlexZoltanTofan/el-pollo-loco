class Level {
  enemies = [];
  endBoss;
  clouds;
  bottle;
  backgroundObject;
  coins;
  level_end_x = 719 * 3;
  constructor(enemies, endBoss, clouds, coins, bottles, backgroundObject) {
    this.enemies = enemies;
    this.endBoss = endBoss;
    this.clouds = clouds;
    this.coins = coins;
    this.bottles = bottles;
    this.backgroundObject = backgroundObject;
  }
}
